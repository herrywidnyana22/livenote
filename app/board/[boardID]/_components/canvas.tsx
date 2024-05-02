'use client'

import { useSelf } from "@/liveblocks.config";
import { CanvasHeader } from "./canvasHeader";
import Member from "./member";
import Toolbar from "./toolbar";

interface CanvasProps{
    boardID: string
}

const Canvas = ({
    boardID
}: CanvasProps) => {
    const userInfo = useSelf((user) => user.info)

    console.log({userInfo})
    return (
        <main
            className="
                relative
                w-full
                h-full
                touch-none
                bg-neutral-100
            "
        >
            <CanvasHeader baordID={boardID}/>
            <Member/>
            <Toolbar/>
        </main>
    );
}
 
export default Canvas;