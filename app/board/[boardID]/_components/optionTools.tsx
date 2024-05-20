'use client'

import { cn, rgbToHex } from "@/lib/utils"
import { LayerType, TextAlign, FontApps } from "@/types/canvasType"
import { Angle, Color } from "@/types/canvasType"
import { memo, useEffect, useState } from "react"
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
    PaintBucket, 
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

import fontFamilyData from '@/lib/fontLibrary.json'
import fontSizeData from '@/lib/fontSize.json'

interface OptionToolsProps{
    angle: Angle
    setLastFontFamily: (font: string) => void
    lastFontFamily: string
    setLastFillColor: (color: Color) => void
    lastFillColor: Color
    setLastFontColor: (color: Color) => void
    lastFontColor: Color
    setLastBold: (isBold: boolean) => void
    lastBold: boolean
    setLastItalic: (isItalic: boolean) => void
    lastItalic: boolean
    setLastUnderline: (isUnderline: boolean) => void
    lastUnderline: boolean
    setLastAlignment: (align: TextAlign) => void
    lastAlignment: TextAlign
    setLastFontSize: (size: string) => void
    lastFontSize: string
}


export const OptionTools = memo(({
    angle,
    setLastFontFamily,
    lastFontFamily,
    setLastFillColor,
    lastFillColor,
    setLastFontColor,
    lastFontColor,
    setLastBold,
    lastBold,
    setLastItalic,
    lastItalic,
    setLastUnderline,
    lastUnderline,
    setLastAlignment,
    lastAlignment,
    setLastFontSize,
    lastFontSize
}: OptionToolsProps) => {
    

    const selectionID = useSelf((me) => me.presence.select)
    const allLayers = useStorage((home) => home.layers)
    const isMultiSelected = selectionID.length > 1

    
    const layer = !isMultiSelected
        ? allLayers.get(selectionID[0])
        : null
        

    const selectionResize = useSelectedResize()

    const defaultFillColor = layer && layer.fill ? layer.fill : lastFillColor
    const defaultFontColor = layer && layer.textColor ? layer.textColor : lastFontColor
    const defaultAlign = isMultiSelected ? lastAlignment : layer?.textAlign
    const defaultFontSize = isMultiSelected ? lastFontSize : layer?.textSize

    const defaultBold = isMultiSelected ? lastBold : layer?.isBold
    const defaultItalic = isMultiSelected ? lastItalic : layer?.isItalic
    const defaultUnderline = isMultiSelected ? lastUnderline : layer?.isUnderline

    const defaultFontFamily = isMultiSelected ? lastFontFamily : layer?.fontFamily 
    

    const setFontSize= useMutation(({storage}, size: string) => {
        const liveLayer = storage.get("layers")
        setLastFontSize(size)

        selectionID.forEach((id) => {
            liveLayer.get(id)?.set("textSize", size)
        })
    }, [selectionID, defaultFontSize])

    const increaseFontSize = useMutation(({storage}) => {
        const currentFontSizeIndex = fontSizeData.findIndex(font => font.fontSize === defaultFontSize)
        
        if (currentFontSizeIndex < fontSizeData.length - 1) {
            const increaseIndex = currentFontSizeIndex + 1
            const increaseFontSize = fontSizeData[increaseIndex].fontSize
            
            const liveLayer = storage.get("layers")

            selectionID.forEach((id) => {
                liveLayer.get(id)?.set("textSize", increaseFontSize)
            })

            setLastFontSize(increaseFontSize)
        }

    },[selectionID, defaultFontSize])

    const decreaseFontSize = useMutation(({storage}) => {
        const currentFontSizeIndex = fontSizeData.findIndex(font => font.fontSize === defaultFontSize)

        if (currentFontSizeIndex > 0) {
            const decreaseIndex = currentFontSizeIndex - 1
            const decreaseFontSize = fontSizeData[decreaseIndex].fontSize
            
            const liveLayer = storage.get("layers")

            selectionID.forEach((id) => {
                liveLayer.get(id)?.set("textSize", decreaseFontSize)
            })

            setLastFontSize(decreaseFontSize)
        }

    },[selectionID, defaultFontSize])
    
    const setFill = useMutation(({storage}, fill: Color) => {
        const liveLayer = storage.get("layers")
        setLastFillColor(fill)

        selectionID.forEach((id) => {
            liveLayer.get(id)?.set("fill", fill)
        })
    }, [selectionID, defaultFillColor])

    const setFontColor = useMutation(({storage}, color: Color) => {
        const liveLayer = storage.get("layers")
        setLastFontColor(color)

        selectionID.forEach((id) => {
            liveLayer.get(id)?.set("textColor", color)
        })
    }, [selectionID, defaultFontColor])
    
    const setAlignment = useMutation(({ storage }, align: TextAlign) => {
        const liveLayer = storage.get("layers")
        setLastAlignment(align)

        selectionID.forEach((id) => {
            const layer = liveLayer.get(id)
            layer?.set("textAlign", align)
        })
    }, [selectionID, defaultAlign])


    const setFontFamily = useMutation(({storage}, font: string) => {
        const liveLayer = storage.get("layers")
        setLastFontFamily(font)

        selectionID.forEach((id) => {
            liveLayer.get(id)?.set("fontFamily", font)
        })
    }, [selectionID, defaultFontFamily])

    const setBold = useMutation(({ storage }, bold: boolean) => {
        const isBold = isMultiSelected 
            ? !lastBold
            : bold   
        
        const liveLayer = storage.get("layers")
        selectionID.forEach((id) => {
            liveLayer.get(id)?.set("isBold", isBold)
        })
        setLastBold(isBold)
        
    }, [selectionID, defaultBold])

    const setItalic = useMutation(({ storage }, italic: boolean) => {
        const isItalic = isMultiSelected 
            ? !lastItalic
            : italic  

        const liveLayer = storage.get("layers")
        setLastItalic(isItalic)

        selectionID.forEach((id) => {
            liveLayer.get(id)?.set("isItalic", isItalic)
        })
    }, [selectionID, defaultItalic])

    const setUnderline = useMutation(({ storage }, underline: boolean) => {
        const isUnderline = isMultiSelected 
            ? !lastUnderline
            : underline  

        const liveLayer = storage.get("layers")
        setLastUnderline(isUnderline)

        selectionID.forEach((id) => {
            liveLayer.get(id)?.set("isUnderline", isUnderline)
        })
    }, [selectionID, defaultUnderline])

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


    const deleteLayer = useDeleteLayer()

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
                <div className="flex gap-2">
                    {/* FONT OPTION */}
                    <div className="w-full">
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
                                        <p style={{ fontFamily: defaultFontFamily }}>
                                            {defaultFontFamily}
                                        </p>
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
                            <DropdownMenuContent className="w-56 max-h-64 overflow-y-auto">
                                <DropdownMenuLabel>
                                    Font Style
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup 
                                    value={defaultFontFamily} 
                                    onValueChange={setFontFamily}>
                                    {
                                        fontFamilyData.map((fontData, index) => (
                                            <DropdownMenuRadioItem key={index} value={fontData.fontFamily}>
                                                <p style={{
                                                    fontFamily: fontData.fontFamily
                                                }}>
                                                        {fontData.fontFamily}
                                                </p>
                                            </DropdownMenuRadioItem>
                                    ))
                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>

                    {/* SIZE OPTION */}
                    <div className="w-[20%]">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div>
                                    <Info label="Font size">
                                        <Button 
                                            variant="outline"
                                            className="
                                                flex
                                                justify-between
                                                items-center
                                                px-2
                                            "
                                        >
                                            <p>{parseInt(defaultFontSize!, 10)}</p>
                                        </Button>
                                    
                                    </Info>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent 
                                className="
                                    w-5 
                                    max-h-64 
                                    overflow-y-auto"
                                >
                                <DropdownMenuLabel>
                                    Font Size
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup 
                                    value={defaultFontSize} 
                                    onValueChange={setFontSize}>
                                    {
                                        fontSizeData.map((size, index) => (
                                            <DropdownMenuRadioItem 
                                                key={index} 
                                                value={size.fontSize as string}
                                            >
                                                <p>{ size.fontSize }</p>
                                            </DropdownMenuRadioItem>
                                        ))
                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>


                </div>

                {/* FONT APPS */}
                <div className="flex gap-2">
                    <div className="flex gap-1 items-center">
                        <Button
                            onClick={() => setBold(!(layer && layer.isBold))}
                            variant={"ghost"}
                            className={cn(
                                defaultBold
                                ? "bg-slate-100"
                                : "bg-transparent"
                            )}
                        >
                            <Bold className="h-4 w-4" />
                        </Button>
                        <Button
                            onClick={() => setItalic(!(layer && layer.isItalic))}
                            variant={"ghost"}
                            className={cn(
                                defaultItalic
                                ? "bg-slate-100"
                                : "bg-transparent"
                            )}
                        >
                            <Italic className="h-4 w-4" />
                        </Button>
                        <Button
                            onClick={() => setUnderline(!(layer && layer.isUnderline))}
                            variant={"ghost"}
                            className={cn(
                                defaultUnderline
                                ? "bg-slate-100"
                                : "bg-transparent"
                            )}
                        >
                            <Underline className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex gap-1">
                        {/* FONT COLOR OPTION */}
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button
                                    variant={"ghost"}
                                    className="
                                        relative 
                                        flex 
                                        flex-col
                                        px-2
                                    "
                                >
                                    <CaseUpper 
                                        className="
                                            h-4 
                                            w-4 
                                            font-extrabold
                                        " 
                                    />
                                    <Minus 
                                        style={{
                                            color: defaultFontColor ? rgbToHex(defaultFontColor) : "#000"
                                        }}
                                        className="
                                            absolute 
                                            w-full
                                            h-4 
                                            font-extrabold 
                                            bottom-1
                                        " 
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent 
                                side="top"
                                className="background-none" 
                            >
                                <ColorOptions
                                    onChange ={setFontColor}
                                    selectedColor={defaultFontColor}
                                />
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* BACKGROUND FILL OPTION */}
                        <DropdownMenu>
                            <DropdownMenuTrigger disabled={!isMultiSelected && (layer?.type !== LayerType.Text && layer?.type === LayerType.Drawing)}
>
                                <Button
                                    variant={"ghost"}
                                    className="
                                        relative 
                                        flex 
                                        flex-col
                                        items-center
                                        justify-center
                                        px-2
                                    "
                                    disabled={!isMultiSelected && (layer?.type !== LayerType.Text && layer?.type === LayerType.Drawing)}
                                >
                                    <PaintBucket 
                                        className="
                                            w-4 
                                            h-3
                                            font-extrabold
                                        " 
                                    />
                                    <Minus 
                                        style={{
                                            color: defaultFillColor ? rgbToHex(defaultFillColor) : "transparent"
                                        }}
                                        className="
                                            absolute 
                                            w-full 
                                            h-4 
                                            font-extrabold 
                                            bottom-1
                                        " 
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top" 
                                className="background-none"
                            >
                                <ColorOptions
                                    onChange ={setFill}
                                    selectedColor={defaultFillColor}
                                />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
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
                            onClick={increaseFontSize}
                        >
                            <AArrowUp
                                className="
                                    h-4
                                    w-4
                                "
                            />
                        </Button>

                    </Info>
                    <Info label="Decrease font size" side="bottom">
                        <Button
                            variant={"ghost"}
                            onClick={decreaseFontSize}
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
                    value={defaultAlign} 
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
                    <Info label="Align justify" side="bottom">
                        <ToggleGroupItem value={TextAlign.alignJustify} aria-label="Toggle justify">
                            <AlignJustify className="h-4 w-4" />
                        </ToggleGroupItem>
                    </Info>
                    <Info label="Align center" side="bottom">
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