const model = require('../models/resultadousuario.models');
const ResultadoModel = require('../models/resultadousuario.model');

exports.obtenerResultadoDeUsuario = async (id_usuario) => {
  const resultado = await ResultadoModel.findByUsuario(id_usuario);
  return resultado;
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
