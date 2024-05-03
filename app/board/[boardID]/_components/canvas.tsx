'use client'

import { useCallback, useState } from "react";
import { useCanRedo, useCanUndo, useHistory, useMutation } from "@/liveblocks.config";

import { Angle, CanvasMode, CanvasState, mouseEventInCanvas } from "@/types/canvasType";

import { CanvasHeader } from "./canvasHeader";

import Toolbar from "./toolbar";
import Member from "./member";
import { CursorActive } from "./cursorActive";
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

    const [angle, setAngle] = useState<Angle>({
        x: 0,
        y: 0
    })

    const history = useHistory()
    const isUndo = useCanUndo()
    const isRedo = useCanRedo()

    const onWheel = useCallback((e: React.WheelEvent) => {
        console.log({
            x: e.deltaX,
            y: e.deltaY
        })

        setAngle((angle) => ({
            x: angle.x - e.deltaX,
            y: angle.y - e.deltaY
        }))
    },[])

    const onMouseMove = useMutation(({setMyPresence}, e:React.PointerEvent) => {
        e.preventDefault()
        const current = mouseEventInCanvas(e, angle)

        console.log({current})

        setMyPresence({cursor: current})
    }, [])
    

    const onMouseOut= useMutation(({setMyPresence}) =>{
         setMyPresence({cursor: null})
    }, [])
    
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
                    <CursorActive/>
                </g>
            </svg>
        </main>
    );
}
 
export default Canvas;