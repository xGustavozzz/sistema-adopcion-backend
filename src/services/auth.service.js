/*const AuthModel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
  static async register({ nombre, email, telefono, direccion, password }) {
    if (!nombre || !email || !telefono || !direccion || !password) {
      const err = new Error(
        "Nombre, email, teléfono, dirección y contraseña son obligatorios"
      );
      err.status = 400;
      throw err;
    }
    const existing = await AuthModel.findByEmail(email);
    if (existing) {
      const err = new Error("Email ya registrado");
      err.status = 409;
      throw err;
    }
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
    const password_hash = await bcrypt.hash(password, saltRounds);
    return await AuthModel.insert({
      nombre,
      email,
      telefono,
      direccion,
      password_hash,
    });
  }

  static async login({ email, password }) {
    if (!email || !password) {
      const err = new Error("Email y contraseña son obligatorios");
      err.status = 400;
      throw err;
    }
    const user = await AuthModel.findByEmail(email);
    if (!user) {
      const err = new Error("Credenciales inválidas");
      err.status = 401;
      throw err;
    }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      const err = new Error("Credenciales inválidas");
      err.status = 401;
      throw err;
    }
    const token = jwt.sign(
      { id: user.id_usuario, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return token;
  }
}

module.exports = AuthService;*/

const AuthModel = require('../models/auth.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  static async register({ nombre, email, telefono, direccion, password }) {
    const exists = await AuthModel.findByEmail(email);
    if (exists) throw { status: 409, message: 'Email ya registrado' };

    const saltRounds   = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
    const password_hash = await bcrypt.hash(password, saltRounds);

    // NO enviamos role aquí: se usa el DEFAULT en la tabla (role = 'user')
    return AuthModel.insert({ nombre, email, telefono, direccion, password_hash });
  }

  static async login({ email, password }) {
    const user = await AuthModel.findByEmail(email);
    if (!user) throw { status: 401, message: 'Credenciales inválidas' };
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw { status: 401, message: 'Credenciales inválidas' };
    return jwt.sign(
      { id: user.id_usuario, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }
}
module.exports = AuthService;