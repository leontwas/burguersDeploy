import mysql from 'mysql2/promise';
import config from '../config/mysql.config.js';

class Mysql {
    constructor() {
        this.pool = mysql.createPool(config);
    }

    async tryConnection() {
        try {
            const connection = await this.pool.getConnection();
            console.log('Conectado a la Base de Datos MySQL');
            connection.release();
        } catch (err) {
            console.error('No se pudo conectar a la Base de Datos:', err);
            throw err;
        }
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Mysql();
        }
        return this.instance;
    }
}

export default Mysql;

async function getReservas() {
    const db = Mysql.getInstance();
    try {
        const [rows] = await db.pool.query('SELECT * FROM reservas');
        return rows;
    } catch (err) {
        console.error('Error al obtener reservas:', err);
        throw err;
    }
}

(async () => {
    const db = Mysql.getInstance();
    await db.tryConnection();
})();
