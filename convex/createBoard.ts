import { v } from "convex/values"
import { mutation } from "./_generated/server"


const images = [
    "/sample/1.svg",
    "/sample/2.svg",
    "/sample/3.svg",
    "/sample/4.svg",
    "/sample/5.svg",
    "/sample/6.svg",
    "/sample/7.svg",
    "/sample/8.svg",
    "/sample/9.svg",
    "/sample/10.svg",
    "/sample/11.svg",
    "/sample/12.svg",
    "/sample/13.svg",
]

export const create = mutation({
    args:{
        orgID: v.string(),
        title: v.string()
    },

    handler: async(ctx, arg) => {
        const userIdentity = await ctx.auth.getUserIdentity()

        if(!userIdentity) throw new Error ("Not authenticated...!")

        const randomImage = images[Math.floor(Math.random() * images.length)]

        const createBoard = await ctx.db.insert("boards", {
            title: arg.title,
            orgID: arg.orgID,
            authorID: userIdentity.subject,
            authorName: userIdentity.name!,
            imageURL: randomImage
        })

        return createBoard
    }

})