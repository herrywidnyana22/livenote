'use client'

import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import { Kalam } from "next/font/google"
import { NoteLayer } from "@/types/canvasType"
import { calculateBrightness, calculateFontSize, cn, rgbToHex } from "@/lib/utils"
import { useMutation } from "@/liveblocks.config"

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"]
})

type NoteProps = {
    id: string
    layer: NoteLayer
    onMousePress: (e:React.PointerEvent, id: string) => void
    selectedColor?: string
}
export const Note = ({
    id,
    layer,
    onMousePress,
    selectedColor
}: NoteProps) => {

    const {
        x,
        y,
        width,
        height,
        fill,
        value
    } = layer

    const updateValue = useMutation((
        {storage},
        newValue: string
    ) => {
        const liveLayerData = storage.get("layers")

        liveLayerData.get(id)?.set("value", newValue)

    },[])

    const luminanceThreshold = 0.7
    const textColor = fill ? (calculateBrightness(fill) > luminanceThreshold ? 'black' : 'white') : 'black'

    const handleEditText = (e:ContentEditableEvent) =>{
        updateValue(e.target.value)
    }

    return ( 
        <foreignObject
            width={width}
            height={height}
            x={x}
            y={y}
            onPointerDown={(e) => onMousePress(e, id)}
            style={{
                outline: selectedColor ? `1px solid ${selectedColor}` : "none",
                backgroundColor: fill ? rgbToHex(fill) : "#000"
            }}
            className="
                shadow-md
                drop-shadow-xl
            "
        >
            <ContentEditable
                html={value || "Text"}
                onChange={handleEditText}
                style={{
                    fontSize: calculateFontSize(width, height, 0.15),
                    color: textColor
                }}
                className={cn(`
                    w-full
                    h-full
                    flex
                    justify-center
                    items-center
                    text-center
                    outline-none`,
                    font.className
                    
                )}
            />      
        </foreignObject>
    );
}