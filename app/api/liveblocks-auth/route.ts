import { api } from "@/convex/_generated/api"
import { Liveblocks } from "@liveblocks/node"
import { ConvexHttpClient } from "convex/browser"
import { auth, currentUser } from "@clerk/nextjs/server"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!
})

export async function POST(req: Request) {
    const authUser = await auth()
    const user = await currentUser()

    if(!authUser || !user) return new Response("Not authenticated...!",{
        status: 403
    })
    
    const { room } = await req.json()

    if (!room) {
        return new Response("Missing lobby ID in the request", {
            status: 400
        });
    }

    const board = await convex.query(api.board.getByID,{
        id: room
    })

    if(board?.orgID !== authUser.orgId) return new Response("Not authenticated...!",{
        status: 403
    })

    const userInfo = {
        name: user.firstName || "Anonymous Teammate",
        image: user.imageUrl
    }

    const userSession = liveblocks.prepareSession(
        user.id,
        { userInfo }
    )

    if(room) {
        userSession.allow(
            room,
            userSession.FULL_ACCESS
        )
    }

    const { status, body } = await userSession.authorize()

    return new Response(
        body,
        { status }
    )
}