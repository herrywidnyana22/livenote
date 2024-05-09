'use client'

import { font } from "@/app/(dashboard)/_components/font"
import { Input } from "@/app/(dashboard)/_components/input"
import Actions from "@/components/actions"
import { Info } from "@/components/info"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useHookMutation } from "@/hooks/useMutation"
import { cn } from "@/lib/utils"
import { useQuery } from "convex/react"
import { Check, Loader2, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

interface CanvasHeaderProps{
    baordID: string
}

const HeaderSeparator = () =>{
    return(
        <div
            className="
                text-neutral-300
                px-1.5
            "
        >
            |
        </div>
    )
}

export const CanvasHeader = ({baordID}: CanvasHeaderProps) =>{
    const [value, setValue] = useState("")
    const [editedData, setEditedData] = useState("")

    const { mutate: updateMutate, isPending: updateIsPending } = useHookMutation(api.board.update);
    
    const data = useQuery(api.board.getByID, {
        id: baordID as Id<"boards">
    })

    if(!data) return <CanvasHeaderSkeleton/>

    const onSubmit = () =>{        

        updateMutate({
            id: data._id,
            title: value
        })
        .then(() => {
            toast.success("Board renamed...")
            setValue("")
            setEditedData("")
        })
        .catch(() => toast.error("Failed to rename board..."))
    }

    const onCancel = () =>{
        setEditedData("")
        setValue("")
    }

    return(
        <div
            className="
                absolute
                h-12
                top-2
                left-2
                flex
                items-center
                rounded-md
                shadow-md
                bg-white
                hover:shadow-xl
            "
        >
            <div
                className="
                    relative
                    flex
                    items-center
                    justify-between
                    px-1.5
                "
            >
                <Info 
                    label="Go to Home"
                    side="bottom"
                    sideOffset={10}
                >
                    <Button
                        asChild
                        variant={"board"}
                        className="
                            flex
                            items-center
                            px-2
                        "
                    >
                        <Link href={"/"}>
                            <Image
                                alt="Board Logo"
                                src={"/logo.svg"}
                                width={40}
                                height={40}
                            />
                            <span
                                className={cn(`
                                    ml-2
                                    text-xl
                                    font-semibold
                                    text-black`,
                                    font.className
                                )}
                            >
                                Board
                            </span>
                        </Link>
                    </Button>
                </Info>
                <HeaderSeparator/>
                {
                    (editedData === data._id && editedData !== "")
                    ?  <div 
                            className="
                                relative
                                flex
                                gap-1
                            "
                        >
                            <Input
                                id={data._id}
                                name={data._id}
                                type="text"
                                value={data.title}
                                label={"Board Name"}
                                onChange={(e) => setValue(e.target.value)}
                                disabled={updateIsPending}
                                readOnly={!(editedData === data._id && editedData !== "")}
                            />
                            <div
                                className="
                                    flex
                                    gap-1
                                "
                            >   
                                <Info label="Simpan">
                                    <Button
                                        onClick={onSubmit}
                                        variant={"secondary"}
                                        size={"sm"}
                                        disabled={updateIsPending || value === ""}
                                        className="px-2"
                                    >
                                        {
                                            updateIsPending 
                                            ?   (
                                                    <Loader2
                                                    className="
                                                        w-3
                                                        h-3
                                                        text-green-800
                                                        animate-spin
                                                    "
                                                    />
                                                )
                                            :   (<Check
                                                    className="
                                                        w-3
                                                        h-3
                                                        text-green-800
                                                    "
                                                />)
                                        }
                                        
                                    </Button>
                                </Info>
                                
                                <Info label="Cancel">
                                    <Button
                                        onClick={onCancel}
                                        variant={"secondary"}
                                        size={"sm"}
                                        disabled={updateIsPending}
                                        className="px-2 py-1"
                                    >
                                        <X
                                            className="
                                                w-3
                                                h-3
                                                text-rose-600
                                            "
                                        />
                                    </Button>
                                </Info>
                                
                            </div>
                        </div>
                    : <p className="truncate">{data.title}</p>
                }
                <HeaderSeparator/>
                <Actions
                    id={data._id}
                    side={"bottom"}
                    sideOffset={10}
                    setEditedData={setEditedData}
                >
                    <div>
                        <Info
                            label="Option"
                            side="bottom"
                            sideOffset={10}
                        >
                            <Button
                                size={"icon"}
                                variant={"board"}
                            >
                                <Menu/>
                            </Button>
                        </Info>
                    </div>
                </Actions>
            </div>
        </div>
    )
}

export const CanvasHeaderSkeleton = () =>{
    return(
        <div
            className="
                absolute
                w-[300px]
                h-12
                flex
                items-center
                top-2
                left-2
                px-1.5
                rounded-md
                bg-white
            "
        />
    )
}