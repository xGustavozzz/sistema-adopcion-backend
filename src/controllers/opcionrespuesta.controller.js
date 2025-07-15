const service = require('../services/opcionrespuesta.service');

exports.getAll = async (req, res) => {
    try {
        const data = await service.getAllOpciones();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const opcion = await service.getOpcionById(id);
        if (!opcion) {
            return res.status(404).json({ message: 'Opción no encontrada' });
        }
        res.json(opcion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const nueva = await service.createOpcion(req.body);
        res.status(201).json(nueva);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const actualizada = await service.updateOpcion(id, req.body);
        if (!actualizada) {
            return res.status(404).json({ message: 'Opción no encontrada' });
        }
        res.json(actualizada);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const eliminada = await service.deleteOpcion(id);
        if (!eliminada) {
            return res.status(404).json({ message: 'Opción no encontrada' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
