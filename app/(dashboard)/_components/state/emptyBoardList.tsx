import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useHookMutation } from "@/hooks/useMutation";
import { useOrganization } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EmptyBoardListState = () => {

    const {mutate, isPending} = useHookMutation(api.board.create)
    const {organization} = useOrganization()

    const router = useRouter()

    const createBoard = () =>{
        if (!organization) return

        mutate({
            orgID: organization.id,
            title: "Untitled",
        })
        .then((id) =>{
            toast.success("Board created, redirect to board...")
            router.push(`/board/${id}`)
        })
        .catch(() => toast.error("Failed to create board"))
    }

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
                src={"/online-translation.png"}
                alt="Empty"
                width={110}
                height={110}
            />
            <h2
                className="
                    mt-6
                    text-2xl
                    font-semibold
                "
            >
                Create your fisrt board!
            </h2>
            <p
                className="
                    mt-2
                    text-mute-foreground
                    text-sm
                "
            >
                Start by creating a board for your organization
            </p>
            <div className="mt-6">
                <Button 
                    size={"lg"}
                    disabled={isPending}
                    onClick={createBoard}
                >
                    { 
                        isPending 
                        ?   <>
                                <Loader2
                                    className="
                                        w-4
                                        h-4
                                        mr-2
                                        animate-spin
                                    "
                                />  Creating
                            </>
                        :   ('Create a board')
                    }
                    
                </Button>
            </div>
        </div>
    );
}
  
export default EmptyBoardListState;