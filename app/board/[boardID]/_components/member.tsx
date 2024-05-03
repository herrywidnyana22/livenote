'use client'

import { useOthers,useSelf } from "@/liveblocks.config";
import { UserAvatar } from "./userAvatar";
import { Eye } from "lucide-react";
import { Info } from "@/components/info";
import { memberOnlineColor } from "@/lib/utils";



const Member = () => {
    
    const maxUserList = 2
    const memberInRoom = useOthers()
    const currentUser = useSelf()

    const isMoreUsers = memberInRoom.length > maxUserList

    return (
        <div
            className="
                absolute
                h-12
                flex
                items-center
                top-2
                right-2
                p-3
                rounded-md
                shadow-md
                bg-white
                transition
                duration-50
                hover:shadow-xl
            "
        >
            <Info
                label="Online this Room"
                side="left"
                sideOffset={18}
            >
                <Eye
                    className="
                        absolute
                        w-3
                        h-3
                        top-1
                        left-1
                        text-sky-600
                    "
                />

            </Info>
            <div
                className="
                    flex
                    gap-1
                    items-center
                    justify-center
                    pl-2
                "       
            >
            {
                memberInRoom.slice(0, maxUserList).map(({connectionId, info}) =>{
                    return(
                        <UserAvatar
                            key={connectionId}
                            ringColor={memberOnlineColor(connectionId)}
                            src={info?.image}
                            name={info?.name }
                            fallback={info?.name?.[0] || "T"}
                        />
                    )
                })
            }
            {
                currentUser && (
                    <UserAvatar
                        src={currentUser.info?.image}
                        name={`${currentUser.info?.name} (Me)`}
                        ringColor={memberOnlineColor(currentUser.connectionId)}
                        fallback={currentUser.info?.name?.[0]}
                    />
                )
            }
            {
                isMoreUsers && (
                    <UserAvatar
                        name={`${memberInRoom.length - maxUserList} more`}
                        fallback={`+${memberInRoom.length - maxUserList}`}
                    />
                )
            }
            </div>
        </div>
    );
}
 
export default Member

export const MemberSkeleton = () =>{
    return(
        <div
            className="
                absolute
                h-12
                flex
                items-center
                top-2
                right-2
                p-3
                rounded-md
                shadow-md
                bg-white
                transition
                duration-50
                w-24
            "
        />
    )
}