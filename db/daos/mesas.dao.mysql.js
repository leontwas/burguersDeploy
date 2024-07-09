import Mysql from '../connections/Mysql.js';

// Clases personalizadas para los errores
class DatabaseError extends Error {
    constructor(message, cause) {
        super(message);
        this.name = "DatabaseError";
        this.cause = cause;
    }
}

class InitializationError extends DatabaseError {
    constructor(cause) {
        super("Error initializing MySQL connection", cause);
        this.name = "InitializationError";
    }
}

class TableCreationError extends DatabaseError {
    constructor(cause) {
        super("Error creating table", cause);
        this.name = "TableCreationError";
    }
}

class QueryError extends DatabaseError {
    constructor(message, cause) {
        super(message, cause);
        this.name = "QueryError";
    }
}

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
            throw new InitializationError(error);
        }
    }

    async createTable() {
        if (!this.connection) {
            throw new InitializationError("Connection not initialized");
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
            throw new TableCreationError(error);
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
