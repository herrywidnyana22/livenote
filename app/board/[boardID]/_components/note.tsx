'use client'

import ContentEditable, { ContentEditableEvent } from "react-contenteditable"

import { Kalam } from "next/font/google"
import { NoteLayer } from "@/types/canvasType"
import { useMutation } from "@/liveblocks.config"
import { calculateBrightness, calculateFontSize, cn, rgbToHex } from "@/lib/utils"

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"]
})

type NoteProps = {
    id: string
    layer: NoteLayer
    onMousePress: (e:React.PointerEvent, id: string) => void
    selectedColor?: string
    alignment?: string
}
export const Note = ({
    id,
    layer,
    onMousePress,
    selectedColor,
    alignment
}: NoteProps) => {
const {
        x,
        y,
        width,
        height,
        value,
        fill,
        textColor,
        textAlign,
        textSize,
        isBold,
        isItalic,
        isUnderline,
        fontFamily
    } = layer

    const updateValue = useMutation((
        {storage},
        newValue: string
    ) => {
        const liveLayerData = storage.get("layers")

        liveLayerData.get(id)?.set("value", newValue)

    },[])

    // const luminanceThreshold = 0.7
    // const default = fill ? (calculateBrightness(fill) > luminanceThreshold ? 'black' : 'white') : 'black'

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
                    color: textColor ? rgbToHex(textColor) :  "#000",
                    textAlign: "center",
                    fontWeight: isBold ? 'bold' : 'normal',
                    fontStyle: isItalic ? 'italic' : 'normal',
                    textDecoration: isUnderline ? 'underline' : 'none',
                    fontFamily: fontFamily,
                    fontSize: textSize
                }}
                className={cn(`
                    w-full
                    h-full
                    flex
                    p-2
                    outline-none`,
                    
                )}
            />      
        </foreignObject>
    );
}