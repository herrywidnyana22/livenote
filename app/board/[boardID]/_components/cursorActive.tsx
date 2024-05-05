'use client'

import { useOthersConnectionIds } from "@/liveblocks.config";
import { memo } from "react";
import { Cursor } from "./cursors";

const Cursors = () =>{
    const userIDActive = useOthersConnectionIds()

    return(
        <>
            {
                userIDActive.map((connectionID) => (
                    <Cursor
                        key={connectionID}
                        connectionID={connectionID}
                    />
                ))
            }
        </>
    )
}

export const CursorMember = memo(() => {
    return ( 
        <>
            <Cursors/>
        </>
    );
})

CursorMember.displayName = "CursorActive"