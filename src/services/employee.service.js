const model = require('../models/employee.models');

exports.getAllEmployees = async () => {
    return await model.findAll();
};

exports.getEmployeeById = async (id) => {
    return await model.findById(Number(id));
}

exports.createEmployee = async (employee) => {
    return await model.create(employee);
}

exports.updateEmployee = async (id, employee) => {
    return await model.update(id, employee);
}

exports.deleteEmployee = async (id) => {
    return await model.delete(Number(id));
}