'use client'

import { Color } from '@/types/canvasType'
import { ColorResult, SketchPicker } from 'react-color'


type ColorOptionsProps = {
    onChange: (color: Color) => void
    selectedColor: Color
}

export const ColorOptions = ({
    onChange,
    selectedColor
}: ColorOptionsProps) => {

    const defaultColor = 
    selectedColor 
        ? selectedColor 
        : {
            r: 241,
            g: 112,
            b: 19,
        }

    const handleChange = (value: ColorResult) => {
        onChange(value.rgb)
    }

    return ( 
        <SketchPicker 
            color={ defaultColor } 
            onChange={ handleChange}
            className='z-10'
        />
    )
}