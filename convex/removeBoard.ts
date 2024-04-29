import { v } from "convex/values";
import { mutation } from "./_generated/server";

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