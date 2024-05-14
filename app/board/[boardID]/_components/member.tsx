'use client'

import { useState } from "react";
import { Minimize2 } from "lucide-react";
import { useOthers,useSelf } from "@/liveblocks.config";
import { memberOnlineColor } from "@/lib/utils";

import { Info } from "@/components/info";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "./userAvatar";



export const Member = () => {
    const [isExpand, setIsExpand] = useState(false)

    const maxUserList = 1
    const memberInRoom = useOthers()
    const currentUser = useSelf()

    const isMoreUsers = memberInRoom.length > maxUserList

    return (
        <div
            className="
                absolute
                h-auto
                flex
                flex-col
                gap-2
                top-2
                right-2
                p-3
                rounded-md
                shadow-md
                bg-white
                transition
                duration-100
                hover:shadow-xl
            "
        >
            <div 
                className="
                    flex
                "
            >
                <Info
                    label="Online this Room"
                    side="left"
                    sideOffset={18}
                >
                    <div
                        className="
                            absolute
                            w-3
                            h-3
                            top-1
                            left-1
                            rounded-full
                            bg-green-600
                        "
                    />
                </Info>
                {
                    isExpand &&
                    <Minimize2
                        onClick={() => setIsExpand(false)}
                        className="
                            absolute
                            w-3
                            h-3
                            top-1.5
                            right-1.5
                            cursor-pointer
                            text-red-600
                        "
                    />
                }
                {
                    isExpand 
                    ?   (
                            <div 
                                className="
                                    w-full
                                    font-bold 
                                    text-sm
                                    space-y-1
                                "
                            >
                                <h2 
                                    className="
                                        text-center
                                        uppercase 
                                        text-slate-600
                                    "
                                >
                                    In lobby
                                </h2>
                                <Separator/>
                            </div>
                        )

                    :   (
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
                                    <div onClick={() => setIsExpand(true)}>
                                        <UserAvatar
                                            name={`${memberInRoom.length - maxUserList} more`}
                                            fallback={`+${memberInRoom.length - maxUserList}`}
                                        />
                                    </div>
                                    
                                )
                            }
                            </div>
                        )
                }
            </div>
            {
                
                isExpand &&
                
                <div
                    className="
                        w-full
                        flex
                        flex-col
                        gap-2
                    "  
                >
                    {
                        currentUser && (
                            <div
                                className="
                                    w-full
                                    flex
                                    items-center
                                    justify-between
                                    gap-2
                                "
                            >
                                <div 
                                    className="
                                        flex 
                                        items-center 
                                        gap-1
                                    "
                                >
                                    <UserAvatar
                                        src={currentUser.info?.image}
                                        name={`${currentUser.info?.name} (Me)`}
                                        ringColor={memberOnlineColor(currentUser.connectionId)}
                                        fallback={currentUser.info?.name?.[0]}
                                    />
                                    
                                    <p className="text-xs font-semibold">
                                        {`${currentUser.info?.name} (Me)`}
                                    </p>

                                </div>
                                <div
                                    className="
                                        w-3 
                                        h-3
                                        rounded-sm
                                    "
                                    style={{
                                        backgroundColor: memberOnlineColor(currentUser.connectionId)
                                    }}
                                />
                            </div>
                        )
                    }
                     {
                        
                        memberInRoom.slice(0, memberInRoom.length).map(({connectionId, info}) => (
                        <div
                            key={connectionId}
                            className="
                                w-full
                                flex
                                items-center
                                justify-between
                                gap-2
                            "
                        >
                            <div 
                                className="
                                    flex 
                                    items-center 
                                    gap-1
                                "
                            >
                                <UserAvatar
                                    ringColor={memberOnlineColor(connectionId)}
                                    src={info?.image}
                                    name={info?.name }
                                    fallback={info?.name?.[0] || "T"}
                                />
                                <p className="text-xs font-semibold">
                                    { info?.name }
                                </p>
                            </div>
                            <div
                                className="w-3 h-3 rounded-sm"
                                style={{
                                    backgroundColor: memberOnlineColor(connectionId)
                                }}
                            />
                        </div>
                    ))}
                    
                </div>

            }
        </div>
    );
}

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
                bg-white
                transition
                duration-50
                w-24
            "
        />
    )
}