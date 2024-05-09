import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { getAllOrThrow } from "convex-helpers/server/relationships"

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

export const getAll = query({
    args:{
        orgID: v.string(),
        search: v.optional(v.string()),
        fav: v.optional(v.string())
    },
    handler: async(ctx, args) =>{
        const userIdentity = await ctx.auth.getUserIdentity()

        if(!userIdentity) throw new Error("Not authenticated...!")

        if(args.fav){
            const favBoard = await ctx.db
                .query("userFav")
                .withIndex("by_user_org", (query) => query
                    .eq("userID", userIdentity.subject)
                    .eq("orgID", args.orgID)
                )
                .order("desc")
                .collect()

            const favoritedBoard = favBoard.map((boardItem) => boardItem.boardID)

            const boards = await getAllOrThrow(ctx.db, favoritedBoard)

            return boards.map((boardItem) =>({
                ...boardItem,
                isFav: true
            }))
        }

        
        const title = args.search as string
        let getAllBoard= []

        if (title){
            getAllBoard = await ctx.db
                .query("boards")
                .withSearchIndex("search_title", (query) => query
                    .search("title", title)
                    .eq("orgID", args.orgID)
                )
                .collect()
        }
        else{
            getAllBoard = await ctx.db
                .query("boards")
                .withIndex("by_org", (q) => q.eq("orgID",args.orgID))
                .order("desc")
                .collect()
        }

        const favBoards = getAllBoard.map((boardItem) => {
            return ctx.db
            .query("userFav")
            .withIndex("by_user_board", (query) => query
                .eq("userID", userIdentity.subject)
                .eq("boardID", boardItem._id)
            )
            .unique()
            .then((fav) => {
                return{
                    ...boardItem,
                    isFav: !!fav
                }
            })
        })

        const favBoardBoolean = Promise.all(favBoards)

        return favBoardBoolean
    }
})


export const getByID = query({
    args:{ 
        id: v.id("boards")
    },
    handler: async(ctx, args) => {
        const board = await ctx.db.get(args.id)

        return board
    }
})


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

        const userID = userIdentity.subject

        const existFav = await ctx.db
            .query("userFav")
            .withIndex("by_user_board", (query) => query
                .eq("userID", userID)
                .eq("boardID", args.id)
            )
            .unique()

        if(existFav){
            await ctx.db.delete(existFav._id)
        }   

        await ctx.db.delete(args.id)
    }
})

export const update =  mutation({
    args: {
        id: v.id("boards"), 
        title: v.string()
    },

    handler: async (ctx, args) =>{
        const userIdentity = await ctx.auth.getUserIdentity()

        if(!userIdentity) throw new Error ("Not authenticated...!")

        const title = args.title.trim()

        if(!title) throw new Error("Title is required")

        if(title.length > 60) throw new Error("Title must have more than 60 characters")   

        const board = await ctx.db.patch(args.id,{
            title: args.title
        })
    }
})

export const unFav = mutation({
    args: {
        id: v.id("boards")
    },
    handler: async (ctx, args) =>{
        const userIdentity = await ctx.auth.getUserIdentity()

        if(!userIdentity) throw new Error ("Not authenticated...!")

        const board = await ctx.db.get(args.id)

        if(!board) throw new Error("Board not found")

        const IDUser = userIdentity.subject

        const existFav = await ctx.db
            .query("userFav")
            .withIndex("by_user_board", (query) => 
                query
                .eq("userID", IDUser)
                .eq( "boardID", board._id)
            )
            .unique()

        if (!existFav) throw new Error("Favorited board not found..")
        
        await ctx.db.delete(existFav._id)

        return board
    }
})

export const fav = mutation({
    args: {
        id: v.id("boards"), 
        orgID: v.string()
    },
    handler: async (ctx, args) =>{
        const userIdentity = await ctx.auth.getUserIdentity()

        if(!userIdentity) throw new Error ("Not authenticated...!")

        const board = await ctx.db.get(args.id)

        if(!board) throw new Error("Board not found")

        const IDUser = userIdentity.subject

        const existFav = await ctx.db
            .query("userFav")
            .withIndex("by_user_board", (query) => 
                query
                .eq("userID", IDUser)
                .eq( "boardID", board._id)
            )
            .unique()

        if (existFav) throw new Error("Board already favorited..")
        
        await ctx.db.insert("userFav", {
            userID: IDUser,
            boardID: board._id,
            orgID: args.orgID
        })

        return board
    }
})

