import { pool } from '../config/database.js';



export const createService = async (req, res) => {
  const { title, description, category, price } = req.body;
  const userId = req.user.id; 

  try {
    const [result] = await pool.query(
      `INSERT INTO services 
       (title, description, category, price, user_id) 
       VALUES (?, ?, ?, ?, ?)`,
      [title, description, category, price, userId]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      description,
      category,
      price,
    });
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

export const updateService = async (req, res) => {
  const { id } = req.params;
  const { title, description, category = null, price = null } = req.body;

  try {
    await pool.query(
      'UPDATE services SET title = ?, description = ?, category = ?, price = ? WHERE id = ?',
      [title, description, category, price, id]
    );

    res.json({
      id: Number(id),
      title,
      description,
      category,
      price,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM services WHERE id = ?', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
