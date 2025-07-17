// src/controllers/auth.controller.js
const pool = require('../config/db');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
  const { nombre, email, telefono, direccion, password, role } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Nombre, email y contraseña son obligatorios' });
  }
  try {
    const existing = await usuarioModel.findByEmail(email);
    if (existing) return res.status(409).json({ message: 'Email ya registrado' });

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
    const password_hash = await bcrypt.hash(password, saltRounds);
    const usuario = await usuarioModel.create({ nombre, email, telefono, direccion, password_hash, role: role || 'user' });

    res.status(201).json({ 
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      email: usuario.email,
      role: usuario.role,
      created_at: usuario.created_at
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
  }
  try {
    const usuario = await usuarioModel.findByEmail(email);
    if (!usuario) return res.status(401).json({ message: 'Credenciales inválidas' });

    const valid = await bcrypt.compare(password, usuario.password_hash);
    if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: usuario.id_usuario, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno al autenticar' });
  }
};
