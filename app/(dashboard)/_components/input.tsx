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
    onChange,
}: InputProps) => {
    return ( 
        <div className="z-99">
             <input
                    id={id}
                    name={name}
                    value={value}
                    type={type}
                    disabled={disabled}
                    readOnly={readOnly}
                    placeholder={placeholder ? placeholder : "  "}
                    onChange={onChange}
                    className={cn(`
                        appearance-none
                        max-w-[calc(100%-50px)]
                        text-sm
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
                        top-[22px]
                        left-2
                        px-1
                        text-sm
                        origin-[0]
                        z-10
                        duration-150
                        transform`,
                        !readOnly 
                        && `
                            left-5
                            -translate-y-5
                            bg-white
                            pointer-events-none
                            peer-placeholder-shown:scale-100
                            peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75
                            peer-focus:-translate-y-5
                        `,
                        className  
                    )}>
                        { label }
                    </label>
        </div>
    );
}