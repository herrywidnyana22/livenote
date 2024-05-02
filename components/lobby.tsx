'use client'

import { ReactNode } from "react"
import { ClientSideSuspense } from "@liveblocks/react"
import { RoomProvider } from "@/liveblocks.config"


interface LobbyProps {
    children: ReactNode
    lobbyID: string
    fallback: NonNullable<ReactNode> | null
}
export const Lobby = ({
    children,
    lobbyID,
    fallback
}: LobbyProps) => {
    return ( 
        <RoomProvider
            id={lobbyID}
            initialPresence={{}}
        >
            <ClientSideSuspense fallback={fallback}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    );
}