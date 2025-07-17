const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

exports.register = async (req, res) => {
  const { nombre, email, telefono, direccion, password } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Nombre, email y contraseña son obligatorios' });
  }
  try {
    const existing = await userModel.findByEmail(email);
    if (existing) return res.status(409).json({ message: 'Email ya registrado' });

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
    const password_hash = await bcrypt.hash(password, saltRounds);
    const user = await userModel.create({ nombre, email, telefono, direccion, password_hash });

    res.status(201).json({ 
      id_usuario: user.id_usuario,
      nombre: user.nombre,
      email: user.email,
      role: user.role,
      created_at: user.created_at
    });
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).json({ message: 'Error interno al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
  }
  try {
    const user = await userModel.findByEmail(email);
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: user.id_usuario, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (err) {
    console.error('Error al autenticar usuario:', err);
    res.status(500).json({ message: 'Error interno al autenticar' });
  }
};