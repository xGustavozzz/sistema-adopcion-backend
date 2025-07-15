const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mascotaRoutes = require('./routes/mascota.route');

const cuestionarioRoutes = require('./routes/cuestionario.route');
const preguntaRoutes = require('./routes/pregunta.route');
const opcionRespuestaRoutes = require('./routes/opcionrespuesta.route');
const tipoEmocionalRoutes = require('./routes/tipoemocional.route');
const resultadoUsuarioRoutes = require('./routes/resultadousuario.route');


const authRoutes = require('./routes/auth.route');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/mascotas', mascotaRoutes);

app.use('/api/cuestionarios', cuestionarioRoutes);
app.use('/api/preguntas', preguntaRoutes);
app.use('/api/opciones', opcionRespuestaRoutes);
app.use('/api/tiposemocionales', tipoEmocionalRoutes);
app.use('/api/resultados', resultadoUsuarioRoutes);

app.use('/api/auth', authRoutes);

module.exports = app;