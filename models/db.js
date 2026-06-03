require('dotenv').config();
const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        dialectOptions: process.env.DB_SSL === 'true'
            ? {
                ssl: {
                    rejectUnauthorized: false
                }
            }
            : {}
    }
);

async function ensureDatabaseExists() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl: process.env.DB_SSL === 'true'
            ? {
                rejectUnauthorized: false
            }
            : undefined,
    });

    try {
        await connection.query('CREATE DATABASE IF NOT EXISTS ??', [process.env.DB_NAME]);
    } finally {
        await connection.end();
    }
}

//Vamos exportar as variáveis
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    ensureDatabaseExists
}