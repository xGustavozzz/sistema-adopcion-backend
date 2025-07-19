const model = require('../models/respondedorCuestionario.models');

// Servicio principal: recibe las respuestas y guarda el resultado emocional
exports.procesarRespuestas = async (respuestas, id_usuario) => {
    if (!respuestas || respuestas.length !== 5) {
        throw new Error('Debes responder las 5 preguntas.');
    }

    const contador = {}; // { id_emocional: cantidad }

    for (const { id_opcion, id_pregunta } of respuestas) {
        const resultado = await model.verificarOpcion(id_opcion, id_pregunta);
        if (!resultado) {
            throw new Error(`La opción ${id_opcion} no corresponde a la pregunta ${id_pregunta}.`);
        }

        const id_emocional = resultado.id_emocional;
        contador[id_emocional] = (contador[id_emocional] || 0) + 1;
    }

    const id_emocional_dominante = Object.entries(contador)
        .sort((a, b) => b[1] - a[1])[0][0];

    const compatibilidad = calcularCompatibilidad(respuestas, contador);


    await model.eliminarResultadoPorUsuario(id_usuario); //eliminar antes de insertar
    const resultadoFinal = await model.insertarResultado(
        id_usuario,
        id_emocional_dominante,
        compatibilidad
    );

    return resultadoFinal;
};

function calcularCompatibilidad(respuestas, contador) {
    const total = respuestas.length;

    const maxRepeticiones = Math.max(...Object.values(contador));
    const porcentaje = (maxRepeticiones / total) * 100;

    if (porcentaje >= 80) return 3;
    if (porcentaje >= 50) return 2;
    return 1;
}

exports.eliminarResultadoPorUsuario = async (id_usuario) => {
    await db.query(
        `DELETE FROM resultadousuario WHERE id_usuario = $1`,
        [id_usuario]
    );
};
