import Mysql from "../connection/Mysql.js";

export default class MesasDaoMysql extends Mysqlql  {
    constructor() {
        super();
        this.table = 'mesas';
        this.initialize();
    }

    async initialize() {
        try {
            const mysqlInstance = await Mysql.getInstance(); 
            await this.createTable();
        } catch (error) {
            console.error('Error initializing MySQL connection:', error);
            throw error;
        }
    }

    async createTable() {
        if (!this.connection || !this.connection.promise) {
            throw new Error('MySQL connection or promise method undefined');
        }

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
        if (!this.connection) {
            throw new InitializationError("Connection not initialized");
        }

        const query = `SELECT * FROM ${this.table}`;
        try {
            const [results] = await this.connection.promise().query(query);
            return results;
        } catch (error) {
            throw new QueryError('Problemas al obtener las mesas', error);
        }
    }

    async getMesaById(mesa_id) {
        if (!this.connection) {
            throw new InitializationError("Connection not initialized");
        }

        const query = `SELECT * FROM ${this.table} WHERE mesa_id = ?`;
        try {
            const [results] = await this.connection.promise().query(query, [mesa_id]);
            return results[0];
        } catch (error) {
            throw new QueryError('Problemas al obtener la mesa', error);
        }
    }

    async createMesa(mesa) {
        if (!this.connection) {
            throw new InitializationError("Connection not initialized");
        }

        const { numero, capacidad, estado } = mesa;
        const query = `INSERT INTO ${this.table} (numero, capacidad, estado) VALUES (?, ?, ?)`;
        try {
            const [result] = await this.connection.promise().query(query, [numero, capacidad, estado]);
            return result.insertId;
        } catch (error) {
            throw new QueryError('Problemas al crear la mesa', error);
        }
    }

    async updateMesa(mesa) {
        if (!this.connection) {
            throw new InitializationError("Connection not initialized");
        }

        const { mesa_id, numero, capacidad, estado } = mesa;
        const query = `UPDATE ${this.table} SET numero = ?, capacidad = ?, estado = ? WHERE mesa_id = ?`;
        try {
            const [result] = await this.connection.promise().query(query, [numero, capacidad, estado, mesa_id]);
            return result.affectedRows;
        } catch (error) {
            throw new QueryError('Problemas al actualizar la mesa', error);
        }
    }

    async deleteMesa(mesa_id) {
        if (!this.connection) {
            throw new InitializationError("Connection not initialized");
        }

        const query = `DELETE FROM ${this.table} WHERE mesa_id = ?`;
        try {
            const [result] = await this.connection.promise().query(query, [mesa_id]);
            return result.affectedRows;
        } catch (error) {
            throw new QueryError('Problemas al eliminar la mesa', error);
        }
    }
}
