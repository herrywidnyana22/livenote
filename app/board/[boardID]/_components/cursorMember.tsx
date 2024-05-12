'use client'

import { useOthersConnectionIds } from "@/liveblocks.config";
import { memo } from "react";
import { Cursor } from "./cursors";
import { CanvasState } from "@/types/canvasType";

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

export const CursorMember = memo(({canvasState}: CursorMemberProps) => {
    return ( 
        <>
            <Cursors
                canvasState={canvasState}
            />
        </>
    );
})

CursorMember.displayName = "CursorMember"