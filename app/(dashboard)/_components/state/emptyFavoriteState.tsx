import Image from "next/image";

const EmptyFavoriteState = () => {
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
                src={"/wishlist.png"}
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
                No favorites board!
            </h2>
            <p
                className="
                    mt-2
                    text-mute-foreground
                    text-sm
                "
            >
                Try favorite a board.
            </p>
        </div>
    );
}
 
export default EmptyFavoriteState;