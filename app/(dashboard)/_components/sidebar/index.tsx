import { SidebarList } from "./sidebarList";
import { NewDialog } from "./newDialog";

type Props = {
 
}
export const Sidebar = ({}: Props) => {
    return ( 
        <aside
            className="
                fixed
                w-[60px]
                h-full
                flex
                flex-col
                gap-y-4
                left-0
                p-3
                z-[1]
                bg-blue-950
                text-white
            "
        >
            <SidebarList/>
            <NewDialog/>
        </aside>
    );
}