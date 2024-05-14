'use client'

import getStroke from "perfect-freehand"

import { getDrawingStroke } from "@/lib/utils"

type DrawingProps = { 
    x: number
    y: number  
    point: number[][]
    fill: string
    onMousePress?: (e:React.PointerEvent) => void
    selectedColor?: string
}
export const Drawing = ({
    x,
    y,
    point,
    fill,
    onMousePress, 
    selectedColor
}: DrawingProps) => {


    return ( 
        <path
            onPointerDown={onMousePress}
            x={0}
            y={0}
            fill={fill}
            stroke={selectedColor}
            d={
                getDrawingStroke(getStroke(point, {
                    size: 16,
                    thinning: 0.5,
                    smoothing: 0.5,
                    streamline: 0.5
                }))
            }
            style={{
                transform: `translate(${x}px, ${y}px)`
            }}
            className="drop-shadow-md"
        />
    );
}