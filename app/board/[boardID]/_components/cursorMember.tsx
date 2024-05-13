'use client'

import { useOthersConnectionIds, useOthersMapped } from "@/liveblocks.config";
import { memo } from "react";
import { Cursor } from "./cursors";
import { CanvasState } from "@/types/canvasType";
import { shallow } from "@liveblocks/client";
import { Drawing } from "./drawing";
import { rgbToHex } from "@/lib/utils";

type CursorMemberProps ={
    canvasState: CanvasState
}

const Cursors = ({canvasState}:CursorMemberProps) =>{
    const userIDActive = useOthersConnectionIds()

    return(
        <>
            {
                userIDActive.map((connectionID) => (
                    <Cursor
                        key={connectionID}
                        connectionID={connectionID}
                        canvasState={canvasState}
                    />
                ))
            }
        </>
    )
}

const MemberDrawing = () => {
    const memberOnline = useOthersMapped((member) => ({
        pencilDraw: member.presence.pencilDraw,
        penColor: member.presence.penColor
    }), shallow)

    return(
        <>
            {
                memberOnline.map(([key, member]) => {
                    if(member.pencilDraw) {
                        return (
                            <Drawing
                                key={key}
                                x={0}
                                y={0}
                                point={member.pencilDraw}
                                fill={member.penColor ? rgbToHex(member.penColor) : "black"}
    
                            />
                        )
                    }

                    return null
                })
            }
        </>
    )
}

export const CursorMember = memo(({canvasState}: CursorMemberProps) => {
    return ( 
        <>
            <MemberDrawing/>
            <Cursors
                canvasState={canvasState}
            />
        </>
    );
})

CursorMember.displayName = "CursorMember"