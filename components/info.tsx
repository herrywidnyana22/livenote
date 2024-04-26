import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"


export interface infoProps{
    label: string
    children: React.ReactNode
    side?: "top" | "bottom" | "left" | "right"
    align?: "start" | "center" | "end"
    sideOffset?: number
    alignOffset?: number
}

export const Info = ({
    label,
    children,
    side,
    align,
    sideOffset,
    alignOffset
}: infoProps) => {
    return(
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                    className="
                        border-black
                        text-white
                        bg-black
                    "
                >
                    <p
                        className="
                            text-sm
                            capitalize
                        "
                    >
                        { label }
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}