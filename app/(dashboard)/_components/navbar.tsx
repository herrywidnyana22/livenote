'use client'

import InviteButton from "./inviteDialog";

import { OrganizationSwitcher, UserButton, useOrganization } from "@clerk/nextjs";

import { SearchInput } from "./search";


export const Navbar = () => {

    const org = useOrganization()
    
    return ( 
        <div
            className="
                flex
                items-center
                gap-x-4
                p-5
            "
        >
            <div
                className="
                    lg:flex
                    lg:flex-1
                    hidden
                "
            >
                <SearchInput/>
            </div>
            <div
                className="
                    block
                    flex-1
                    lg:hidden
                "
            >
                <OrganizationSwitcher
                    hidePersonal
                    appearance={{
                        elements:{
                            rootBox:{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                maxWidth: "375px"
                            },

                            organizationSwitcherTrigger:{
                                padding: "6px",
                                width: "100%",
                                borderRadius: "8px",
                                border: "1px solid #e5e7eb",
                                justifyContent: "space-between",
                                backgroundColor: "white"
                            }
                        }
                    }}
                />
            </div>
            {
                org && <InviteButton/>
            }
            <UserButton/>
        </div>
    );
}