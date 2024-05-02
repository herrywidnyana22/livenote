import { Info } from "@/components/info"
import { cn } from "@/lib/utils"
import { Loader2, Save, Star, X } from "lucide-react"
import { Input } from "../input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useHookMutation } from "@/hooks/useMutation"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

interface FooterCardProps{
    id: string
    orgID: string
    title: string
    authorLabel: string
    timeCreatedLabel: string
    isFav: boolean
    editedData?: string
    setEditedData?: any
}


export const FooterCard = ({
    id,
    orgID,
    title,
    authorLabel,
    timeCreatedLabel,
    isFav,
    editedData,
    setEditedData
}: FooterCardProps) => {
    const [value, setValue] = useState("")

    const { mutate: updateMutate, isPending: updateIsPending } = useHookMutation(api.board.update);
    const { mutate: favMutate, isPending: favIsPending } = useHookMutation(api.board.fav);
    const { mutate: unFavMutate, isPending: unFavIsPending } = useHookMutation(api.board.unFav);

    const onCancel = () =>{
        setEditedData("")
        setValue("")
    }

    const onFav = () =>{
        if(isFav){
            unFavMutate({id})
            .catch(()=> toast.error("Failed to unfavorite this board"))
        }
        else{
            favMutate({id, orgID})
            .catch(()=> toast.error("Failed to favorite this board"))
        }
    }

    const onSubmit = () =>{        

        updateMutate({
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
           
            <div
                className={cn(`
                    relative`,
                    (editedData === id && editedData !== "")
                    ? "w-full"
                    : "max-w-[calc(100%-20px)]"
                )}
            >
                {
                    (editedData === id && editedData !== "")
                    ?  <div 
                            className="
                                w-full
                                flex
                                gap-1
                            "
                        >
                            <Input
                                id={id}
                                name={id}
                                type="text"
                                value={title}
                                label={"Board Name"}
                                onChange={(e) => setValue(e.target.value)}
                                disabled={updateIsPending}
                                readOnly={!(editedData === id && editedData !== "")}
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
                    : <p className="truncate">{title}</p>
                }
               
                
                <span
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
                </span>              
                
            </div>
            {
            editedData !== id
            && (
                <div
                    className="
                        h-full
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
                            disabled={favIsPending || unFavIsPending}
                            onClick={onFav}
                            className={cn(`                        
                                transition
                                text-muted-foreground
                                hover:text-blue-600`,
                                favIsPending || unFavIsPending && "cursor-not-allowed opacity-75"
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
        </div>
    );
}