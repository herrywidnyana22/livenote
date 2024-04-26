'use client'

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

import qs from "query-string"

export const SearchInput = () => {
    const [value, setValue] = useState("")
    const router = useRouter()

    const onChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setValue(e.target.value)
    }

    useEffect(() =>{
        const url = qs.stringifyUrl({
            url: "/",
            query:{
                search: value
            }
        }, { 
            skipEmptyString: true, 
            skipNull: true
        })

        router.push(url)
    },[value, router])

    return ( 
        <div
            className="
                relative
                w-full
            "
        >
            <Search
                className="
                    absolute
                    w-4
                    h-4
                    top-1/2
                    left-3
                    tansform
                    -translate-y-1/2
                    text-muted-foreground
                "
            />
            <Input
                value={value}
                onChange={onChange}
                placeholder="Search for board"
                className="
                    w-full
                    max-w-[515px]
                    pl-9
                "
            />
        </div>
    );
}