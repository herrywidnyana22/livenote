'use client'

import { memo } from "react"
import { useSelectedResize } from "@/hooks/useSelectedResize"
import { useSelf, useStorage } from "@/liveblocks.config"
import { LayerType, Side, dimention } from "@/types/canvasType"

interface SelectedBoxProps{
    onResize: (corner: Side, initialBounds: dimention)=> void
}

const HANDLE_WIDTH = 8

export const SelectedBox = memo(({
    onResize
}: SelectedBoxProps) => {
    const thisLayerID = useSelf((me) => 
        me.presence.select.length === 1
        ? me.presence.select[0]
        : null
    )

    const isShowIconResize = useStorage((root) =>
        thisLayerID && root.layers.get(thisLayerID)?.type !== LayerType.Drawing
    )

    const resize = useSelectedResize()

    if(!resize) return null

    return (
        <>  
            <rect
                width={resize.width}
                height={resize.height}
                x={0}
                y={0}
                style={{ 
                   transform: `translate(${resize.x}px, ${resize.y}px)`
                }}
                className="
                    fill-transparent
                    pointer-event-none
                    stroke-1
                    stroke-blue-500
                "
            />
            {
                isShowIconResize &&
                (<>
                    <rect
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResize(Side.Top + Side.Left, resize)
                        }}
                        x={0}
                        y={0}
                        style={{ 
                            cursor: "nwse-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(
                                ${resize.x - HANDLE_WIDTH/2}px, 
                                ${resize.y - HANDLE_WIDTH/2}px
                            )`
                         }}
                        className="
                            stroke-1
                            stroke-blue-500
                            fill-white
                        "   
                    />
                    <rect
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResize(Side.Top, resize)
                        }}
                        x={0}
                        y={0}
                        style={{ 
                            cursor: "ns-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(
                                ${resize.x + resize.width/2 - HANDLE_WIDTH/2}px, 
                                ${resize.y - HANDLE_WIDTH/2}px
                            )`
                         }}
                        className="
                            stroke-1
                            stroke-blue-500
                            fill-white
                        "   
                    />
                    <rect
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResize(Side.Top + Side.Right, resize)
                        }}
                        x={0}
                        y={0}
                        style={{ 
                            cursor: "nesw-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(
                                ${resize.x + resize.width - HANDLE_WIDTH/2}px, 
                                ${resize.y - HANDLE_WIDTH/2}px
                            )`
                         }}
                        className="
                            stroke-1
                            stroke-blue-500
                            fill-white
                        "   
                    />
                    <rect
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResize(Side.Right, resize)
                        }}
                        x={0}
                        y={0}
                        style={{ 
                            cursor: "ew-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(
                                ${resize.x + resize.width - HANDLE_WIDTH/2}px, 
                                ${resize.y + resize.height/2 - HANDLE_WIDTH/2}px
                            )`
                         }}
                        className="
                            stroke-1
                            stroke-blue-500
                            fill-white
                        "   
                    />
                    <rect
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResize(Side.Bottom + Side.Right, resize)
                        }}
                        x={0}
                        y={0}
                        style={{ 
                            cursor: "nwse-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(
                                ${resize.x + resize.width - HANDLE_WIDTH/2}px, 
                                ${resize.y + resize.height - HANDLE_WIDTH/2}px
                            )`
                         }}
                        className="
                            stroke-1
                            stroke-blue-500
                            fill-white
                        "   
                    />
                    <rect
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResize(Side.Bottom, resize)
                        }}
                        x={0}
                        y={0}
                        style={{ 
                            cursor: "ns-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(
                                ${resize.x + resize.width/2 - HANDLE_WIDTH/2 }px, 
                                ${resize.y + resize.height - HANDLE_WIDTH/2}px
                            )`
                         }}
                        className="
                            stroke-1
                            stroke-blue-500
                            fill-white
                        "   
                    />
                    <rect
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResize(Side.Bottom + Side.Left, resize)
                        }}
                        x={0}
                        y={0}
                        style={{ 
                            cursor: "nesw-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(
                                ${resize.x - HANDLE_WIDTH/2 }px, 
                                ${resize.y + resize.height - HANDLE_WIDTH/2}px
                            )`
                         }}
                        className="
                            stroke-1
                            stroke-blue-500
                            fill-white
                        "   
                    />
                    <rect
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResize(Side.Left, resize)
                        }}
                        x={0}
                        y={0}
                        style={{ 
                            cursor: "ew-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(
                                ${resize.x - HANDLE_WIDTH/2}px, 
                                ${resize.y + resize.height/2 -HANDLE_WIDTH/2}px
                            )`
                         }}
                        className="
                            stroke-1
                            stroke-blue-500
                            fill-white
                        "   
                    />
                </>)
            }
        </>
    )
})

SelectedBox.displayName = "SelectedBox"