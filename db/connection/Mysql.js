import mysql from 'mysql2';
import config from '../config/mysql.config.js';

class Mysql {
    constructor() {
        this.pool = mysql.createPool(config).promise();
        this.tryConnection();
    }

    tryConnection() {
        this.pool.getConnection((err, connection) => {
            if (err) {
                console.error('No se pudo conectar a la Base de Datos:', err);
                throw err;
            } else {
                console.log('Conectado a la Base de Datos MySQL');
                connection.release();
            }
        });
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Mysql();
        }
        return this.instance;
    }
}

export default Mysql;
