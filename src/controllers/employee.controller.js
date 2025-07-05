const service = require('../services/employee.service');

exports.getAll = async (req, res) => {
    try {
        const data = await service.getAllEmployees();
        res.json(data);
    }catch (err){
        res.status(500).json({error : err.message});
    }
}

exports.getById = async (req, res) => {
    try {
        const data = await service.getEmployeeById(req.params.id);
        if (!data) {
            return res.status(404).json({error: 'Employee not found'});
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.create = async (req, res) => {
    try {
        const data = await service.createEmployee(req.body);
        if (!data) {
            return res.status(404).json({error: 'Employee incorrect'});
        }
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.update = async (req, res) => {
    try {
        const data = await service.updateEmployee(req.params.id, req.body);
        if (!data) {
            return res.status(404).json({error: 'Employee not found'});
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.delete = async (req, res) => {
    try {
        const data = await service.deleteEmployee(req.params.id);
        if (!data) {
            return res.status(404).json({error: 'Employee not found'});
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}