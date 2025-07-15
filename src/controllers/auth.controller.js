// src/controllers/auth.controller.js
const pool = require('../config/db');
const jwt  = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email requerido' });
  }
  try {
    // Busca al usuario por email
    const result = await pool.query(
      'SELECT id_usuario, nombre, email FROM usuario WHERE email = $1',
      [email]
    );
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    // Genera el JWT (payload mínimo con id y email)
    const token = jwt.sign(
      { id: user.id_usuario, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
};
