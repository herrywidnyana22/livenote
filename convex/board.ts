import { v } from "convex/values"
import { mutation } from "./_generated/server"
import { query } from "./_generated/server";

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

        const create = await ctx.db.insert("boards", {
            title: arg.title,
            orgID: arg.orgID,
            authorID: userIdentity.subject,
            authorName: userIdentity.name!,
            imageURL: randomImage
        })

        return create
    }

})

export const remove = mutation({
    args: {
        id: v.id("boards")
    },
    
    handler: async (ctx, args) =>{
        const userIdentity = await ctx.auth.getUserIdentity()

        if(!userIdentity) throw new Error ("Not authenticated...!")

        await ctx.db.delete(args.id)
    }
})

export const getAll = query({
    args:{
        orgID: v.string()
    },
    handler: async(ctx, args) =>{
        const userIdentity = await ctx.auth.getUserIdentity()

        if(!userIdentity) throw new Error("Not authenticated...!")

        const getAllBoard = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgID",args.orgID))
        .order("desc")
        .collect()

        return getAllBoard
    }
})