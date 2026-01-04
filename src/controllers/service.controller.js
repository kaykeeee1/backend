const pool = require('../config/database');

exports.create = async (req, res) => {
  const { title, description, category, price } = req.body;

  await pool.query(
    'INSERT INTO services (title, description, category, price, user_id) VALUES (?, ?, ?, ?, ?)',
    [title, description, category, price, req.userId]
  );

  res.status(201).json({ message: 'Serviço criado' });
};

exports.list = async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM services WHERE user_id = ?',
    [req.userId]
  );

  res.json(rows);
};
