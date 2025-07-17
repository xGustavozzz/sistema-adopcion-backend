const AuthModel = require('../models/auth.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  static async register({ nombre, email, password, rol = 'user' }) {
    if (!nombre || !email || !password) {
      const err = new Error('Nombre, email y contraseña son obligatorios'); err.status = 400; throw err;
    }
    const existing = await AuthModel.findByEmail(email);
    if (existing) { const err = new Error('Email ya registrado'); err.status = 409; throw err; }
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
    const password_hash = await bcrypt.hash(password, saltRounds);
    return await AuthModel.insert({ nombre, email, password_hash, rol });
  }

  static async login({ email, password }) {
    if (!email || !password) {
      const err = new Error('Email y contraseña son obligatorios'); err.status = 400; throw err;
    }
    const user = await AuthModel.findByEmail(email);
    if (!user) { const err = new Error('Credenciales inválidas'); err.status = 401; throw err; }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) { const err = new Error('Credenciales inválidas'); err.status = 401; throw err; }
    const token = jwt.sign(
      { id: user.id_usuario, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return token;
  }
}

module.exports = AuthService;