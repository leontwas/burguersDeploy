import dotenv from 'dotenv';

dotenv.config();

const config = {
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.DB_NAME,
    port: process.env.PORT_DB,
    connectTimeout: 10000  // Aumenta el tiempo de espera a 10 segundos
};

export default config;