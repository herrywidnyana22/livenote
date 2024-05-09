import { cn } from "@/lib/utils"

interface InputProps{
    id: string
    name?: string
    value?: string
    label?: string
    disabled?: boolean
    placeholder?: string
    type?: "text" | "password" | "number" | "hidden" | "radio" | "checkbox"
    readOnly?: boolean
    className?: string
    onChange?: (value:any) => void | void
}

export const Input = ({
    id,
    name,
    value,
    type,
    label,
    placeholder,
    disabled,
    readOnly,
    className, 
    onChange
}: InputProps) => {
    return ( 
        <>
             <input
                    id={id}
                    name={name}
                    // value={readOnly ? label : value}
                    type={type}
                    defaultValue={value}
                    disabled={disabled}
                    readOnly={readOnly}
                    placeholder={placeholder ? placeholder : "  "}
                    onChange={onChange}
                    className={cn(`
                        text-sm
                        w-full
                        truncate
                        peer
                        p-1
                        px-3
                        pt-2
                        font-light
                        rounded-md
                        border-2
                        outline-none
                        transition
                        bg-white
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        focus:text-sm`,
                        className,
                        disabled && "opacity-80 cursor-not-allowed",
                        readOnly 
                        ? "px-0 ring-0 shadow-none border-transparent bg-transparent"
                        : "shadow-sm",
                        
                    )}
                />
                {/* {   !readOnly &&( */}
                    <label className={cn(`
                        absolute
                        top-2
                        left-1
                        px-1
                        text-xs
                        origin-[0]
                        z-10
                        duration-150
                        transform`,
                        !readOnly 
                        && `
                            left-2
                            -translate-y-4
                            bg-white
                            pointer-events-none
                            peer-placeholder-shown:scale-100
                            peer-placeholder-shown:translate-y-0
                            peer-focus:scale-90
                            peer-focus:-translate-y-4
                        `,
                    )}>
                        { label }
                    </label>
        </>
    );
}