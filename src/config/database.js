import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'kayke',
  password: 'Ma090506@', 
  database: 'sistema_servicos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
