const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mascotaRoutes = require('./routes/mascota.route');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/mascotas', mascotaRoutes);
module.exports = app;