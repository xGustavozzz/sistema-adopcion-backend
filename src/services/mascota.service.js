const model =  require('../models/mascota.models');

exports.getAllMascotas = async () => {
    return await model.findAll();
};

exports.getMascotaById = async (id) => {
    return await model.findById(id);
};

exports.createMascota = async (mascotaData) => {
    return await model.insert(mascotaData);
};

exports.updateMascota = async (id, fieldsToUpdate) => {
    return await model.update(id, fieldsToUpdate);
};

exports.deleteMascota = async (id) => {
    return await model.remove(id);
};