'use client'

import { useCallback, useMemo, useState } from "react";
import { useCanRedo, useCanUndo, useHistory, useMutation, useOthersMapped, useStorage } from "@/liveblocks.config";
import { nanoid } from "nanoid"
import { Angle, CanvasMode, CanvasState, Color, LayerType, Point, Side, dimention, mouseEventInCanvas } from "@/types/canvasType";

import { CanvasHeader } from "./canvasHeader";

import Toolbar from "./toolbar";
import Member from "./member";
import { CursorMember } from "./cursorActive";
import { LiveObject } from "@liveblocks/client";
import { PreviewLayer } from "./previewLayer";
import { cn, memberOnlineColor, resizing } from "@/lib/utils";
import SelectedBox from "./selectedBox";
import { OptionTools } from "./tools";

interface CanvasProps{
    boardID: string
}

const maxLayer = 50

const Canvas = ({
    boardID
}: CanvasProps) => {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    })

    const [lastColor, setLastColor] = useState<Color>({
        r: 219,
        g: 39,
        b: 119
    })

    const [angle, setAngle] = useState<Angle>({
        x: 0,
        y: 0
    })

    const history = useHistory()
    const isUndo = useCanUndo()
    const isRedo = useCanRedo()

     // LAYERING
    const layerIDS = useStorage((root) => root.layerID)
    const addLayer = useMutation((
        {storage, setMyPresence},
        LayerType: LayerType.Circle
                | LayerType.Rectangle
                | LayerType.Note
                | LayerType.Text,
        position: Point
    ) =>{
        const liveLayer = storage.get("layers")

        if(liveLayer.size >= maxLayer){
            return
        }

        const liveLayerID = storage.get("layerID")
        const layerID = nanoid()
        const layer = new LiveObject({
            type: LayerType,
            width: 100,
            height: 100,
            x: position.x,
            y: position.y,
            fill: lastColor
        })
        
        liveLayerID.push(layerID)
        liveLayer.set(layerID, layer)   

        setMyPresence({select: [layerID]}, {addToHistory: true})
    
    },[lastColor])

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

    const onMoving = useMutation((
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

        // RESIZE HANDLER
        if(canvasState.mode === CanvasMode.Move){
            onMoving(current)
        } else if(canvasState.mode === CanvasMode.Resize){
            onResizing(current)
        }

        setMyPresence({cursor: current})
    }, [canvasState, angle, onResizing, onMoving])
    

    const onMouseOut= useMutation(({setMyPresence}) =>{
         setMyPresence({cursor: null})
    }, [])

    const onMouseUp = useMutation(({}, e) => {
        const point = mouseEventInCanvas(e, angle)

        if(
            canvasState.mode === CanvasMode.None
            || canvasState.mode === CanvasMode.Press
        ){
            unSelectLayer()
            setCanvasState({
                mode: CanvasMode.None
            }) 
        } else if(canvasState.mode === CanvasMode.Insert){
            addLayer(canvasState.layer, point)
        } else {
            setCanvasState({
                mode: CanvasMode.None
            })
        }

        history.resume()
    },[angle, canvasState, history, addLayer, unSelectLayer])

    const onMousePress = useCallback((e: React.PointerEvent) =>{
        const point = mouseEventInCanvas(e, angle)

        if(canvasState.mode === CanvasMode.Insert){
            return
        }
        // TODO: ADD CASE DRAWING

        setCanvasState({
            origin: point,
            mode: CanvasMode.Press
        })
    },[canvasState, angle])

    const onMouseSelectItem = useMutation((
        {self, setMyPresence},
        e:React.PointerEvent,
        layerID: string
    ) => {
        if(canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Insert){
            return
        }

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
            <CanvasHeader baordID={boardID}/>
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
                setLastColor={setLastColor}
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

                    <CursorMember/>
                </g>
            </svg>
        </main>
    );
}
 
export default Canvas;