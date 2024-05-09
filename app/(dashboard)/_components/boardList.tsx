'use client'

import EmptyBoardListState from "./state/emptyBoardList"
import EmptyFavoriteState from "./state/emptyFavoriteState"
import EmptySearchState from "./state/emptySearchState"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { BoardCard } from "./card/boardCard"
import { NewBoard } from "./newBoard"
import { useState } from "react"

type BoardListProps = {
    orgID: string
    query:{
        search?: string
        fav?: string
    }
}
export const BoardList = ({orgID, query}: BoardListProps) => {
    const [editedData, setEditedData] = useState("")
    const data = useQuery(api.board.getAll, {
        orgID, 
        ...query
    })
    if(data === undefined){
        return(
            <div>
                <h2
                    className="
                        text-3xl
                    "
                >
                    {
                        query.fav 
                        ? "Favorite boards"
                        : "Team Boards"
                    }
                </h2>
                <div
                    className="
                        grid
                        grid-cols-1
                        gap-5
                        mt-8
                        pb-10
                        sm:grid-cols-2
                        md:grid-cols-4
                        lg:grid-cols-4
                        xl:grid-cols-5
                        2xl:grid-cols-6
                    "
                >
                    <NewBoard
                        orgID={orgID}
                        disabled
                    />
                    <BoardCard.Skeleton/>
                    <BoardCard.Skeleton/>
                    <BoardCard.Skeleton/>
                    <BoardCard.Skeleton/>
                    <BoardCard.Skeleton/>
                    {/* {
                        data?.map((item) => <BoardCard.Skeleton key={item._id}/>)
                    } */}
                </div>
            </div>
        )
    }

    if (query.search && !data?.length){
        return(
            <EmptySearchState query={query.search}/>
        )
    }

    if (query.fav && !data?.length){
        return(
            <EmptyFavoriteState/>
        )
    }

    if (!data?.length){
        return(
            <EmptyBoardListState/>
        )
    }

    return ( 
        <div>
            <h2
                className="
                    text-3xl
                "
            >
                {
                    query.fav 
                    ? "Favorite boards"
                    : "Team Boards"
                }
            </h2>
            <div
                className="
                    grid
                    grid-cols-1
                    gap-5
                    mt-8
                    pb-10
                    sm:grid-cols-2
                    md:grid-cols-4
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                "
            >
                {
                    !query.fav &&  
                    <NewBoard
                        orgID={orgID}
                        disabled={false}
                    />
                }
                {
                    data?.map((boardItem) =>(
                        <BoardCard
                            key={boardItem._id}
                            id={boardItem._id}
                            title={boardItem.title}
                            imageURL={boardItem.imageURL}
                            userID={boardItem.authorID}
                            userName={boardItem.authorName}
                            createdAt={boardItem._creationTime}
                            orgID={boardItem.orgID}
                            isFav={ boardItem.isFav }
                            editedData={editedData}
                            setEditedData={setEditedData}
                        />
                    ))
                }
            </div>
        </div>
    );
}