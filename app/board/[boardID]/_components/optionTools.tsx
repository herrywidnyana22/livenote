'use client'

import { cn, rgbToHex } from "@/lib/utils"
import { LayerType, TextAlign, fontApps } from "@/types/canvasType"
import { Angle, Color } from "@/types/canvasType"
import { memo, useState } from "react"
import { useDeleteLayer } from "@/hooks/useDeleteLayer"
import { useSelectedResize } from "@/hooks/useSelectedResize"
import { useMutation, useSelf, useStorage } from "@/liveblocks.config"
import { 
    AArrowDown,
    AArrowUp,
    AlignCenter, 
    AlignJustify, 
    AlignLeft, 
    AlignRight, 
    ArrowBigDownDash, 
    ArrowBigUpDash, 
    ArrowDown, 
    Bold, 
    CaseUpper, 
    Italic, 
    Minus, 
    Trash2, 
    Underline 
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { Info } from "@/components/info"
import { ColorOptions } from "./colorOption"

interface OptionToolsProps{
    angle: Angle
    setLastColor: (color: Color) => void
    selectedColor: Color
}


export const OptionTools = memo(({
    angle, 
    setLastColor,
    selectedColor,
}: OptionToolsProps) => {
    

    const selectionID = useSelf((me) => me.presence.select)
    const allLayers = useStorage((home) => home.layers)
    const isMultiSelected = selectionID.length > 1


    const layer = !isMultiSelected
        ? allLayers.get(selectionID[0])
        : null

    const selectionResize = useSelectedResize()
    const [position, setPosition] = useState("Bottom")
    
    const setFill = useMutation(({storage}, fill: Color) => {
        const liveLayer = storage.get("layers")
        setLastColor(fill)

        selectionID.forEach((id) => {
            liveLayer.get(id)?.set("fill", fill)
        })
    }, [selectionID, setLastColor])
    
    const setAlignment = useMutation(({ storage }, align: TextAlign) => {
        const liveLayer = storage.get("layers")

        selectionID.forEach((id) => {
            const layer = liveLayer.get(id)
            layer?.set("textAlign", align)
        })
    }, [selectionID])

    const setBold = useMutation(({ storage }, isBold: boolean) => {
        const liveLayer = storage.get("layers")

        selectionID.forEach((id) => {
            const layer = liveLayer.get(id)
            layer?.set("isBold", isBold)
        })
    }, [selectionID])

    const setItalic = useMutation(({ storage }, isItalic: boolean) => {
        const liveLayer = storage.get("layers")

        selectionID.forEach((id) => {
            const layer = liveLayer.get(id)
            layer?.set("isItalic", isItalic)
        })
    }, [selectionID])

    const setUnderline = useMutation(({ storage }, isUnderline: boolean) => {
        const liveLayer = storage.get("layers")

        selectionID.forEach((id) => {
            const layer = liveLayer.get(id)
            layer?.set("isUnderline", isUnderline)
        })
    }, [selectionID])

    const deleteLayer = useDeleteLayer()

    const moveToFrontLayer = useMutation(({storage}) => {
        const liveLayerIDData = storage.get("layerID")

        const indices: number[] = []

        const dataArray = liveLayerIDData.toImmutable()

        for(let i =0; i<dataArray.length; i++){
            if(selectionID.includes(dataArray[i])){
                indices.push(i)
            }
        }

        for (let i=indices.length-1; i>=0; i--){
            liveLayerIDData.move(indices[i], dataArray.length-1-(indices.length-1-i))
        }

    },[selectionID]) 

    const moveToBackLayer = useMutation(({storage}) => {
        const liveLayerIDData = storage.get("layerID")

        const indices: number[] = []

        const dataArray = liveLayerIDData.toImmutable()

        for(let i =0; i<dataArray.length; i++){
            if(selectionID.includes(dataArray[i])){
                indices.push(i)
            }
        }

        for (let i=0; i<indices.length; i++){
            liveLayerIDData.move(indices[i], i)
        }

    },[selectionID]) 

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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div>
                            <Button 
                                variant="outline"
                                className="
                                    relative
                                    w-full
                                    flex
                                    justify-between
                                    items-center
                                "
                            >
                                {position}
                                <ArrowDown 
                                    className="
                                        absolute
                                        w-3 
                                        h-3
                                        right-2 
                                        text-neutral-600"
                                    />
                            </Button>
                            
                        </div>
                        
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Font Style</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                            <DropdownMenuRadioItem value="Top">Top</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Bottom">Bottom</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Right">Right</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex gap-2">
                    <div className="flex gap-1 items-center">
                        <Button
                            onClick={() => setBold(layer && layer.isBold ? false : true)}
                            variant={"ghost"}
                            className={cn(
                                layer && layer.isBold
                                ? "bg-slate-100"
                                : "bg-transparent"
                            )}
                        >
                            <Bold className="h-4 w-4" />
                        </Button>
                        <Button
                            onClick={() => setItalic(layer && layer.isItalic ? false : true)}
                            variant={"ghost"}
                            className={cn(
                                layer && layer.isItalic
                                ? "bg-slate-100"
                                : "bg-transparent"
                            )}
                        >
                            <Italic className="h-4 w-4" />
                        </Button>
                        <Button
                            onClick={() => setUnderline(layer && layer.isUnderline ? false : true)}
                            variant={"ghost"}
                            className={cn(
                                layer && layer.isUnderline
                                ? "bg-slate-100"
                                : "bg-transparent"
                            )}
                        >
                            <Underline className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* FONT OPTION */}
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button
                                variant={"ghost"}
                                className="relative flex flex-col"
                            >
                                <CaseUpper 
                                    
                                    className="h-4 w-4 font-extrabold" 
                                />
                                <Minus 
                                    style={{
                                        color: selectedColor ? rgbToHex(selectedColor) : "#000"
                                    }}
                                    className="
                                        absolute 
                                        h-4 
                                        w-5 
                                        font-extrabold 
                                        bottom-1
                                    " 
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <ColorOptions
                                onChange ={setFill}
                                selectedColor={selectedColor}
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
                   
                
            </div>
            <div
                className="
                    flex
                    gap-y-1
                    pr-2
                    mr-2
                    border-r
                    border-neutral-200
                "
            >
                <div 
                    className="
                        flex 
                        flex-col 
                        justify-between
                    "
                >
                    <Info label="Increase font size">
                        <Button
                            variant={"ghost"}
                        >
                            <AArrowUp
                                className="
                                    h-4
                                    w-4
                                "
                            />
                        </Button>

                    </Info>
                    <Info label="Decrease font size">
                        <Button
                            variant={"ghost"}
                        >
                            <AArrowDown
                                className="
                                    h-4
                                    w-4
                                "
                            />
                        </Button>

                    </Info>
                </div>

                <ToggleGroup 
                    type="single"
                    value={layer ? layer.textAlign : TextAlign.alignCenter} // Set the current selected value
                    onValueChange={setAlignment} 
                    className="
                        grid 
                        grid-cols-2 
                        gap-2
                    "
                >
                    <Info label="Align left">
                        <ToggleGroupItem value={TextAlign.alignLeft} aria-label="Toggle left">
                            <AlignLeft className="h-4 w-4" />
                        </ToggleGroupItem>
                    </Info>
                    <Info label="Align right">
                        <ToggleGroupItem value={TextAlign.alignRight} aria-label="Toggle right">
                            <AlignRight className="h-4 w-4" />
                        </ToggleGroupItem>
                    </Info>
                    <Info label="Align justify">
                        <ToggleGroupItem value={TextAlign.alignJustify} aria-label="Toggle justify">
                            <AlignJustify className="h-4 w-4" />
                        </ToggleGroupItem>
                    </Info>
                    <Info label="Align center">
                        <ToggleGroupItem value={TextAlign.alignCenter} aria-label="Toggle center">
                            <AlignCenter className="h-4 w-4" />
                        </ToggleGroupItem>
                    </Info>
                    
                </ToggleGroup>
                        
            </div>
            
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
                        className="
                            text-rose-600 
                            hover:text-white 
                            hover:bg-rose-600/50
                        "
                    >
                        <Trash2/>
                    </Button>
                </Info>
            </div>
        </div>
    );
})

OptionTools.displayName = "OptionTools"