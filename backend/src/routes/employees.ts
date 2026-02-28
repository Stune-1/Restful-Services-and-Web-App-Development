import express from 'express';
import { pool } from '../config/database.js';
import { authMiddleware } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/',
  authMiddleware,
  body('firstName').trim().notEmpty(),
  body('lastName').trim().notEmpty(),
  body('nationalId').trim().notEmpty(),
  body('telephone').trim().notEmpty(),
  body('email').isEmail(),
  body('department').trim().notEmpty(),
  body('position').trim().notEmpty(),
  body('laptopManufacturer').trim().notEmpty(),
  body('laptopModel').trim().notEmpty(),
  body('laptopSerial').trim().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        firstName, lastName, nationalId, telephone, email,
        department, position, laptopManufacturer, laptopModel, laptopSerial
      } = req.body;

      const result = await pool.query(
        `INSERT INTO employees 
        (first_name, last_name, national_id, telephone, email, department, position, 
         laptop_manufacturer, laptop_model, laptop_serial)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`,
        [firstName, lastName, nationalId, telephone, email, department, position,
         laptopManufacturer, laptopModel, laptopSerial]
      );

      res.status(201).json({ data: result.rows[0], message: 'Employee created successfully' });
    } catch (error: any) {
      if (error.code === '23505') {
        return res.status(400).json({ message: 'Employee with this email, national ID, or laptop serial already exists' });
      }
      console.error('Create employee error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.get('/', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const countResult = await pool.query('SELECT COUNT(*) FROM employees');
    const total = parseInt(countResult.rows[0].count);

    const result = await pool.query(
      `SELECT id, first_name as "firstName", last_name as "lastName", 
              national_id as "nationalId", telephone, email, department, position,
              laptop_manufacturer as "laptopManufacturer", 
              laptop_model as "laptopModel", 
              laptop_serial as "laptopSerial"
       FROM employees 
       ORDER BY id DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.json({
      data: result.rows,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT id, first_name as "firstName", last_name as "lastName", 
              national_id as "nationalId", telephone, email, department, position,
              laptop_manufacturer as "laptopManufacturer", 
              laptop_model as "laptopModel", 
              laptop_serial as "laptopSerial"
       FROM employees WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ data: result.rows[0] });
  } catch (error) {
    console.error('Get employee error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id',
  authMiddleware,
  body('firstName').trim().notEmpty(),
  body('lastName').trim().notEmpty(),
  body('nationalId').trim().notEmpty(),
  body('telephone').trim().notEmpty(),
  body('email').isEmail(),
  body('department').trim().notEmpty(),
  body('position').trim().notEmpty(),
  body('laptopManufacturer').trim().notEmpty(),
  body('laptopModel').trim().notEmpty(),
  body('laptopSerial').trim().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const {
        firstName, lastName, nationalId, telephone, email,
        department, position, laptopManufacturer, laptopModel, laptopSerial
      } = req.body;

      const result = await pool.query(
        `UPDATE employees 
         SET first_name = $1, last_name = $2, national_id = $3, telephone = $4, 
             email = $5, department = $6, position = $7, 
             laptop_manufacturer = $8, laptop_model = $9, laptop_serial = $10
         WHERE id = $11
         RETURNING *`,
        [firstName, lastName, nationalId, telephone, email, department, position,
         laptopManufacturer, laptopModel, laptopSerial, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      res.json({ data: result.rows[0], message: 'Employee updated successfully' });
    } catch (error: any) {
      if (error.code === '23505') {
        return res.status(400).json({ message: 'Email, national ID, or laptop serial already exists' });
      }
      console.error('Update employee error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Delete employee error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
