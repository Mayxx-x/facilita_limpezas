import type { NextApiRequest, NextApiResponse } from 'next'
import { Pool } from 'pg'
import { QueryResult } from 'pg'

export const pool = new Pool({
    user: 'postgres.oujwmmmvrymgiizganxm',
    host: 'aws-0-sa-east-1.pooler.supabase.com',
    database: 'postgres',
    password: 'facilita_limpezas&$',
    port: 5432,
  })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const client = await pool.connect()
            const cad = req.body

            //* Uso de query evitando uso de ORM's
            const query = `INSERT INTO clientes (nome, email, telefone, rua, numero, cep) VALUES ('${cad.nome}', '${cad.email}', '${cad.telefone}','${cad.rua}','${cad.numero}','${cad.cep}')`
            
            const result: QueryResult = await client.query(query)


            res.status(200).json({ novo_cadastro: cad })
            
            client.release()
        } catch (error) {
            console.error(error)
        }
    } else {
        return res.status(415).json({ message: 'Requisição Inválida :(' })
    }
}