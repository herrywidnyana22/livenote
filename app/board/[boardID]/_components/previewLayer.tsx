'use client'

import { memo } from "react"
import { rgbToHex } from "@/lib/utils"
import { LayerType } from "@/types/canvasType"
import { Rectangle } from "./rectangle"
import { useStorage } from "@/liveblocks.config"

import { Text } from "./text"
import { Note } from "./note"
import { Circle } from "./circle"
import { Drawing } from "./drawing"

interface PreviewLayerProps{
    id: string
    onMousePress: (e: React.PointerEvent, layerID: string) => void
    selectedColor?: string
}

export const PreviewLayer = memo(({
    id,
    onMousePress,
    selectedColor
}: PreviewLayerProps) => {
    
    const layer = useStorage((home) => home.layers.get(id))

    if(!layer) return null

    switch(layer.type){
        case LayerType.Circle:
            return(
                <Circle
                    id={id}
                    layer={layer}
                    onMousePress={onMousePress}
                    selectedColor={selectedColor}
                />
            )

        case LayerType.Rectangle:
            return(
                <Rectangle
                    id={id}
                    layer={layer}
                    onMousePress={onMousePress}
                    selectedColor={selectedColor}
                />
            )

        case LayerType.Text:
            return(
                <Text
                    id={id}
                    layer={layer}
                    onMousePress={onMousePress}
                    selectedColor={selectedColor}
                />
            )

        case LayerType.Note:
            return(
                <Note
                    id={id}
                    layer={layer}
                    onMousePress={onMousePress}
                    selectedColor={selectedColor}
                />
            )

        case LayerType.Drawing:
            return(
                <Drawing
                    key={id}
                    x={layer.x}
                    y={layer.y}
                    point={layer.point}
                    onMousePress={(e) => onMousePress(e, id)}
                    fill={layer.fill ? rgbToHex(layer.fill) : "#000"}
                    selectedColor={selectedColor}
                />
            )

        default:
            console.warn("Unknown Layer type")
            return null
    }
})

PreviewLayer.displayName = 'PreviewLayer'