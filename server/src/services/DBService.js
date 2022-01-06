const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
    });

module.exports = {pool};