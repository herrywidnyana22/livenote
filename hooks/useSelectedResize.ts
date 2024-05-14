import { shallow } from "@liveblocks/client";
import { Layer, dimention } from "@/types/canvasType";
import { useSelf, useStorage } from "@/liveblocks.config";

const resizeBox = (layers: Layer[]): dimention | null =>{
    const firstLayer = layers[0]

    if(!firstLayer) return null

    let top = firstLayer.y
    let bottom = firstLayer.y + firstLayer.height
    let left = firstLayer.x
    let right = firstLayer.x + firstLayer.width

    for (let i = 1; i< layers.length; i++){
        const {width, height, x, y} = layers[i]

        if(left > x) left = x
        if(right < x + width) right = x + width
        if(top > y) top = y
        if(bottom < y + height) bottom = y + height
    }

    return{
        x: left,
        y: top,
        width: right - left,
        height: bottom - top
    }
}

export const useSelectedResize= () =>{
    const selected = useSelf((me) => me.presence.select)

    return useStorage((root) => {
        const selectedLayer = selected
            .map((id) => root.layers.get(id)!)
            .filter(Boolean)

        return resizeBox(selectedLayer)
    }, shallow)
}