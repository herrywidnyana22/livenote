import { Info } from "@/components/info"
import { cn } from "@/lib/utils"
import { Check, Save, Star, Trash, X } from "lucide-react"
import { Input } from "../input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

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
    const onCancel = () =>{
        setEditedData("")
        setValue("")
    }
    return ( 
        <div
            className="
                relative
                flex
                justify-between
                items-center
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
                    // disabled={disabled}
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
            {
                editedData !== id
                && (
                    <div
                    className="
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
                        absolute
                        right-2
                        top-3
                        flex
                        gap-1
                    "
                >   
                    <Info label="Simpan">
                        <Button
                            type="submit"
                            variant={"secondary"}
                            size={"sm"}
                        >
                            <Save
                                className="
                                    w-3
                                    h-3
                                    text-green-800
                                "
                            />
                        </Button>
                    </Info>
                    
                    <Info label="Cancel">
                        <Button
                            variant={"secondary"}
                            size={"sm"}
                            onClick={onCancel}
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
    );
}