'use client'

import { memo } from "react";
import { shallow } from "@liveblocks/client";
import { rgbToHex } from "@/lib/utils";
import { CanvasState } from "@/types/canvasType";
import { useOthersConnectionIds, useOthersMapped } from "@/liveblocks.config";

import { Cursor } from "./cursors";
import { Drawing } from "./drawing";

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