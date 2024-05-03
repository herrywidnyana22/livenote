import { Info } from "@/components/info"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps{
    src?: string
    name?: string
    fallback?: string
    ringColor?: string
}
export const UserAvatar = ({
    name,
    src,
    fallback,
    ringColor
}: UserAvatarProps) => {
    return ( 
        <Info
            label={name || "Team Mate"}
            side="bottom"
            sideOffset={18}
        >  
            <Avatar
                className="
                    w-8
                    h-8
                    border-2
                "
                style={{borderColor: ringColor}}
            >
                <AvatarImage src={src}/>
                <AvatarFallback
                    className="
                        text-xs
                        font-semibold
                    "
                >
                    {fallback}
                </AvatarFallback>
            </Avatar>
        </Info>
    );
}