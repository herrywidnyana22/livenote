'use client'

import EmptyBoardListState from "./state/emptyBoardList"
import EmptyFavoriteState from "./state/emptyFavoriteState"
import EmptySearchState from "./state/emptySearchState"

type BoardListProps = {
    orgID: string
    query:{
        search?: string
        favorites?: string
    }
}
export const BoardList = ({orgID, query}: BoardListProps) => {
    const data = []
    if (query.search && !data?.length){
        return(
            <EmptySearchState query={query.search}/>
        )
    }

    if (query.favorites && !data?.length){
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
            {JSON.stringify(query)}
        </div>
    );
}