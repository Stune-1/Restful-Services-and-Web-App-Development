import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const initDatabase = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        national_id VARCHAR(16) UNIQUE NOT NULL,
        telephone VARCHAR(15) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        department VARCHAR(100) NOT NULL,
        position VARCHAR(100) NOT NULL,
        laptop_manufacturer VARCHAR(50) NOT NULL,
        laptop_model VARCHAR(50) NOT NULL,
        laptop_serial VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database tables initialized');
  } finally {
    client.release();
  }
};
