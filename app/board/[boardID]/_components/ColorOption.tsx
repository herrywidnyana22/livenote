'use client'

import { Color } from "@/types/canvasType";
import { Check } from "lucide-react";
import { calculateBrightness, rgbToHex } from "@/lib/utils";

type ColorOptionsProps = {
    onChange: (color: Color) => void
    selectedColor: Color
}

export const ColorOptions = ({
    onChange,
    selectedColor
}: ColorOptionsProps) => {
    

    return ( 
        <div
            className="
                max-w-[168px]
                flex
                flex-wrap
                items-center
                gap-2
                pr-2
                mr-2
                border-r
                border-neutral-200
            "
        >
            <ColorButton
                onClick={onChange}
                color={{
                    r: 243, 
                    g: 82,
                    b: 94
                }}
                selectedColor={selectedColor}
            />
            <ColorButton
                onClick={onChange}
                color={{
                    r: 255, 
                    g: 235,
                    b: 59
                }}
                selectedColor={selectedColor}
            />
            <ColorButton
                onClick={onChange}
                color={{
                    r: 68, 
                    g: 200,
                    b: 100
                }}
                selectedColor={selectedColor}
            />
            <ColorButton
                onClick={onChange}
                color={{
                    r: 40, 
                    g: 145,
                    b: 235
                }}
                selectedColor={selectedColor}
            />
            <ColorButton
                onClick={onChange}
                color={{
                    r: 155, 
                    g: 105,
                    b: 245
                }}
                selectedColor={selectedColor}
            />
            <ColorButton
                onClick={onChange}
                color={{
                    r: 252, 
                    g: 145,
                    b: 42
                }}
                selectedColor={selectedColor}
            />
            <ColorButton
                onClick={onChange}
                color={{
                    r: 255, 
                    g: 255,
                    b: 255
                }}
                selectedColor={selectedColor}
            />
            <ColorButton
                onClick={onChange}
                color={{
                    r: 0, 
                    g: 0,
                    b: 0
                }}
                selectedColor={selectedColor}
            />
        </div>
    );
}

type ColorButtonProps = {
    color: Color,
    onClick: (color:Color) => void
    selectedColor: Color
}


const ColorButton = ({color, onClick, selectedColor}: ColorButtonProps) => {
    
    const luminanceThreshold = 0.7
    const iconColor = calculateBrightness(color) > luminanceThreshold ? 'black' : 'white'
    
    return ( 
        <button
            onClick={() =>onClick(color)}
            className="
                w-8
                h-8
                flex
                justify-center
                items-center
                transition
                hover:opacity-75
            "
        >
            
            <div
                style={{
                    background: rgbToHex(color)
                }}
                className="
                    flex
                    items-center
                    justify-center
                    w-8
                    h-8
                    rounded-md
                    border
                    border-neutral-300
                "
            >
                {
                    
                    selectedColor.r === color.r 
                    && selectedColor.g === color.g 
                    && selectedColor.b === color.b
                    && (
                        <Check
                            color={iconColor}
                        />
                       )
                    
                }
            </div>
        </button>
    );
}