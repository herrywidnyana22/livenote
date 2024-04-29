'use client'

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Link2, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useHookMutation } from "@/hooks/useMutation"
import { api } from "@/convex/_generated/api"
import { AlertModal } from "./alertModal"
import { Button } from "./ui/button"

interface ActionProps{
    id: string
    title: string
    children: React.ReactNode
    side?: DropdownMenuContentProps["side"]
    sideOffset?: DropdownMenuContentProps["sideOffset"]
}

const Actions = ({
    id,
    title,
    children,
    side,
    sideOffset,
}: ActionProps) => {

    const { mutate, isPending } = useHookMutation(api.removeBoard.remove)

    const copyLink = () =>{
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`
        )
        .then(() => toast.success("Link copied!"))
        .catch(() => toast.error("Failed to copy link"))
    }

    const deleteBoard = () =>{
        mutate({ id })
        .then(() => toast.success("Board deleted..."))
        .catch(() => toast.error("Failed to delete board..!"))
        
    }

    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                { children }
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(event) => event.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
                className="w-full"
            >
                <DropdownMenuItem
                    onClick={copyLink}
                    className="
                        p-3
                        cursor-pointer
                    "
                >
                    <Link2
                        className="
                            w-4
                            h-4
                            mr-2
                        "
                    />
                    Copy board link
                </DropdownMenuItem>
                <AlertModal
                    title="Delete this board?"
                    desc="This will delete the board and all of its contents"
                    disabled={isPending}
                    onOk={deleteBoard}
                >
                    <Button
                        variant={"ghost"}
                        className="
                            w-full
                            justify-start
                            p-3
                            text-sm
                            font-normal
                            cursor-pointer
                        "
                    >
                        <Trash2
                            className="
                                w-4
                                h-4
                                mr-2
                            "
                        />
                        Delete this board
                    </Button>
                </AlertModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
 
export default Actions;