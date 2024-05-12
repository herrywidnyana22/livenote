'use client'

import { useSelectedResize } from "@/hooks/useSelectedResize"
import { useMutation, useSelf } from "@/liveblocks.config"
import { Angle, Color } from "@/types/canvasType"
import { memo } from "react"
import { useDeleteLayer } from "@/hooks/useDeleteLayer"
import { Info } from "@/components/info"
import { Button } from "@/components/ui/button"
import { ArrowBigDownDash, ArrowBigUpDash, Trash2 } from "lucide-react"
import { ColorOptions } from "./ColorOption"

interface OptionToolsprops{
    angle: Angle
    setLastColor: (color: Color) => void
    selectedColor: Color
}


export const OptionTools = memo(({
    angle, 
    setLastColor,
    selectedColor
}: OptionToolsprops) => {

    const selection = useSelf((me) => me.presence.select)
    const selectionResize = useSelectedResize()
    
    const setFill = useMutation(({storage}, fill: Color) => {
        const liveLayer = storage.get("layers")
        setLastColor(fill)

        selection.forEach((id) => {
            liveLayer.get(id)?.set("fill", fill)
        })
    }, [selection, setLastColor])

    const deleteLayer = useDeleteLayer()

    const moveToFrontLayer = useMutation(({storage}) => {
        const liveLayerIDData = storage.get("layerID")

        const indices: number[] = []

        const dataArray = liveLayerIDData.toArray()

        for(let i =0; i<dataArray.length; i++){
            if(selection.includes(dataArray[i])){
                indices.push(i)
            }
        }

        for (let i=indices.length-1; i>=0; i--){
            liveLayerIDData.move(indices[i], dataArray.length-1-(indices.length-1-i))
        }

    },[selection]) 

    const moveToBackLayer = useMutation(({storage}) => {
        const liveLayerIDData = storage.get("layerID")

        const indices: number[] = []

        const dataArray = liveLayerIDData.toArray()

        for(let i =0; i<dataArray.length; i++){
            if(selection.includes(dataArray[i])){
                indices.push(i)
            }
        }

        for (let i=0; i<indices.length; i++){
            liveLayerIDData.move(indices[i], i)
        }

    },[selection]) 

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
            <div
                className="
                    flex
                    flex-col
                    gap-y-1
                    pr-2
                    mr-2
                    border-r
                    border-neutral-200
                
                "
            >
                <Info label="Move to front">
                    <Button
                        onClick={moveToFrontLayer}
                        variant={"board"}
                        size={"icon"}
                    >
                        <ArrowBigUpDash/>
                    </Button>
                </Info>
                <Info label="Move to back" side="bottom">
                    <Button
                        onClick={moveToBackLayer}
                        variant={"board"}
                        size={"icon"}
                    >
                        <ArrowBigDownDash/>
                    </Button>
                </Info>
            </div>
            <ColorOptions
                onChange ={setFill}
                selectedColor={selectedColor}
            />
            <div
                className="
                    flex
                    items-center
                "
            >
                <Info label="Delete this item">
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={deleteLayer}
                        className="text-rose-600 hover:text-white hover:bg-rose-600/50"
                    >
                        <Trash2/>
                    </Button>
                </Info>
            </div>
        </div>
    );
})

OptionTools.displayName = "OptionTools"