import Mysql from '../connections/Mysql.js';

export default class ClientesDaoMysql extends Mysql {

    constructor() {
        super();
        this.table = 'clientes';
        this.#createTable();
    }

    #createTable() {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table}(
            cliente_id INT PRIMARY KEY AUTO_INCREMENT,
            nombre VARCHAR(100) NOT NULL,
            apellido VARCHAR(100) NOT NULL,
            telefono VARCHAR(20) NOT NULL,
            email VARCHAR(100) NOT NULL
        )`;
        this.connection.query(query);
    }

    async getAllClientes() {
        try {
            const query = `SELECT * FROM ${this.table}`;
            const [result] = await this.connection.promise().query(query);
            return result;
        } catch (err) {
            console.log('Problemas al obtener los clientes:', err);
            return [];
        }
    }

    async getClienteById(id) {
        try {
            const query = `SELECT * FROM ${this.table} WHERE cliente_id = ?`;
            const [result] = await this.connection.promise().query(query, [id]);
            return result[0];
        } catch (err) {
            console.log('Problemas al obtener el cliente:', err);
            return null;
        }
    }

    async addCliente(cliente) {
        try {
            const { nombre, apellido, telefono, email } = cliente;
            const query = `INSERT INTO ${this.table} (nombre, apellido, telefono, email) VALUES (?, ?, ?, ?)`;
            const [result] = await this.connection.promise().query(query, [nombre, apellido, telefono, email]);
            return result;
        } catch (err) {
            console.log('Problemas al agregar el cliente:', err);
            return null;
        }
    }

    async updateCliente(cliente) {
        try {
            const { cliente_id, nombre, apellido, telefono, email } = cliente;
            const query = `UPDATE ${this.table} SET nombre = ?, apellido = ?, telefono = ?, email = ? WHERE cliente_id = ?`;
            const [result] = await this.connection.promise().query(query, [nombre, apellido, telefono, email, cliente_id]);
            return result;
        } catch (err) {
            console.log('Problemas al actualizar el cliente:', err);
            return null;
        }
    }

    async deleteCliente(id) {
        try {
            const query = `DELETE FROM ${this.table} WHERE cliente_id = ?`;
            const [result] = await this.connection.promise().query(query, [id]);
            return result;
        } catch (err) {
            console.log('Problemas al eliminar el cliente:', err);
            return null;
        }
    }

    async getClientesByNombre(nombre) {
        try {
            const query = `SELECT * FROM ${this.table} WHERE nombre LIKE ?`;
            const [result] = await this.connection.promise().query(query, [`%${nombre}%`]);
            return result;
        } catch (err) {
            console.log('Problemas al obtener los clientes por nombre:', err);
            return [];
        }
    }

    async getClientesByEmail(email) {
        try {
            const query = `SELECT * FROM ${this.table} WHERE email = ?`;
            const [result] = await this.connection.promise().query(query, [email]);
            return result;
        } catch (err) {
            console.log('Problemas al obtener los clientes por email:', err);
            return [];
        }
    }
}
