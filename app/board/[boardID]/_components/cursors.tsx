'use client'

import { memberOnlineColor } from "@/lib/utils"
import { useOther } from "@/liveblocks.config";
import { MousePointer2 } from "lucide-react";
import { memo } from "react";
interface CursorProps{
    connectionID: number
}


export const Cursor = memo(({connectionID}: CursorProps) => {
    const members = useOther(connectionID, (user) => user?.info)
    const cursor = useOther(connectionID, (user) => user.presence.cursor)
    const name = members?.name || "Team Mate"

    console.log({members}, {cursor})

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
            <MousePointer2
                className="
                    w-5
                    h-5
                "
                style={{
                    fill: memberOnlineColor(connectionID),
                    color: memberOnlineColor(connectionID)
                }}
                />
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