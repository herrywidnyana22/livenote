'use client'

import ContentEditable, { ContentEditableEvent } from "react-contenteditable"

import { Kalam } from "next/font/google"
import { TextLayer } from "@/types/canvasType"
import { useMutation } from "@/liveblocks.config"
import { cn, rgbToHex } from "@/lib/utils"


const font = Kalam({
    subsets: ["latin"],
    weight: ["400"]
})


type TextProps = {
    id: string
    layer: TextLayer
    onMousePress: (e:React.PointerEvent, id: string) => void
    selectedColor?: string
}
export const Text = ({
    id,
    layer,
    onMousePress,
    selectedColor,
}: TextProps) => {

    const {
        x,
        y,
        width,
        height,
        value,
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
                outline: selectedColor ? `1px solid ${selectedColor}` : "none"
            }}
        >
            <ContentEditable
                html={value || "Text"}
                onChange={handleEditText}
                style={{
                    color: textColor ? rgbToHex(textColor) :  "#000",
                    textAlign: textAlign,
                    fontWeight: isBold ? 'bold' : 'normal',
                    fontStyle: isItalic ? 'italic' : 'normal',
                    textDecoration: isUnderline ? 'underline' : 'none',
                    fontFamily: fontFamily,
                    fontSize: textSize
                }}
                className={cn(`
                    w-full
                    h-full
                    drop=shadow-md`,
                    
                )}
            />     
        </foreignObject>
    );
}