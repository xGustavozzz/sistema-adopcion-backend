const service = require('../services/respondedorCuestionario.service');

exports.responderCuestionario = async (req, res) => {
    try {
        const id_u = req.user.id; // Viene del token (middleware auth)
        const respuestas = req.body.respuestas;

        const resultado = await service.procesarRespuestas(respuestas, id_u);

        res.status(201).json({
            message: 'Resultado guardado con éxito.',
            resultado: resultado
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
