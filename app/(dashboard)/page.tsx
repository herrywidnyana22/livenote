'use client'

import { BoardList } from "./_components/boardList";
import { EmptyState } from "./_components/state/emptyState";
import { useOrganization } from "@clerk/nextjs";

interface DashboardProps{
    searchParams:{
        search?: string
        fav?: string
    }
}

const DashboardPage = ({searchParams}: DashboardProps) => {
    const { organization } = useOrganization()

    return (
        <div
            className="
                h-[calc(100%-80px)]
                flex-1
                p-6
            "
        >
            {/* {JSON.stringify(searchParams)} */}
            {
                !organization 
                ? (<EmptyState/>)
                : (
                   <BoardList
                        orgID={organization.id}
                        query={searchParams}
                   />
                )
            }
            
        </div>
    );
}
 
export default DashboardPage;