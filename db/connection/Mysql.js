import mysql from 'mysql2';
import config from '../config/mysql.config.js';

export default class Mysql {
    constructor() {
        this.connection = mysql.createConnection(config);
    
        this.connection.connect(err => {
            if (err) {
                console.error('No se pudo conectar a la base de datos:', err);
                return;
            }
            console.log('Conectado a la base de datos MySQL');
        });
    }
}