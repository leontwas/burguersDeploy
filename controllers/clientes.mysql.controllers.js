
import Mysql from '../db/connection/Mysql.js';
import ClientesHelpers from '../helpers/clientes.helpers.js';

export default class ClientesDaoMysql {

    constructor() {
        this.mysql = null;
        this.table = 'clientes';
        this.helpers = new ClientesHelpers();
        this.initialize(); 
    }

    async initialize() {
        try {
            const mysqlInstance = Mysql.getInstance();
            this.mysql = mysqlInstance.pool;
            await this.#createTable();
        } catch (error) {
            console.error('Error initializing MySQL connection:', error);
            throw error;
        }
    }

    async #createTable() {
        try {
            const query = `CREATE TABLE IF NOT EXISTS clientes (
                cliente_id INT PRIMARY KEY AUTO_INCREMENT,
                nombre VARCHAR(100) NOT NULL,
                apellido VARCHAR(100) NOT NULL,
                direccion VARCHAR(100) NOT NULL,
                telefono VARCHAR(20) NOT NULL,
                email VARCHAR(100) NOT NULL
            )`;
            await this.mysql.query(query);
            console.log("Tabla creada o ya existente.");
        } catch (error) {
            console.error('Error creating table:', error);
            throw error;
        }
    }

    async getAllClientes() {
        try {
            const query = `SELECT * FROM clientes`;
            const [result] = await this.mysql.promise().query(query);
            return result;
        } catch (err) {
            console.log('Problemas al obtener los clientes:', err);
            return [];
        }
    }

    async getClienteById(id) {
        try {
            const query = `SELECT * FROM clientes WHERE cliente_id = ?`;
            const [result] = await this.mysql.promise().query(query, [id]);
            return result[0];
        } catch (err) {
            console.log('Problemas al obtener el cliente:', err);
            return null;
        }
    }

    async addCliente(cliente) {
        try {
            const { cliente_id, nombre, apellido, direccion, telefono, email } = this.helpers.parseCliente(cliente);
            const query = `INSERT INTO clientes (cliente_id, nombre, apellido, direccion, telefono, email) VALUES (?, ?, ?, ?, ?, ?)`;
            const [result] = await this.mysql.promise().query(query, [cliente_id, nombre, apellido, direccion, telefono, email]);
            
            if (result.insertId) {
                console.log('Cliente agregado con éxito!');
            } else {
                console.log('No se pudo agregar el cliente.');
            }

            return result.insertId;
        } catch (err) {
            console.log('Problemas al agregar el cliente:', err);
            return null;
        }
    }

    async updateCliente(cliente) {
        try {
            const { cliente_id, nombre, apellido, direccion, telefono, email } = this.helpers.parseCliente(cliente);
            const query = `UPDATE clientes SET nombre = ?, apellido = ?, direccion = ?, telefono = ?, email = ? WHERE cliente_id = ?`;
            const [result] = await this.mysql.promise().query(query, [nombre, apellido, direccion, telefono, email, cliente_id]);

            if (result.affectedRows > 0) {
                console.log('Cliente actualizado con éxito!'); 
            } else {
                console.log('No se encontró el cliente para actualizar.');
            }

            return result.affectedRows;
        } catch (err) {
            console.log('Problemas al actualizar al cliente:', err);
            return null;
        }
    }

    async deleteCliente(cliente_id) {
        try {
            const query = `DELETE FROM clientes WHERE cliente_id = ?`;
            const [result] = await this.mysql.promise().query(query, [cliente_id]);

            if (result.affectedRows > 0) {
                console.log('Cliente eliminado con éxito!');
            } else {
                console.log('No se encontró el cliente para eliminar.');
            }

            return result.affectedRows;
        } catch (err) {
            console.log('Problemas al eliminar al cliente:', err);
            return null;
        }
    }

    async getClientesByApellido(apellido) {
        try {
            const query = `SELECT * FROM clientes WHERE apellido LIKE ?`;
            const [result] = await this.mysql.promise().query(query, [`%${apellido}%`]);

            if (result.length > 0) {
                console.log('Clientes encontrados:', result);
            } else {
                console.log('No se encontraron clientes con ese apellido.');
            }

            return result;
        } catch (err) {
            console.log('Problemas al obtener los clientes por apellido:', err);
            return [];
        }
    }

    async getClientesByEmail(email) {
        try {
            const query = `SELECT * FROM clientes WHERE email = ?`;
            const [result] = await this.mysql.promise().query(query, [email]);

            if (result.length > 0) {
                console.log('Clientes encontrados:', result);
            } else {
                console.log('No se encontraron clientes con ese email.');
            }

            return result;
        } catch (err) {
            console.log('Problemas al obtener los clientes por email:', err);
            return [];
        }
    }
}
