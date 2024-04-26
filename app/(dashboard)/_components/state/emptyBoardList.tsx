import { Button } from "@/components/ui/button";
import Image from "next/image";

const EmptyBoardListState = () => {
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
                <Button size={"lg"}>
                    Create a board
                </Button>
            </div>
        </div>
    );
}
 
export default EmptyBoardListState;