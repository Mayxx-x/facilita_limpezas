'use client'
import { useQuery } from "react-query"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Visitacao } from './Visitacao'
import axios from "axios"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

//* Componente de Exibição em Lista dos clientes
export const GetClients = () => {

    //* Query Para obter o dataset de Clientes da API
    const { data, isLoading, error } = useQuery('clientes', async () => {
        const response = await axios.get('/api/clientes');
        if (response.status !== 200) {
            throw new Error('Erro ao carregar clientes');
        }
        return response.data;
    });

    //* Array de clientes selecionados
    const [selectedClientes, setSelectedClientes] = useState([])

    const handleCheckboxChange = (cliente, e) => {
        const updatedSelectedClientes = [...selectedClientes];

        if (e) {
            updatedSelectedClientes.push(cliente);
        } else {
            const index = updatedSelectedClientes.indexOf(cliente);
            updatedSelectedClientes.splice(index, 1);
        }

        setSelectedClientes(updatedSelectedClientes);
    };
    const handleRemoveClient = (cliente) => {
        const updatedSelectedClientes = selectedClientes.filter((selected) => selected.id !== cliente.id);
        setSelectedClientes(updatedSelectedClientes);
    };



    const [filterInputs, setFilterInputs] = useState({
        nome: '',
        email: ''
    })

    const filteredData = data?.data?.filter((cliente) => {
        const nome = filterInputs.nome.toLowerCase();
        const email = filterInputs.email.toLowerCase();

        // Check if both name and email match (or are empty)
        return (
            (cliente.nome.toLowerCase().includes(nome) || nome === "") &&
            (cliente.email.toLowerCase().includes(email) || email === "")
        );
    });

    // useEffect(() => {
    //     console.log('Cliente para Visitaçao: ', selectedClientes)
    // }, [selectedClientes])


    return (<>
        <p className="text-[10pt] text-slate-500 text-start"> Selecione os Clientes para planejar a rota: </p>

        <div className="flex justify-evenly w-full space-x-5 p-1 h-14">
            <Input onChange={(e) => setFilterInputs({ ...filterInputs, nome: e.target.value })} placeholder='filtrar por Nome' />
            <Input onChange={(e) => setFilterInputs({ ...filterInputs, email: e.target.value })} placeholder='filtrar por Email' />
        </div>

        <section className="flex flex-col space-y-10">

            <article className="text-black">
                {isLoading && <h2> Carregando... </h2>}

                <section className="flex flex-col max-h-[30rem] min-h-[20rem] overflow-y-scroll space-y-3 shadow-[inset_0_0_1rem_#0004] p-3 rounded-lg">
                    {filteredData?.map((cliente) => (
                        //* Container com Dados do Cliente
                        <div key={cliente.id} className="p-5 w-full flex justify-start space-x-5 border text-start border-slate-600 text-black rounded-lg">

                            {/* Checkbox para Visitação */}
                            <span className="grid justify-center items-center">
                                <Checkbox key={cliente.id} onCheckedChange={(e) => handleCheckboxChange(cliente, e)} />
                            </span>

                            <Separator orientation='vertical' />

                            <div className="flex flex-col space-y-1 self-start w-full">
                                <p className="text-lg"> Cliente: {cliente.nome} </p>
                                <p> {cliente.email} </p>
                                <Separator className='bg-black' />
                                <p> {cliente.rua}, {cliente.numero} </p>
                            </div>

                            {/* */}
                            <aside className="flex items-center">
                                <button className="aspect-square p-2 h-10 border border-black rounded-lg hover:bg-slate-300">
                                    <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"></path>
                                    </svg>
                                </button>
                            </aside>
                        </div>
                    ))}
                </section>
            </article>

            <article className="w-full min-h-[30rem] p-5 border border-black rounded-lg">
                <h2 className="text-2xl"> Rotas </h2>
                <p className="text-[10pt] text-slate-500 text-start"> Rota calculada por ordem de Proximidade: </p>

                <section className="flex flex-col space-y-5 justify-between">
                    {selectedClientes?.map((cliente, index) => (

                        //* Lista de Clientes adicionados a Rotas
                        //* Container de dados
                        <div className="flex items-center border border-black rounded-lg p-3">

                            <h1 className="justify-self-start"> {index} </h1>
                            <span className="text-center w-full">
                                <h2 className=""> {cliente.nome} </h2>
                                <h3> {cliente.rua} </h3>
                            </span>
                            <button onClick={() => handleRemoveClient(cliente)} className="px-3 py-2 rounded-lg text-white bg-red-600">
                                X
                            </button>
                        </div>
                    ))}

                    <footer className="flex self-end justify-between w-full h-14 border border-black rounded-lg">
                        <Dialog className='w-[50rem] aspect-video'>
                            <DialogTrigger>
                                <button
                                    className="bg-[#328a48] w-full text-white px-5 py-1 rounded-lg"
                                >
                                    Calcular Rota
                                </button>
                            </DialogTrigger>
                            {/* Mapa com Rotas */}
                            <Visitacao clientes={selectedClientes} />

                        </Dialog>
                    </footer>
                </section>
            </article>
        </section>
    </>)
}