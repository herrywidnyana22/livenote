'use client'

import { useSelectedResize } from "@/hooks/useSelectedResize"
import { useMutation, useSelf } from "@/liveblocks.config"
import { Angle, Color } from "@/types/canvasType"
import { memo } from "react"
import { ColorOptions } from "./ColorOption"

interface Toolsprops{
    angle: Angle
    setLastColor: (color: Color) => void
}


export const OptionTools = memo(({
    angle, 
    setLastColor
}: Toolsprops) => {

    const selection = useSelf((me) => me.presence.select)
    const selectionResize = useSelectedResize()
    
    const setFill = useMutation(({storage}, fill: Color) => {
        const liveLayer = storage.get("layers")
        setLastColor(fill)

        selection.forEach((id) => {
            liveLayer.get(id)?.set("fill", fill)
        })
    }, [selection, setLastColor])

    if(!selectionResize) return

    const x = selectionResize.width/2 + selectionResize.x + angle.x
    const y = selectionResize.y + angle.y

    return ( 
        <div
            style={{
                transform: `translate(
                    calc(${x}px - 50%),
                    calc(${y-16}px - 100%)
                )`
            }}
            className="
                absolute
                flex
                p-3
                rounded-xl
                shadow-md
                border
                select-none
                bg-white
            "
        >
            <ColorOptions
                onChange ={setFill}
            />
        </div>
    );
})

OptionTools.displayName = "OptionTools"