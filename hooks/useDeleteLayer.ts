import { useMutation, useSelf } from "@/liveblocks.config"

export const useDeleteLayer = () =>{
    
    const selected = useSelf((me) => me.presence.select)

    return useMutation(({ storage, setMyPresence}) => {
        const liveLayerData = storage.get("layers")
        const liveLayerIDData = storage.get("layerID")

        for (const selectedID of selected) {
            liveLayerData.delete(selectedID)

            const index = liveLayerIDData.indexOf(selectedID)

            if(index !== -1){
                liveLayerIDData.delete(index)
            }
        }

        setMyPresence(
            { select: [] },
            { addToHistory: true }
        )
    },[selected])
}