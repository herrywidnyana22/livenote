'use client'

import { useOrganizationList } from "@clerk/nextjs";
import { SidebarItem } from "./sidebarItem";

export const SidebarList = () => {
    const { userMemberships } = useOrganizationList({
        userMemberships:{
            infinite: true
        }
    })

    if(!userMemberships.data?.length) return null

    return ( 
        <ul 
            className="space-y-4"
        >
            {
                userMemberships.data?.map((member) =>(
                    <SidebarItem
                        key={member.organization.id}
                        id={member.organization.id}
                        name={member.organization.name}
                        imageURL={member.organization.imageUrl}
                    />
                ))
            }
        </ul>
    );
}