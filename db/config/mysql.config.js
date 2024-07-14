import dotenv from 'dotenv';

dotenv.config();

const config = {
    host: 'sql3.freesqldatabase.com',
    user: 'sql3718809',
    password: '1PtpLX6Yiz',
    database:'sql3718809',
    port: 3306,
    connectTimeout: 10000  // Aumenta el tiempo de espera a 10 segundos
};

export default config;
