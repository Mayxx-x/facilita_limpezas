//* Importando o pool client
import { QueryResult } from "pg";
import { Pool } from "pg";
import type { NextApiRequest, NextApiResponse } from 'next'

//* Dados de Conexão do Banco de Dados
const pool = new Pool({
  user: 'postgres.oujwmmmvrymgiizganxm',
  host: 'aws-0-sa-east-1.pooler.supabase.com',
  database: 'postgres',
  password: 'facilita_limpezas&$',
  port: 5432,
})

//* Query para selecionar os Clientes na tabela 'clientes'
export const ClientesQ = {
  select_all: `SELECT * FROM clientes`,
}

//* Request Handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await pool.connect();
    const query = ClientesQ.select_all; // Use the query string directly

    const result: QueryResult = await client.query(query); // Use await for promise resolution


    if (result.rows.length > 0) {
      res.status(200).json({ data: result.rows });
    } else {
      res.status(200).json({ message: "No data found" }); //* Mensagem Informativa
    }

    client.release(); //* Libera a Pool

  } catch (error) {
    console.error("Error obtaining client data:", error);
    res.status(500).json({ error: "Internal server error" });
  }

}