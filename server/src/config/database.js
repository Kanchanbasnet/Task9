const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: parseInt(process.env.dbport),
   // ssl: true
});

module.exports=pool;

