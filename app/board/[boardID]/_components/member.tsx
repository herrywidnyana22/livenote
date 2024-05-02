import { Skeleton } from "@/components/ui/skeleton";

const Member = () => {
    return (
        <div
            className="
                absolute
                h-12
                flex
                items-center
                top-2
                right-2
                p-3
                rounded-md
                shadow-md
                bg-white
                transition
                duration-50
                hover:shadow-xl
            "
        >
            User list
        </div>
    );
}
 
export default Member

export const MemberSkeleton = () =>{
    return(
        <div
            className="
                absolute
                h-12
                flex
                items-center
                top-2
                right-2
                p-3
                rounded-md
                shadow-md
                bg-white
                transition
                duration-50
                w-24
            "
        />
    )
}