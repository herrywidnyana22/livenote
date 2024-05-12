'use client'

import { useStorage } from "@/liveblocks.config"
import { LayerType } from "@/types/canvasType"
import { memo } from "react"
import { Rectangle } from "./rectangle"


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
        case LayerType.Rectangle:
            return(
                <Rectangle
                    id={id}
                    layer={layer}
                    onMousePress={onMousePress}
                    selectedColor={selectedColor}
                />
            )

        default:
            console.warn("Unknown Layer type")
            return null
    }
})

PreviewLayer.displayName = 'PreviewLayer'