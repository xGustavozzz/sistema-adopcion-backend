const express = require('express');
const cors = require('cors');
require('dotenv').config();

const employeeRoutes = require('./routes/employee.route');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/employees', employeeRoutes);

module.exports = app;