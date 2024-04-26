import { Info } from "@/components/info";
import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";

interface Props {   
    id: string
    name: string
    imageURL: string
}
export const SidebarItem = ({
    id,
    name,
    imageURL
}: Props) => {

    const { organization } = useOrganization()
    const { setActive } = useOrganizationList()

    const isActive = organization?.id === id

    const onClick = () =>{
        if(!setActive) return

        setActive({ organization: id })
    }

    return ( 
        <div
            className="
                relative
                aspect-square
            "
        >
            <Info
                label={name}
                side="right"
                align="start"
                sideOffset={18}
            >
                <Image
                    fill
                    src={imageURL}
                    alt={name}
                    onClick={onClick}
                    className={cn(`
                        rounded-md
                        cursor-pointer
                        opacity-75
                        hover:opacity-100`,
                        isActive && "opacity-100"
                    )}
                />
            </Info>
            
        </div>
    );
}