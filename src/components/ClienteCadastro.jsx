'use client'
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import axios from "axios"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
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
import { LocationConfirmModal } from "./mod/LocationConfirmModal"

export const ClienteCadastro = () => {
    const [cadData, setCadData] = useState({
        nome: '',
        email: '',
        telefone: '',
        cep: '',
        rua: '',
        numero: ''
    })
    const [isOpen, setIsOpen] = useState(false)

    const { data, isLoading, error } = useQuery('get_location', async () => {
        if (cadData.cep.length == 8) {
            const response = await axios.get(`https://viacep.com.br/ws/${cadData.cep}/json/`);
            if (response.status !== 200) {
                throw new Error('Erro ao carregar clientes');
            }

            return response.data;
        }
    })

    const handleSubmitCad = async () => {
        await axios.post('/api/novo_cliente/', cadData)

        toast("Novo Cadastro", {
            description: `Cliente ${cadData.nome} cadastrado`,
            action: {
                label: "OK!",
                onClick: () => console.log("Undo"),
            },
        })

    }

    const handleChange = (e, field) => {
        setCadData({
            ...cadData,
            [field]: e.target.value
        })
    }

    useEffect(() => {
        if (cadData.cep.length == 8) {
            console.log(data)
            setIsOpen(true)
        }
    }, [cadData.cep])

    const handleLocationConfirm = (e) => {
        setIsOpen(false)
    }


    return (<>
        {
            <AlertDialog open={isOpen}>
                {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
                <AlertDialogContent className='bg-[#0001] backdrop-blur text-white'>
                    <AlertDialogHeader>
                        <AlertDialogTitle> Confirmar Endereço do Cliente: </AlertDialogTitle>
                        <AlertDialogDescription>

                        </AlertDialogDescription>
                        <div>
                            <p className="text-white text-lg">
                                <span className="text-sm text-black">
                                    <label htmlFor="" className="text-white"> Endereço: </label>
                                    <Input onChange={(e) => handleChange(e, 'rua')} value={data?.logradouro} />
                                </span>
                                <span className="text-sm text-black">
                                    <label htmlFor="" className="text-white"> Numero: </label>
                                    <Input onChange={(e) => handleChange(e, 'numero')} />
                                </span>
                            </p>

                        </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsOpen(false)} className='text-black'> Cancelar </AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleLocationConfirm()}> Confirmar </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        }
        <div className="flex flex-col mx-auto space-y-5 justify-start w-11/12 min-h-[15rem] h-auto border border-slate-400 shadow p-5 rounded-lg">
            <fieldset className="text-start space-y-1">
                <Label> Nome: </Label>
                <Input onChange={(e) => handleChange(e, 'nome')} type='text' placeholder='Nome do cliente' />
            </fieldset>
            <fieldset className="text-start space-y-1">
                <Label> Email: </Label>
                <Input onChange={(e) => handleChange(e, 'email')} type='text' placeholder='Email do Cliente' />
            </fieldset>
            <fieldset className="text-start space-y-1">
                <Label> Telefone: </Label>
                <Input onChange={(e) => handleChange(e, 'telefone')} type='text' placeholder='Telefone' />
            </fieldset>
            <fieldset className="text-start space-y-1">
                <Label> CEP: </Label>
                <Input onChange={(e) => handleChange(e, 'cep')} type='text' placeholder='CEP' />
                {isLoading && (<p className="text-[10pt] text-slate-500"> Carregando Endereço... </p>)}
            </fieldset>
            <footer className="w-full">
                <button onClick={() => handleSubmitCad()}
                    className="w-full text-white p-3 rounded-lg bg-[#3bbb7b]">
                    Cadastrar
                </button>
            </footer>
        </div>
    </>)
}