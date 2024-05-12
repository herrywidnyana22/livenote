'use client'

import { rgbToHex } from "@/lib/utils"
import { CircleLayer } from "@/types/canvasType"

interface CircleProps{
    id: string
    layer: CircleLayer
    onMousePress: (e:React.PointerEvent, id: string) => void
    selectedColor?: string
}

export const Circle = ({
    id,
    layer,
    onMousePress,
    selectedColor
}: CircleProps) => {

    const {
        x,
        y,
        width,
        height,
        fill,
    } = layer
    
    return ( 
        <ellipse
            onPointerDown={(e) => onMousePress(e, id)}
            cx={width/2}
            cy={height/2}
            rx={width/2}
            ry={height/2}
            width={width}
            height={height}
            fill={fill ? rgbToHex(fill) : "#ddd"}
            stroke={selectedColor || "transparent"}
            strokeWidth={1}
            className="drop-shadow-md"
            style={{
                transform: `translate(${x}px, ${y}px)`
            }}
        />
    );
}