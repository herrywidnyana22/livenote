'use client'

import { toast } from "sonner";
import { nanoid } from "nanoid"
import { LiveObject } from "@liveblocks/core";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCanRedo, useCanUndo, useHistory, useMutation, useOthersMapped, useSelf, useStorage } from "@/liveblocks.config";
import { cn, findIntersectingWithRectangle, hexToRgb, memberOnlineColor, penPointToLayer, resizing, rgbToHex } from "@/lib/utils";
import { 
    Angle, 
    CanvasMode, 
    CanvasState, 
    CircleLayer, 
    Color, 
    DrawingLayer,
    Layer, 
    LayerType, 
    NoteLayer, 
    Point, 
    RectangleLayer, 
    Side, 
    TextAlign, 
    TextLayer, 
    dimention, 
    mouseEventInCanvas 
} from "@/types/canvasType";

import { Member } from "./member";
import { Drawing } from "./drawing";
import { Toolbar } from "./toolbar";
import { SelectedBox } from "./selectedBox";
import { OptionTools } from "./optionTools";
import { CanvasHeader } from "./canvasHeader";
import { PreviewLayer } from "./previewLayer";
import { CursorMember } from "./cursorMember";
import { useDeleteLayer } from "@/hooks/useDeleteLayer";

interface CanvasProps{
    boardID: string
}

const MAX_LAYER = 200

