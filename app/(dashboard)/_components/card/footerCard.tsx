import { Info } from "@/components/info"
import { cn } from "@/lib/utils"
import { Check, Loader, Loader2, Save, Star, Trash, X } from "lucide-react"
import { Input } from "../input"
import { Button } from "@/components/ui/button"
import { FormEventHandler, useState } from "react"
import { useHookMutation } from "@/hooks/useMutation"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

interface FooterCardProps{
    id: string
    title: string
    authorLabel: string
    timeCreatedLabel: string
    isFav: boolean
    disabled: boolean
    onClick: () => void
    editedData?: string
    setEditedData?: any
}

export const FooterCard = ({
    id,
    title,
    authorLabel,
    timeCreatedLabel,
    isFav,
    disabled,
    onClick,
    editedData,
    setEditedData
}: FooterCardProps) => {
    const [value, setValue] = useState("")
    const [testing, setTesting] = useState("")

    const {mutate, isPending } = useHookMutation(api.board.update)

    const onCancel = () =>{
        setEditedData("")
        setValue("")
    }

    const onSubmit = () =>{
        setTesting(id)
        

        mutate({
            id,
            title: value
        })
        .then(() => {
            toast.success("Board renamed...")
            setEditedData("")
            setValue("")
        })
        .catch(() => toast.error("Failed to rename board..."))
    }

    return ( 
       
        <div
            className="
                relative
                flex
                gap-1
                justify-between
                p-3
            "
        >
           
            <div>
                <Input
                    id={id}
                    name={id}
                    type="text"
                    value={value}
                    label={title}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={isPending}
                    readOnly={!(editedData === id && editedData !== "")}
                />               
                <p
                    className="
                        text-xs
                        text-muted-foreground
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        truncate
                    "
                >
                    {authorLabel}, {timeCreatedLabel}
                </p>
            </div>
            <div className="relative">
                {
                    editedData !== id
                    && (
                        <div
                            className="
                                h-full
                                flex
                                items-center
                                opacity-0
                                group-hover:opacity-100
                            "
                        >
                            <Info
                                label={isFav ? "Your favorite board" : "Add to favorite"}
                                side="top"
                                align="center"
                                sideOffset={5}
                            >
                                <button
                                    disabled={disabled}
                                    onClick={onClick}
                                    className={cn(`                        
                                        transition
                                        text-muted-foreground
                                        hover:text-blue-600`,
                                        disabled && "cursor-not-allowed opacity-75"
                                    )}
                                >
                                        
                                    <Star
                                        className={cn(`
                                            w-5
                                            h-5`,
                                            isFav && "fill-blue-600 text-blue-600"
                                        )}
                                    />
                                        
                                    
                                </button>
                            </Info>
                        </div>
                    )
                }
                {
                    (editedData === id && editedData !== "") &&
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
                                disabled={isPending || value === ""}
                                className="p-2"
                            >
                                {
                                    isPending 
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
                                    :   (<Save
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
                                disabled={isPending}
                                className="p-2"
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
                }

            </div>
        </div>
    );
}