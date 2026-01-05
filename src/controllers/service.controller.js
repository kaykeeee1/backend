import { pool } from '../config/database.js';

export const createService = async (req, res) => {
  const { title, description, category, price } = req.body;

  try {
    await pool.query(
      'INSERT INTO services (title, description, category, price) VALUES (?, ?, ?, ?)',
      [title, description, category, price]
    );

    res.status(201).json({ message: 'Serviço criado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getServices = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