const Canvas = ({
    boardID
}: CanvasProps) => {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    })
    // DEFAULT COLOR
    const currentUser = useSelf()

    const defaultColor = memberOnlineColor(currentUser.connectionId)

    const [lastFillColor, setLastFillColor] = useState<Color>(hexToRgb(defaultColor))
    const [lastFontColor, setLastFontColor] = useState<Color>(hexToRgb(defaultColor))
    const [lastFontFamily, setlastFontFamily] = useState<string>("Arial")
    const [lastAlignment, setLastAlignment] = useState<TextAlign>(TextAlign.alignCenter)
    const [lastBold, setLastBold] = useState<boolean>(false)
    const [lastItalic, setLastItalic] = useState<boolean>(false)
    const [lastUnderline, setLastUnderline] = useState<boolean>(false)
    const [LastFontSize, setLastFontSize] = useState<string>("24px")

    const [angle, setAngle] = useState<Angle>({
        x: 0,
        y: 0
    })

    const history = useHistory()
    const isUndo = useCanUndo()
    const isRedo = useCanRedo()

    
    useDisableScroll()
    
    
     // LAYERING
    const layerIDS = useStorage((root) => root.layerID)
    const pencilTool = useSelf((me) => me.presence.pencilDraw)

    const addLayer = useMutation((
        { storage, setMyPresence },
        layerType: LayerType,
        position: { x: number, y: number }
    ) => {
        const liveLayer = storage.get("layers");

        if (liveLayer.size >= MAX_LAYER) {
            toast.error("Cannot add item, you can only add 50 items...!");
            return;
        }

        const liveLayerID = storage.get("layerID");
        const layerID = nanoid();
        const baseLayerProps = {
            x: position.x,
            y: position.y,
            fill: lastFillColor,
            textAlign: "center" as TextAlign | "center",
            textColor: lastFontColor,
            isBold: false,
            isItalic: false,
            isUnderline: false,
            fontFamily: "Arial",
            textSize: "24px"
        }

        let layer: LiveObject<Layer>;
        if (layerType === LayerType.Text) {
            layer = new LiveObject<TextLayer>({
                ...baseLayerProps,
                height: 40,
                width: 200,
                type: LayerType.Text
            })
        } else if (layerType === LayerType.Note) {
            layer = new LiveObject<NoteLayer>({
                ...baseLayerProps,
                height: 100,
                width: 200,
                type: LayerType.Note
            })
        } else if (layerType === LayerType.Rectangle) {
            layer = new LiveObject<RectangleLayer>({
                ...baseLayerProps,
                height: 100,
                width: 100,
                type: LayerType.Rectangle
            })
        } else if (layerType === LayerType.Circle) {
            layer = new LiveObject<CircleLayer>({
                ...baseLayerProps,
                height: 100,
                width: 100,
                type: LayerType.Circle
            })
        } else {
            layer = new LiveObject<DrawingLayer>({
                ...baseLayerProps,
                height: 100,
                width: 100,
                type: LayerType.Drawing,
                point: []
            })
        }

        liveLayerID.push(layerID);
        liveLayer.set(layerID, layer);

        setMyPresence({ select: [layerID] }, { addToHistory: true });
    }, [lastFillColor, lastFontColor]);

    
    const updateMultiSelected = useMutation((
        { storage, setMyPresence },
        current: Point,
        origin: Point
    ) =>{
        const layer = storage.get("layers").toImmutable()

        setCanvasState({
            mode: CanvasMode.Select,
            origin,
            current
        })

        const IDData = findIntersectingWithRectangle(layerIDS, layer, origin, current)

        setMyPresence({
            select: IDData
        })
    },[layerIDS])

    const multiSelect = useCallback((
        current: Point,
        origin: Point
    ) => {
        if(Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
            setCanvasState({
                mode: CanvasMode.Select,
                origin,
                current
            })
        }
    },[])

    const startDrawing = useMutation((
        {setMyPresence},
        point: Point,
        pressure: number
    ) => {
       setMyPresence({
        pencilDraw: [[point.x, point.y, pressure]],
        penColor: lastFillColor
       }) 
    },[lastFillColor])

    const onDrawing = useMutation((
        { setMyPresence, self },
        point: Point,
        e: React.PointerEvent
    ) => {
        const { pencilDraw } = self.presence

        if(
            canvasState.mode !== CanvasMode.Pencil
            || e.buttons !== 1
            || pencilDraw == null
        ) return

        setMyPresence({
            cursor: point,
            pencilDraw: 
                pencilDraw.length === 1
                && pencilDraw[0][0] === point.x
                && pencilDraw[0][1] === point.y
                ? pencilDraw
                : [...pencilDraw, [point.x, point.y, e.pressure]]
            
        })

    },[canvasState.mode])

    const insertDrawing = useMutation(({storage, self, setMyPresence}) =>{
        const liveLayerData = storage.get("layers")
        const liveLayerIDData = storage.get("layerID")

        const { pencilDraw } = self.presence

        if (pencilDraw == null 
            || pencilDraw.length < 2 
            || liveLayerData.size >= MAX_LAYER
        ){
            setMyPresence({
                pencilDraw: null
            })

            return
        }

        const id = nanoid()

        liveLayerData.set(
            id,
            new LiveObject(penPointToLayer(pencilDraw, lastFillColor))
        )
        liveLayerIDData.push(id)

        setMyPresence({pencilDraw: null})
        setCanvasState({mode: CanvasMode.Pencil})

        
    },[lastFillColor])

    const unSelectLayer = useMutation(({ self, setMyPresence })  => {
        if(self.presence.select.length > 0){
            setMyPresence(
                {select: []},
                {addToHistory: true}
            )
        }

    },[])

    const onResize = useCallback((position: Side, initialResize: dimention) => {
        history.pause()

        setCanvasState({
            mode: CanvasMode.Resize,
            initialResize,
            position
        })
    },[history])

    const onResizing = useMutation((
        { storage, self},
        point: Point
    ) => {
        if(canvasState.mode !== CanvasMode.Resize) return

        const resizingItem = resizing(
            canvasState.initialResize,
            canvasState.position,
            point
        )

        const liveLayer = storage.get("layers")
        const layer = liveLayer.get(self.presence.select[0])

        if(layer){
            layer.update(resizingItem)
        }
    },[canvasState])

    const onDrag = useMutation((
        { storage, self },
        point: Point
    ) => {
        if(canvasState.mode !== CanvasMode.Move) return

        const offset = {
            x: point.x - canvasState.current.x,
            y: point.y - canvasState.current.y,
        }

        const liveLayer = storage.get("layers")
        for (const id of self.presence.select){
            const layer = liveLayer.get(id)

            if(layer){
                layer.update({
                    x: layer.get("x") + offset.x,
                    y: layer.get("y") + offset.y
                })
            }
        }

        setCanvasState({
            mode: CanvasMode.Move,
            current: point
            
        })
    },[canvasState])

    // END LAYERING

    // MOUSE EVENT
    const onWheel = useCallback((e: React.WheelEvent) => {
        setAngle((angle) => ({
            x: angle.x - e.deltaX,
            y: angle.y - e.deltaY
        }))
    },[])

    const onMouseMove = useMutation(({setMyPresence}, e:React.PointerEvent) => {
        e.preventDefault()
        const current = mouseEventInCanvas(e, angle)

        if(canvasState.mode === CanvasMode.Press) {
            multiSelect(current, canvasState.origin)
        } else if(canvasState.mode === CanvasMode.Select) {
            updateMultiSelected(current, canvasState.origin)
        }
        // RESIZE HANDLER
        else if(canvasState.mode === CanvasMode.Move){
            onDrag(current)
            setMyPresence({ activeTools: "Grab"})
        } else if(canvasState.mode === CanvasMode.Resize){
            onResizing(current)
        }
        
        else if(canvasState.mode === CanvasMode.Pencil){
            onDrawing(current, e)
        }

        setMyPresence({cursor: current})
    }, [
        canvasState, 
        angle, 
        onResizing, 
        onDrag, 
        onDrawing, 
        multiSelect, 
        updateMultiSelected
    ])
    

    const onMouseOut= useMutation(({setMyPresence}) =>{
         setMyPresence({cursor: null})
    }, [])

    const onMouseUp = useMutation(({setMyPresence}, e) => {
        const point = mouseEventInCanvas(e, angle)

        if(
            canvasState.mode === CanvasMode.None
            || canvasState.mode === CanvasMode.Press
        ){
            unSelectLayer()
            setCanvasState({
                mode: CanvasMode.None
            })
            setMyPresence({
                activeTools: null
            })

        } else if (canvasState.mode === CanvasMode.Pencil) {
            insertDrawing()
        } else if(canvasState.mode === CanvasMode.Insert){
            addLayer(canvasState.layer, point)
        } else {
            setCanvasState({
                mode: CanvasMode.None
            })
            setMyPresence({
                activeTools: null
            }) 
        }

        history.resume()
    },[
        setCanvasState,
        angle, 
        canvasState, 
        history, 
        addLayer, 
        unSelectLayer,
        insertDrawing
    ])

    const onMousePress = useCallback((e: React.PointerEvent) =>{
        
        if (e.button === 0) {
            const point = mouseEventInCanvas(e, angle)

            if(canvasState.mode === CanvasMode.Insert){
                return
            }
            
            if(canvasState.mode === CanvasMode.Pencil){
                startDrawing(point, e.pressure)
                return
            }

            setCanvasState({
                origin: point,
                mode: CanvasMode.Press
            })  
        } else if (e.button === 2) {
            const point = mouseEventInCanvas(e, angle)
            setCanvasState({
                origin: point,
                mode: CanvasMode.Select
            }) 
        } else {
            return
        }
       
    },[canvasState, angle, startDrawing])

    const onMouseSelectItem = useMutation((
        {self, setMyPresence},
        e:React.PointerEvent,
        layerID: string
    ) => {
        if(canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Insert){
            return
        }

        
        if (e.button === 0) {
            history.pause()
            e.stopPropagation()

            const point = mouseEventInCanvas(e, angle)
            
            if(!self.presence.select.includes(layerID)){
                setMyPresence(
                    { select: [layerID] },
                    { addToHistory: true }
                )
            }

            setCanvasState({
                mode: CanvasMode.Move,
                current: point
            })

        } else if (e.button === 2) {
            const point = mouseEventInCanvas(e, angle)
            setCanvasState({
                origin: point,
                mode: CanvasMode.Select
            }) 
        } else {
            return
        }

    },[setCanvasState, angle, history, canvasState.mode])

    // END MOUSE EVENT

    const selected = useOthersMapped((other) => other.presence.select)

    const memberColorOnSelected = useMemo(() => {
        const memberColor:Record<string, string> = {}

        for (const user of selected){
            const [connectionID, selection] = user

            for (const layerID of selection){
                memberColor[layerID] = memberOnlineColor(connectionID)
            }
        }

        return memberColor
    },[selected])

    const deleteLayer = useDeleteLayer()

    useEffect(() => {
        function onkeydown(e: any){
            switch(e.key){
                case "Delete": {
                    deleteLayer()
                    break
                }

                case "z": {
                    if(e.ctrlKey || e.metaKey){
                        e.preventDefault()
                        if(e.shiftKey){
                            history.redo()
                        } else{
                            history.undo()
                        }
                    }

                    break
                }
            }
        }

        document.addEventListener("keydown", onkeydown)

        return () => {
            document.removeEventListener("keydown", onkeydown)
        }
    },[deleteLayer, history])

    
    return (
        <main
            className="
                relative
                w-full
                h-full
                touch-none
                bg-neutral-100
            "
        >
            {/* <div className="absolute top-20">{JSON.stringify(storage.get("layers"))}</div> */}
            <CanvasHeader boardID={boardID}/>
            <Member/>
            <Toolbar
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                undo={history.undo}
                redo={history.redo}
                isUndo={isUndo}
                isRedo={isRedo}
            />
            <OptionTools
                angle={angle}
                setLastFontFamily={setlastFontFamily}
                lastFontFamily={lastFontFamily}
                setLastFillColor={setLastFillColor}
                lastFillColor={lastFillColor}
                setLastFontColor={setLastFontColor}
                lastFontColor={lastFontColor}
                setLastBold={setLastBold}
                lastBold ={lastBold}
                setLastItalic={setLastItalic}
                lastItalic = {lastItalic}
                setLastUnderline={setLastUnderline}
                lastUnderline = {lastUnderline}
                setLastAlignment={setLastAlignment}
                lastAlignment = {lastAlignment}
                setLastFontSize={setLastFontSize}
                lastFontSize={LastFontSize}
                
            />
            <svg
                onPointerMove={onMouseMove}
                onPointerLeave={onMouseOut}
                onPointerUp={onMouseUp}
                onPointerDown={onMousePress}
                onWheel={onWheel}
                className={cn(`
                    w-[100vw]
                    h-[100vh]`,
                    canvasState.mode === CanvasMode.Move
                    && "cursor-grabbing"
                )}
                onContextMenu={(e) => e.preventDefault()}
            >
                <g
                    style={{
                        transform: `translate(${angle.x}px, ${angle.y}px)`
                    }}
                >
                    {
                        layerIDS.map((id) =>(
                            <PreviewLayer
                                key={id}
                                id={id}
                                onMousePress={onMouseSelectItem}
                                selectedColor ={memberColorOnSelected[id]}
                            />
                        ))
                    }
                    <SelectedBox
                        onResize={onResize}
                    />

                    {
                        // INFO: SELECTING BOX AREA
                        canvasState.mode === CanvasMode.Select
                        && canvasState.current != null
                        && (
                                <rect
                                    width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                                    height={Math.abs(canvasState.origin.y - canvasState.current.y)}
                                    x={Math.min(canvasState.origin.x,  canvasState.current.x)}
                                    y={Math.min(canvasState.origin.y, canvasState.current.y)}
                                    className="
                                        stroke-1
                                        fill-blue-500/5
                                        stroke-blue-500
                                    "
                                />
                            )
                    }

                    <CursorMember
                        canvasState={canvasState}
                    />
                    {
                        pencilTool !== null 
                        && pencilTool.length > 0 
                        && (
                            <Drawing
                                point={pencilTool}
                                fill={rgbToHex(lastFillColor)}
                                x={0}
                                y={0}
                            />
                        )
                    }
                </g>
            </svg>
        </main>
    );
}
 
export default Canvas;