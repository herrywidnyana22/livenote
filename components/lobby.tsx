'use client'

import { ReactNode } from "react"
import { ClientSideSuspense } from "@liveblocks/react"
import { RoomProvider } from "@/liveblocks.config"
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client"
import { Layer } from "@/types/canvasType"


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
            initialPresence={{
                cursor: null,
                select: [],
                activeTools: null,
                pencilDraw: null,
                penColor: null
            }}
            initialStorage={{
                layers: new LiveMap<string, LiveObject<Layer>>(),
                layerID: new LiveList()
            }}
        >
            <ClientSideSuspense fallback={fallback}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    );
}