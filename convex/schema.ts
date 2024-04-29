import {v} from "convex/values"

import { defineSchema, defineTable } from "convex/server"

export default defineSchema({
    boards: defineTable({
                title: v.string(),
                orgID: v.string(),
                authorID: v.string(),
                authorName: v.string(),
                imageURL: v.string(),
            })  .index("by_org", ["orgID"])
                .searchIndex("search_title", {
                    searchField: "title",
                    filterFields: ["orgID"]
                }),

    userFav: defineTable({
                orgID: v.string(),
                userID: v.string(),
                boardID:v.id("boards")
            })  .index("by_board", ["boardID"])
                .index("by_user_org", ["userID", "orgID"])
                .index("by_user_board", [ "userID", "boardID"])
                .index("by_user_board_org", ["userID", "boardID", "orgID"])
})