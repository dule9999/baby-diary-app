import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

export const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()')
    console.log('PostgreSQL connected! Current time:', res.rows[0].now)
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err)
  }
};
