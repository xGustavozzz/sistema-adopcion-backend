const service = require('../services/tipoemocional.service');

exports.getAll = async (req, res) => {
    try {
        const data = await service.getAllTipos();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const tipo = await service.getTipoById(id);
        if (!tipo) {
            return res.status(404).json({ message: 'Tipo emocional no encontrado' });
        }
        res.json(tipo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const nuevo = await service.createTipo(req.body);
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const actualizado = await service.updateTipo(id, req.body);
        if (!actualizado) {
            return res.status(404).json({ message: 'Tipo emocional no encontrado' });
        }
        res.json(actualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const eliminado = await service.deleteTipo(id);
        if (!eliminado) {
            return res.status(404).json({ message: 'Tipo emocional no encontrado' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
