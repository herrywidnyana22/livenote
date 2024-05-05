'use client'

import { useCallback, useState } from "react";
import { useCanRedo, useCanUndo, useHistory, useMutation, useStorage } from "@/liveblocks.config";
import { nanoid } from "nanoid"
import { Angle, CanvasMode, CanvasState, Color, LayerType, Point, mouseEventInCanvas } from "@/types/canvasType";

import { CanvasHeader } from "./canvasHeader";

import Toolbar from "./toolbar";
import Member from "./member";
import { CursorMember } from "./cursorActive";
import { LiveObject } from "@liveblocks/client";
import { PreviewLayer } from "./previewLayes";
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
        r: 0,
        g: 0,
        b: 0
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

    // MOUSE MOVEMENT
    const onWheel = useCallback((e: React.WheelEvent) => {

        setAngle((angle) => ({
            x: angle.x - e.deltaX,
            y: angle.y - e.deltaY
        }))
    },[])

    const onMouseMove = useMutation(({setMyPresence}, e:React.PointerEvent) => {
        e.preventDefault()
        const current = mouseEventInCanvas(e, angle)

        setMyPresence({cursor: current})
    }, [])
    

    const onMouseOut= useMutation(({setMyPresence}) =>{
         setMyPresence({cursor: null})
    }, [])

    const onMouseUp = useMutation(({}, e) => {
        const point = mouseEventInCanvas(e, angle)

        if(canvasState.mode === CanvasMode.Insert){
            addLayer(canvasState.layer, point)
        } else {
            setCanvasState({
                mode: CanvasMode.None
            })
        }

        history.resume()
    },[angle, canvasState, history, addLayer])

    // END MOUSE MOVEMENT

    
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
            <svg
                onPointerMove={onMouseMove}
                onPointerLeave={onMouseOut}
                onPointerUp={onMouseUp}
                onWheel={onWheel}
                className="
                    w-[100vw]
                    h-[100vh]
                "
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
                                onMousePress={() =>{}}
                                selectedColor ={"#EA212D"}
                            />
                        ))
                    }

                    
                    <CursorMember/>
                </g>
            </svg>
        </main>
    );
}
 
export default Canvas;