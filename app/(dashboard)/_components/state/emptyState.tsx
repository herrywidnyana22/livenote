import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import Image from "next/image";

export const EmptyState = () => {
    return ( 
        <div
            className="
                h-full
                flex
                flex-col
                justify-center
                items-center
            "
        >
            <Image
                src={"/crayons.png"}
                alt="Empty"
                width={200}
                height={200}
            />
            <h2
                className="
                    mt-6
                    text-2xl
                    font-semibold
                "
            >
                Welcome to Board
            </h2>
            <p
                className="
                    mt-2
                    text-sm
                    text-muted-foreground
                "
            >
                Create an organization to get started
            </p>
            <div
                className="mt-6"
            >
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            Create an organization
                        </Button>
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
            </div>
        </div>
    );
}