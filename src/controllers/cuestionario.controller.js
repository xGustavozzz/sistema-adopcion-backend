const service = require('../services/cuestionario.service');

exports.getAll = async (req, res) => {
    try {
        const data = await service.getAllCuestionarios();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const cuestionario = await service.getCuestionarioById(id);
        if (!cuestionario) {
            return res.status(404).json({ message: 'Cuestionario no encontrado' });
        }
        res.json(cuestionario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const nuevo = await service.createCuestionario(req.body);
        if (!nuevo) {
            return res.status(400).json({ error: 'Datos inválidos' });
        }
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const actualizado = await service.updateCuestionario(id, req.body);
        if (!actualizado) {
            return res.status(404).json({ message: 'Cuestionario no encontrado' });
        }
        res.json(actualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const eliminado = await service.deleteCuestionario(id);
        if (!eliminado) {
            return res.status(404).json({ message: 'Cuestionario no encontrado' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
