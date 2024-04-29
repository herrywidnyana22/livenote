import { Info } from "@/components/info"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

interface FooterCardProps{
    title: string
    authorLabel: string
    timeCreatedLabel: string
    isFav: boolean
    disabled: boolean
    onClick: () => void
}

export const FooterCard = ({
    title,
    authorLabel,
    timeCreatedLabel,
    isFav,
    disabled,
    onClick
}: FooterCardProps) => {
    return ( 
        <div
            className="
                relative
                flex
                justify-between
                items-center
                p-3
                bg-white
            "
        >
            <div>
                <p
                    className="
                        max-w-[calc(100%-20px)]
                        text-sm
                        truncate
                    "
                >
                    { title }
                </p>
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
        </div>
    );
}