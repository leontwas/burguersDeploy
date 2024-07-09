import Mysql from '../connections/Mysql.js';

export default class MesasDaoMysql extends Mysql {
    constructor() {
        super();
        this.table = 'mesas';
        this.initialize();
    }

    async initialize() {
        try {
            const mysqlInstance = await Mysql.getInstance();
            this.connection = mysqlInstance.connection;
            await this.createTable();
        } catch (error) {
            console.error('Error initializing MySQL connection:', error);
            throw error;
        }
    }

    async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS mesas (
            mesa_id INT PRIMARY KEY AUTO_INCREMENT,
            numero INT NOT NULL,
            capacidad INT NOT NULL,
            estado VARCHAR(50) NOT NULL
        )`;
        try {
            await this.connection.promise().query(query);
            console.log("Tabla 'mesas' creada o ya existente.");
        } catch (error) {
            console.error('Error creating table:', error);
            throw error;
        }
    }

    async getAllMesas() {
        const query = `SELECT * FROM ${this.table}`;
        try {
            const [results] = await this.connection.promise().query(query);
            return results;
        } catch (err) {
            console.error('Problemas al obtener las mesas:', err);
            return [];
        }
    }

    async getMesaById(mesa_id) {
        const query = `SELECT * FROM ${this.table} WHERE mesa_id = ?`;
        try {
            const [results] = await this.connection.promise().query(query, [mesa_id]);
            return results[0];
        } catch (err) {
            console.error('Problemas al obtener la mesa:', err);
            return null;
        }
    }

    async createMesa(mesa) {
        const { numero, capacidad, estado } = mesa;
        const query = `INSERT INTO ${this.table} (numero, capacidad, estado) VALUES (?, ?, ?)`;
        try {
            const [result] = await this.connection.promise().query(query, [numero, capacidad, estado]);
            return result.insertId;
        } catch (err) {
            console.error('Problemas al crear la mesa:', err);
            return null;
        }
    }

    async updateMesa(mesa) {
        const { mesa_id, numero, capacidad, estado } = mesa;
        const query = `UPDATE ${this.table} SET numero = ?, capacidad = ?, estado = ? WHERE mesa_id = ?`;
        try {
            const [result] = await this.connection.promise().query(query, [numero, capacidad, estado, mesa_id]);
            return result.affectedRows;
        } catch (err) {
            console.error('Problemas al actualizar la mesa:', err);
            return null;
        }
    }

    async deleteMesa(mesa_id) {
        const query = `DELETE FROM ${this.table} WHERE mesa_id = ?`;
        try {
            const [result] = await this.connection.promise().query(query, [mesa_id]);
            return result.affectedRows;
        } catch (err) {
            console.error('Problemas al eliminar la mesa:', err);
            return null;
        }
    }
}
