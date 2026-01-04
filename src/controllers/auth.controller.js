const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hash]
  );

  res.status(201).json({ message: 'Usuário criado' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await pool.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (rows.length === 0) {
    return res.status(401).json({ message: 'Usuário não encontrado' });
  }

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ message: 'Senha inválida' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.json({ token });
};
