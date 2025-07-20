const jwt = require('jsonwebtoken');
const pool = require('./db');
require('dotenv').config();

async function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log('Decoded JWT payload:', verified);
    
    // Validar si el usuario aún existe
    const { rows } = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1', [verified.id_usuario]);

    if (rows.length === 0) {
      return res.status(403).json({ message: 'El usuario ya no existe.' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
  
}

module.exports = authenticateToken;