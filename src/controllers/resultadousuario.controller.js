const service = require('../services/resultadousuario.service');

exports.getAll = async (req, res) => {
    try {
        const data = await service.getAllResultados();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const resultado = await service.getResultadoById(id);
        if (!resultado) {
            return res.status(404).json({ message: 'Resultado no encontrado' });
        }
        res.json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getByUsuario = async (req, res) => {
    try {
        const id_usuario = parseInt(req.params.id_usuario, 10);
        const resultados = await service.getResultadosByUsuario(id_usuario);
        res.json(resultados);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const nuevo = await service.createResultado(req.body);
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const actualizado = await service.updateResultado(id, req.body);
        if (!actualizado) {
            return res.status(404).json({ message: 'Resultado no encontrado' });
        }
        res.json(actualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const eliminado = await service.deleteResultado(id);
        if (!eliminado) {
            return res.status(404).json({ message: 'Resultado no encontrado' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeByUsuario = async (req, res) => {
    try {
        const id_usuario = parseInt(req.params.id_usuario, 10);
        const eliminados = await service.deleteResultadosByUsuario(id_usuario);
        res.status(200).json({
            eliminados: eliminados.length,
            data: eliminados
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
