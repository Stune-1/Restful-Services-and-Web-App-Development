import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/login',
  body('email').isEmail(),
  body('password').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      
      const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
      
      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const admin = result.rows[0];
      const isValidPassword = await bcrypt.compare(password, admin.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: admin.id }, process.env.JWT_SECRET!, { expiresIn: '24h' });

      res.json({ token, message: 'Login successful' });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
