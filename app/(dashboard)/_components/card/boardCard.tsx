'use client'

import Link from "next/link"
import Image from "next/image"

import { useAuth } from "@clerk/nextjs"
import { OverlayEffect } from "./overlay"
import { MoreHorizontal } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { Actions } from "@/components/actions"
import { Skeleton } from "@/components/ui/skeleton"
import { FooterCard } from "./footerCard"

interface BoardCardProps{
    id: string
    orgID: string
    title: string
    imageURL: string
    userID: string
    userName: string
    createdAt: number
    isFav: boolean
    editedData: any, 
    setEditedData: any
}
export const BoardCard = ({
    id,
    title,
    imageURL,
    userID,
    userName,
    createdAt,
    orgID,
    isFav,
    editedData, 
    setEditedData
}: BoardCardProps) => {
       
    const { userId } = useAuth()
    const authorLabel = userId === userID 
    ? "You"
    : userName

    const timeCreatedLabel = formatDistanceToNow(createdAt,{
        addSuffix: true
    })
    return ( 
        
            <div
                className="
                    group
                    aspect-[100/127]
                    flex
                    flex-col
                    justify-between
                    border
                    rounded-lg
                    overflow-hidden
                "
            >
                
                    <div
                        className="
                            relative
                            flex-1
                            bg-amber-50
                        "
                    >
                        <Link
                            href={`/board/${id}`}
                        >
                            <Image
                                src={imageURL}
                                alt="Board Image"
                                fill
                                className="
                                    object-fit
                                "
                            />
                            <OverlayEffect/>
                            <Actions
                                id={id}
                                side="right"
                                setEditedData={setEditedData}
                            >
                                <button
                                    type="button"
                                    className="
                                        absolute
                                        top-1
                                        right-1
                                        px-3
                                        py-2
                                        opacity-0
                                        group-hover:opacity-100
                                        transition-opacity
                                        outline-none
                                    "
                                >
                                    <MoreHorizontal
                                        className="
                                            opacity-75
                                            hover:opacity-100
                                            transition-opacity
                                            text-white
                                        "
                                    />
                                </button>
                            </Actions>
                        </Link>
                    </div>
                <FooterCard
                    id={id}
                    orgID={orgID}
                    title={title}
                    authorLabel={authorLabel}
                    timeCreatedLabel={timeCreatedLabel}
                    isFav= {isFav}
                    editedData={editedData}
                    setEditedData={setEditedData}
                />
            </div>
    );
}

BoardCard.Skeleton = function BoardCardSkeleton() {
    return(
        <div
            className="
                aspect-[100/127]
                rounded-lg
                overflow-hidden
            "
        >
            <Skeleton
                className="
                    w-full
                    h-full
                "
            />
        </div>
    )
}