import bcrypt from 'bcryptjs';
import { pool } from '../src/config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    const email = 'admin@rtb.gov.rw';
    const password = 'admin123';
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await pool.query(
      'INSERT INTO admins (email, password) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING',
      [email, hashedPassword]
    );
    
    console.log('Admin user created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
