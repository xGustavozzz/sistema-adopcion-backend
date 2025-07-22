const model = require("../models/resultadousuario.models");

exports.obtenerMiTipoEmocional = async (id_usuario) => {
  const resultado = await model.findByUsuario(id_usuario);
  return resultado;
};

// Obtener historial emocional del usuario (auditoria)
exports.obtenerHistorialEmocional = async (id_usuario) => {
  return await model.obtenerHistorialEmocional(id_usuario);
};

exports.getAllResultados = async () => {
  return await model.findAll();
};

exports.getResultadoById = async (id) => {
  return await model.findById(id);
};

exports.getResultadosByUsuario = async (id_usuario) => {
  return await model.findByUsuario(id_usuario);
};

exports.createResultado = async (data) => {
  return await model.insert(data);
};

exports.updateResultado = async (id, fieldsToUpdate) => {
  return await model.update(id, fieldsToUpdate);
};

exports.deleteResultado = async (id) => {
  return await model.remove(id);
};

exports.deleteResultadosByUsuario = async (id_usuario) => {
  return await model.removeByUsuario(id_usuario);
};
