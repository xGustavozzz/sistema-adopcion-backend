const model = require('../models/cuestionario.models');

exports.getAllCuestionarios = async () => {
    return await model.findAll();
};

exports.getCuestionarioById = async (id) => {
    return await model.findById(id);
};

exports.createCuestionario = async (cuestionarioData) => {
    return await model.insert(cuestionarioData);
};

exports.updateCuestionario = async (id, fieldsToUpdate) => {
    return await model.update(id, fieldsToUpdate);
};

exports.deleteCuestionario = async (id) => {
    return await model.remove(id);
};
