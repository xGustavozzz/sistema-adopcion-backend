const model = require('../models/opcionrespuesta.models');

exports.getAllOpciones = async () => {
    return await model.findAll();
};

exports.getOpcionById = async (id) => {
    return await model.findById(id);
};

exports.createOpcion = async (data) => {
    return await model.insert(data);
};

exports.updateOpcion = async (id, fieldsToUpdate) => {
    return await model.update(id, fieldsToUpdate);
};

exports.deleteOpcion = async (id) => {
    return await model.remove(id);
};
