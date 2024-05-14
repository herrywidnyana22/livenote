'use client'

import { 
    AlertDialog,
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger 
} from "./ui/alert-dialog"

type AlertModalProps = {
 children: React.ReactNode
 onOk: () => void
 title: string
 desc?: string
 disabled?: boolean
}
export const AlertModal = ({
    children,
    onOk,
    title,
    desc,
    disabled
}: AlertModalProps) => {
    return ( 
        <AlertDialog>
            <AlertDialogTrigger>
                { children }
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        { title }
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={disabled}
                        onClick={onOk}
                    >
                        Oke
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );  
}