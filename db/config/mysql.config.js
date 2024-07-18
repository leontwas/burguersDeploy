import dotenv from 'dotenv';

dotenv.config();

const config = {
    host: HOST_DB,
    user: USER_DB,
    password: PASS_DB,
    database: DB,
    PORT: PORT_DB,
    connectTimeout: 10000  // Aumenta el tiempo de espera a 10 segundos
};

export default config;
