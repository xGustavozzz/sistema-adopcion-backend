const userModel = require('../models/user.model');

exports.getAll = async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await userModel.findById(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const allowed = ['nombre','email','telefono','direccion','password'];
    const fields = {};
    for (let key of allowed) if (req.body[key]) fields[key] = req.body[key];
    const updated = await userModel.update(id, fields);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = await userModel.remove(id);
    if (!deleted) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};