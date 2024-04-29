import { useMutation } from "convex/react"
import { useState } from "react"


export const useHookMutation = (func: any) =>{
    const [isPending, setIsPending] = useState(false)
    const apiMutation = useMutation(func)

    const mutate = async(payload: any) =>{
        setIsPending(true)
        return await apiMutation(payload)
        .finally(() => setIsPending(false))
        .then((result) => {
            return result
        })
        .catch((error) => {
            throw error
        })
    }

    return {
        mutate,
        isPending
    }
}