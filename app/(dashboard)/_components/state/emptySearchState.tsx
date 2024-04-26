import Image from "next/image";

type EmptySearchProps ={
    query?: string
}

const EmptySearchState = ({query}: EmptySearchProps) => {
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
                src={"/page.png"}
                alt="Empty"
                width={140}
                height={140}
            />
            <h2
                className="
                    mt-6
                    text-2xl
                    font-semibold
                "
            >
                No result found!
            </h2>
            <p
                className="
                    mt-2
                    text-mute-foreground
                    text-sm
                "
            >
                {`"${query}" not found, Try searching for something else.`}
            </p>
        </div>
    );
}
 
export default EmptySearchState;