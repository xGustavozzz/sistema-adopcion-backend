const model = require('../models/tipoemocional.models');

exports.getAllTipos = async () => {
    return await model.findAll();
};

exports.getTipoById = async (id) => {
    return await model.findById(id);
};

exports.createTipo = async (data) => {
    return await model.insert(data);
};

exports.updateTipo = async (id, fieldsToUpdate) => {
    return await model.update(id, fieldsToUpdate);
};

exports.deleteTipo = async (id) => {
    return await model.remove(id);
};
