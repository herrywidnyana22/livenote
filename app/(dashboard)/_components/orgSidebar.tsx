'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import { font } from "./font";

export const OrgSidebar = () => {

    const searchParams = useSearchParams()
    const favorites = searchParams.get("fav")

    return ( 
        <div
            className="
                w-[210px]
                flex-col
                space-y-6
                pl-5
                pt-5
                lg:flex
                hidden
            "
        >
            <Link
                href={"/"}
            >
                <div
                    className="
                        flex
                        items-center
                        gap-x-2
                    "
                >
                    <Image
                        src={"/logo.svg"}
                        alt="logo"
                        width={36}
                        height={36}
                    />
                    <span
                        className={cn(`
                            text-2xl
                            font-semibold`,
                            font.className
                        )}
                    >
                        Board
                    </span>
                </div>
            </Link>
            <OrganizationSwitcher
                hidePersonal
                appearance={{
                    elements:{
                        rootBox:{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%"
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
            <div
                className="
                    w-full
                    space-y-1
                "
            >
                <Button
                    asChild
                    variant={favorites ? "ghost" : "secondary"}
                    size={"lg"}
                    className="
                        w-full
                        justify-start
                        px-2
                        font-normal
                    "   
                >
                    <Link href={"/"}>
                        <LayoutDashboard
                            className="
                                w-4
                                h-4
                                mr-2
                            "
                        />
                        Team
                    </Link>
                </Button>

                <Button
                    asChild
                    variant={favorites ? "secondary" : "ghost"}
                    size={"lg"}
                    className="
                        w-full
                        justify-start
                        px-2
                        font-normal
                    "   
                >
                    <Link href={{
                        pathname: "/",
                        query: {fav: true}
                    }}>
                        <Star
                            className="
                                w-4
                                h-4
                                mr-2
                            "
                        
                        />
                        Favorite
                    </Link>
                </Button>
            </div>
        </div>
    );
}