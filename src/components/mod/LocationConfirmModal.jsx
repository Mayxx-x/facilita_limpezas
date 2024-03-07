'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const LocationConfirmModal = (isOpen, {data}) => {
    console.log('Dados no Modal: ', data)
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogTrigger>Open</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle> Confirmar Endereço do Cliente: </AlertDialogTitle>
                    <AlertDialogDescription>
                        Rua: {data?.logradouro}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel> Cancelar </AlertDialogCancel>
                    <AlertDialogAction> Confirmar </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}