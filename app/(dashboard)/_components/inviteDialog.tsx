import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const InviteDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    <Plus 
                        className="
                            w-4 
                            h-4 
                            mr-2
                        "
                    />
                    Invite Member
                </Button>
            </DialogTrigger>
            <DialogContent
                className="
                    max-w-[880px]
                    p-0
                    border-none
                    bg-transparent
                "
            >
                <OrganizationProfile/>
            </DialogContent>
        </Dialog>
    );
}
 
export default InviteDialog;