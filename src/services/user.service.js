const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');

class UserService {
  static async getAll() {
    return await UserModel.findAll();
  }

  static async getById(id) {
    const user = await UserModel.findById(id);
    if (!user) { const err = new Error('Usuario no encontrado'); err.status = 404; throw err; }
    return user;
  }

  static async create({ nombre, email, password, rol = 'user' }) {
    const existing = await UserModel.findByEmail(email);
    if (existing) throw { status: 409, message: 'Email ya registrado' };
    const salt = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
    const password_hash = await bcrypt.hash(password, salt);
    return await UserModel.insert({ nombre, email, password_hash, rol });
  }

  static async update(id, data) {
    if (data.password) {
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
      data.password_hash = await bcrypt.hash(data.password, saltRounds);
      delete data.password;
    }
    return await UserModel.update(id, data);
  }

  static async remove(id) {
    const deleted = await UserModel.remove(id);
    if (!deleted) { const err = new Error('Usuario no encontrado'); err.status = 404; throw err; }
    return deleted;
  }
}

module.exports = UserService;