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