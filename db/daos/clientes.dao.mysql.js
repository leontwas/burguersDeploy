import { query } from 'express'
import Mysql from '../connection/Mysql.js';

export default class ClientesDaoMysql extends Mysql {
    
    constructor() {
        super();
        this.query = query
        this.table = 'clientes';
        this.#createTable()
    }

   #createTable() {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
        cliente_id INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100),
        apellido VARCHAR(100),
        direccion VARCHAR(100),
        telefono VARCHAR(20),
        email VARCHAR(100)
    )`;
          this.connection.query(query);
    }

    async getAllClientes() {
            const query = `SELECT * FROM ${this.table}`;
            const [result] = await this.connection.promise().query(query);
            return result;
    }

    async getClienteById(cliente_id) {
            const query = `SELECT * FROM ${this.table} WHERE cliente_id = ?`;
            const [result] = await this.mysql.promise().query(query, [cliente_id]);
            return result
    }

    async createCliente(cliente) {
            const { cliente_id, nombre, apellido, direccion, telefono, email } = cliente;
            const query = `INSERT INTO ${this.table} (cliente_id, nombre, apellido, direccion, telefono, email) VALUES (?, ?, ?, ?, ?, ?)`;
            const [result] = await this.connection.promise().query(query, [cliente_id, nombre, apellido, direccion, telefono, email]);
            return result.affectedRows 
          }

    async updateCliente(cliente) {
            const { cliente_id, nombre, apellido, direccion, telefono, email } = cliente;
            const query = `UPDATE  ${this.table} SET nombre = ?, apellido = ?, direccion = ?, telefono = ?, email = ? WHERE cliente_id = ?`;
            const [result] = await this.connection.promise().query(query, [nombre, apellido, direccion, telefono, email, cliente_id]);
            return result.affectedRows;
    }

    async deleteCliente(cliente_id) {
            const query = `DELETE FROM ${this.table} WHERE cliente_id = ?`;
            const [result] = await this.connection.promise().query(query, [cliente_id]);
            return result.affectedRows;
    }
}