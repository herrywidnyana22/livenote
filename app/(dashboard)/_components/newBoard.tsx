'use client'

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Plus } from "lucide-react";
import { useHookMutation } from "@/hooks/useMutation";

interface NewBoardProps{
    orgID: string
    disabled?: boolean
}
export const NewBoard = ({orgID, disabled}: NewBoardProps) => {

    const {mutate, isPending} = useHookMutation(api.board.create)
    const router = useRouter()

    const handleNewClick = () => {
        mutate({
            orgID,
            title: "Untitled"
        })
        .then((id)=> {
            toast.success("Board created, redirect to board...")
            router.push(`/board/${id}`)
        })
        .catch(() => toast.error("Failed to create board"))

    }

    return ( 
        <button
            onClick={handleNewClick}
            disabled={disabled}
            className={cn(`
                group
                aspect-100/127
                flex
                flex-col
                justify-center
                items-center
                py-6
                col-span-1
                rounded-lg
                border-2
                border-dashed
                hover:bg-blue-600
                hover:border-none`,
                (isPending || disabled) && "opacity-75 cursor-not-allowed"
            )}
        >
            <div/>
            {
                isPending 
                ?   <>
                        <Loader2
                            className="
                                w-12
                                h-12
                                stroke-1
                                mb-2
                                animate-spin
                                text-white
                            "
                        />
                        <p
                            className="
                                text-sm
                                font-light
                                text-muted-foreground
                                text-white
                            "
                        >
                            Creating new board...
                        </p>
                    </>
                :   <>
                        <Plus
                            className="
                                w-12
                                h-12
                                stroke-2
                                mb-2
                                text-slate-500
                                group-hover:text-white
                            "
                        />
                        <p
                            className="
                                text-sm
                                font-light
                                text-slate-500
                                group-hover:text-white
                            "
                        >
                            New Board
                        </p>
                    </>
            }
            
        </button>
    );
}