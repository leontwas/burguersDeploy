import mysql from 'mysql2/promise';
import config from '../config/mysql.config.js';

class Mysql {
    constructor() {
        this.pool = mysql.createPool(config);
    }

    async getConnection() {
        try {
            const connection = await this.pool.getConnection();
            return connection;
        } catch (err) {
            console.error('Error al obtener la conexión de la Base de Datos:', err);
            throw err;
        }
    }
}

export default Mysql;
