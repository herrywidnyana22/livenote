
import { Loader } from "lucide-react";
import { MemberSkeleton } from "./member";
import { ToolbarSkeleton } from "./toolbar";
import { CanvasHeaderSkeleton } from "./canvasHeader";

export const Loading = () => {
    return ( 
        <main
            className="
                relative
                w-full
                h-full
                flex
                justify-center
                items-center
                touch-none
                bg-neutral-100
            "
        >
            <Loader
                className="
                    w-6
                    h-6
                    text-muted-foreground
                    animate-spin
                "
            />
            <CanvasHeaderSkeleton/>
            <MemberSkeleton/>
            <ToolbarSkeleton/>
        </main>
    );
}