'use client'

import { rgbToHex } from "@/lib/utils";
import { Color } from "@/types/canvasType";

type ColorOptionsProps = {
    onChange: (color: Color) => void
}

export const ColorOptions = ({onChange}: ColorOptionsProps) => {
    

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
            />
            <ColorButton
                onClick={onChange}
                color={{
                    r: 255, 
                    g: 235,
                    b: 59
                }}
            />
            <ColorButton
                onClick={onChange}
                color={{
                    r: 68, 
                    g: 200,
                    b: 100
                }}
            />
            <ColorButton
                onClick={onChange}
                color={{
                    r: 40, 
                    g: 145,
                    b: 235
                }}
            />
            <ColorButton
                onClick={onChange}
                color={{
                    r: 155, 
                    g: 105,
                    b: 245
                }}
            />
            <ColorButton
                onClick={onChange}
                color={{
                    r: 252, 
                    g: 145,
                    b: 42
                }}
            />
            <ColorButton
                onClick={onChange}
                color={{
                    r: 255, 
                    g: 255,
                    b: 255
                }}
            />
            <ColorButton
                onClick={onChange}
                color={{
                    r: 0, 
                    g: 0,
                    b: 0
                }}
            />
        </div>
    );
}

type ColorButtonProps = {
    color: Color,
    onClick: (color:Color) => void
}


const ColorButton = ({color, onClick}: ColorButtonProps) => {
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
                    w-8
                    h-8
                    rounded-md
                    border
                    border-neutral-300
                "
            >

            </div>
        </button>
    );
}