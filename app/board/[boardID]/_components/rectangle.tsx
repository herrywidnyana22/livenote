'use client'

import { RectangleLayer } from "@/types/canvasType"

interface RectangleProps{
    id: string
    layer: RectangleLayer
    onMousePress: (e:React.PointerEvent, id: string) => void
    selectedColor?: string
}


export const Rectangle = ({
    id,
    layer,
    onMousePress,
    selectedColor
}: RectangleProps) => {


    const {
        x,
        y,
        width,
        height,
        fill,
    } = layer

    return ( 
        <rect
            onPointerDown={(e) => onMousePress(e, id)}
            x={0}
            y={0}
            width={width}
            height={height}
            fill="#000"
            stroke="transparent"
            strokeWidth={1}
            className="
                drop-shadow-md
            "
            style={{
                transform: `translate(${x}px, ${y}px)`
            }}
        />
    );
}