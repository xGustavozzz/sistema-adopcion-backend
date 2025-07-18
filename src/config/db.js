const {Pool} = require('pg');
require('dotenv').config();
/*
ssl authentication
es requerida para conexion a la bd en la nube
para correr con la bdlocal no es necesaria

si registran la bd de la nube en el pgadmin
pueden usar la configuracion de la nube running a localhost
*/
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;