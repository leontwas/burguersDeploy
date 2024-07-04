import mysql from 'mysql2';
import config from '../config/mysql.config.js';

export default class Mysql {
    constructor() {
        this.pool = mysql.createPool(config);
        this.tryConnection();
    }

    tryConnection() {
        this.pool.getConnection((err, connection) => {
            if (err) {
                console.error('No se pudo conectar a la DB:', err);
                throw err;
            } else {
                console.log('Conectado a la DB');
                connection.release();
            }
        });
    }
}