const express = require('express');
const cors = require('cors');
require('dotenv').config();

const cuestionarioRoutes = require('./routes/cuestionario.route');
const preguntaRoutes = require('./routes/pregunta.route');
const opcionRespuestaRoutes = require('./routes/opcionrespuesta.route');
const tipoEmocionalRoutes = require('./routes/tipoemocional.route');
const resultadoUsuarioRoutes = require('./routes/resultadousuario.route');

const mascotaRoutes = require('./routes/mascota.route');
const userRoutes  = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const authenticate  = require('./middleware/auth');
const mascotaImagenRoutes = require('./routes/mascotaImagen.route');

const respondedorCuestionarioRoutes = require('./routes/respondedorCuestionario.route');

const listEndpoints = require('express-list-endpoints');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/cuestionario', respondedorCuestionarioRoutes);
app.use('/api/cuestionarios', cuestionarioRoutes);
app.use('/api/preguntas', preguntaRoutes);
app.use('/api/opciones', opcionRespuestaRoutes);
app.use('/api/tiposemocionales', tipoEmocionalRoutes);
app.use('/api/resultados', resultadoUsuarioRoutes);

// Mascotas (req. token)
app.use('/api/mascotas', mascotaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use('/api/mascotas',mascotaImagenRoutes);

const listEndpoints = require('express-list-endpoints');
console.log(JSON.stringify(listEndpoints(app), null, 2));


module.exports = app;