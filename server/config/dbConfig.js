require('dotenv').config({path: '../../.env'})


const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB,
    options: {
        trustServerCertificate: true
    }
};

exports.config = config;