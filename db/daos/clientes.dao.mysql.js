import { query } from 'express';
import Mysql from '../connection/Mysql.js';

export default class ClientesDaoMysql extends Mysql {
    constructor() {
        super();
        this.query = query;
        this.table = 'clientes';
        this.#createTable();
    }

    #createTable() {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
                cliente_id INT(11) PRIMARY KEY AUTO_INCREMENT,
                nombre VARCHAR(100),
                apellido VARCHAR(100),
                direccion VARCHAR(100),
                telefono VARCHAR(20),
                email VARCHAR(100))`;
        this.connection.query(query, (err, result) => {
            if (err) {
                console.error('Error al crear la tabla clientes:', err);
            } else {
                console.log('Tabla clientes creada con éxito!');
            }
        });
    }

    async getAllClientes() {
        const query = `SELECT * FROM ${this.table}`;
        try {
            const [result] = await this.connection.promise().query(query);
            return result;
        } catch (err) {
            console.error('Error al obtener todos los clientes:', err);
            throw err;
        }
    }

    async getClienteById(cliente_id) {
        const query = `SELECT * FROM ${this.table} WHERE cliente_id = ?`;
        try {
            const [result] = await this.connection.promise().query(query, [cliente_id]);
            return result;
        } catch (err) {
            console.error(`Error al obtener el cliente con id ${cliente_id}:`, err);
            throw err;
        }
    }

    async createCliente(cliente) {
        const { nombre, apellido, direccion, telefono, email } = cliente;
        const query = `INSERT INTO ${this.table} (nombre, apellido, direccion, telefono, email) VALUES (?, ?, ?, ?, ?)`;
        try {
            const [result] = await this.connection.promise().query(query, [nombre, apellido, direccion, telefono, email]);
            return result.affectedRows;
        } catch (err) {
            console.error('Error al crear el cliente:', err);
            throw err;
        }
    }

    async updateCliente(cliente) {
        const { cliente_id, nombre, apellido, direccion, telefono, email } = cliente;
        const query = `UPDATE ${this.table} SET nombre = ?, apellido = ?, direccion = ?, telefono = ?, email = ? WHERE cliente_id = ?`;
        try {
            const [result] = await this.connection.promise().query(query, [nombre, apellido, direccion, telefono, email, cliente_id]);
            return result.affectedRows;
        } catch (err) {
            console.error('Error al actualizar el cliente:', err);
            throw err;
        }
    }

    async deleteCliente(cliente_id) {
        const query = `DELETE FROM ${this.table} WHERE cliente_id = ?`;
        try {
            const [result] = await this.connection.promise().query(query, [cliente_id]);
            return result.affectedRows;
        } catch (err) {
            console.error('Error al eliminar el cliente:', err);
            throw err;
        }
    }
}
