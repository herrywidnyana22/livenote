'use client'

import * as LucideIcons from "lucide-react"

import { memberOnlineColor } from "@/lib/utils"
import { useOther } from "@/liveblocks.config";
import { LucideIcon } from "lucide-react";
import { memo } from "react";
import { CanvasMode, CanvasState } from "@/types/canvasType";

interface CursorProps{
    connectionID: number
    canvasState: CanvasState
}

export const Cursor = memo(({connectionID, canvasState}: CursorProps) => {
    const members = useOther(connectionID, (user) => user?.info)
    const cursor = useOther(connectionID, (user) => user.presence.cursor)
    const memberToolActive = useOther(connectionID, (user) => user.presence.activeTools)
    const name = members?.name || "Team Mate"

    const IconToolActive = memberToolActive ? LucideIcons[memberToolActive] as LucideIcon : null
    // const IconToolActive = memberToolActive ? LucideIcons[memberToolActive] as LucideIcon : undefined


    if(!cursor){
        return null
    }

    const { x, y } = cursor

    return ( 
        <foreignObject
            style={{
                transform: `translateX(${x}px) translateY(${y}px)`,
            }}
            width={name.length * 10 + 24}
            height={50}
            className="
                relative 
                drop-shadow-md
            "
        >
            
            <LucideIcons.MousePointer2
                className="
                    w-5
                    h-5
                "
                style={{
                    fill: memberOnlineColor(connectionID),
                    color: memberOnlineColor(connectionID)
                }}
            />
            {
                IconToolActive && 
                <IconToolActive
                    style={{
                        color: memberOnlineColor(connectionID)
                    }} 
                    className="
                        absolute
                        w-3
                        h-3
                        top-0
                        right-2
                    "
                />
            }
            <div
                className="
                    absolute
                    top-4
                    left-5
                    px-1.5
                    py-0.5
                    rounded-md
                    text-xs
                    font-semibold
                    text-white
                "
                style={{
                    backgroundColor: memberOnlineColor(connectionID)
                }}
            >
                { name }
            </div>
        </foreignObject>
    );
})



Cursor.displayName = "Cursor"