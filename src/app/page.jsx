'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { QueryClientProvider, QueryClient } from "react-query";
import { GetClients } from "@/components/GetClients";
import { ClienteCadastro } from "../components/ClienteCadastro";



export default function Home() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>

      <main className="flex justify-center pt-40 min-h-screen text-[#303030]">
        <section className="flex flex-col space-y-10 w-1/3">
          <header className="w-full text-5xl font-light text-center">
            Facilita Limpezas
          </header>

          <article className="border border-black max-h-[auto] rounded-lg p-10">
            <Accordion type="single" collapsible className="text-center">

              <AccordionItem value="item-1">
                <AccordionTrigger className='text-center text-lg'> Cadastrar Cliente </AccordionTrigger>
                <AccordionContent>

                  <ClienteCadastro />

                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </article>

          <article className="border border-black  rounded-lg p-10">
            <Accordion type="single" collapsible className="text-center">

              <AccordionItem value="item-2">
                <AccordionTrigger className='text-center text-lg'> Listar Clientes </AccordionTrigger>
                <AccordionContent>

                  <GetClients />

                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </article>

        </section>

      </main>
    </QueryClientProvider>
  );
}
