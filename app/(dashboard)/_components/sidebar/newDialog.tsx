'use client'

import { Info } from "@/components/info";
import { Dialog } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";

type Props = {
 
}
export const NewDialog = ({}: Props) => {
    return ( 
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className="
                        aspect-square
                    "
                >
                    <Info
                        label="Create new organization"
                        side="right"
                        align="start"
                        sideOffset={18}
                    >
                        <button
                            className="
                                w-full
                                h-full
                                flex
                                justify-center
                                items-center
                                opacity-60
                                rounded-md
                                transition
                                hover:opacity-100
                                bg-white/25
                            "
                        >
                            <Plus
                                className="
                                    text-white
                                "
                                width={36}
                                height={36}
                            />
                        </button>

                    </Info>
                </div>
            </DialogTrigger>
            <DialogContent
                className="
                    max-w-[480px]
                    p-0
                    border-none
                    bg-transparent
                "
            >
                <CreateOrganization/>
            </DialogContent>
        </Dialog>
    );
}