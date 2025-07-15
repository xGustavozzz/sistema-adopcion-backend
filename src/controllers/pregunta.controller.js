const service = require('../services/pregunta.service');

exports.getAll = async (req, res) => {
    try {
        const data = await service.getAllPreguntas();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const pregunta = await service.getPreguntaById(id);
        if (!pregunta) {
            return res.status(404).json({ message: 'Pregunta no encontrada' });
        }
        res.json(pregunta);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const nueva = await service.createPregunta(req.body);
        res.status(201).json(nueva);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const actualizada = await service.updatePregunta(id, req.body);
        if (!actualizada) {
            return res.status(404).json({ message: 'Pregunta no encontrada' });
        }
        res.json(actualizada);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const eliminada = await service.deletePregunta(id);
        if (!eliminada) {
            return res.status(404).json({ message: 'Pregunta no encontrada' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
