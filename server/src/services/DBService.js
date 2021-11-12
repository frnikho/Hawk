const mariadb = require('mariadb');

const getConnection = () =>
    mariadb.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
    }).getConnection();

module.exports = {getConnection};