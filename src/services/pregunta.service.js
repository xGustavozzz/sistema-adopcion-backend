const model = require('../models/pregunta.models');

exports.getAllPreguntas = async () => {
    return await model.findAll();
};

exports.getPreguntaById = async (id) => {
    return await model.findById(id);
};

exports.createPregunta = async (data) => {
    return await model.insert(data);
};

exports.updatePregunta = async (id, fieldsToUpdate) => {
    return await model.update(id, fieldsToUpdate);
};

exports.deletePregunta = async (id) => {
    return await model.remove(id);
};
