import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
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