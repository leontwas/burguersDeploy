import Mysql from '../connection/Mysql.js';
import ClientesHelpers from '../helpers/clientes.helpers.js';

export default class ReservasDaoMysql extends Mysql {

    constructor() {
        super();
        this.table = 'clientes';
        this.helpers = new ClientesHelpers();
        this.initialize();
    }

    async initialize() {
        try {
            const mysqlInstance = await Mysql.getInstance();
            this.mysql = mysqlInstance.connection;
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

    async getAllReservas() {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM clientes`);
            console.log('Clientes obtenidos:', results); 
            return results;
        } catch (err) {
            console.log('Problemas al obtener los clientes:', err);
            return [];
        }
    }

    async getClienteById(cliente_id) {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM clientes WHERE cliente_id = ?`, [cliente_id]);
            console.log('Cliente obtenido por ID:', results); 
            return results[0];
        } catch (err) {
            console.log('Problemas al obtener el cliente:', err);
            return null;
        }
    }

    async addCliente(cliente) {
        try {
            const { cliente_id, nombre, apellido, direccion, telefono, email } = this.helpers.parseCliente(cliente);
            const query = `INSERT INTO clientes (cliente_id, nombre, apellido, direccion, telefono, email) VALUES (?, ?, ?, ?, ?, ?)`;
            const [result] = await this.mysql.query(query, [cliente_id, nombre, apellido, direccion, telefono, email]);
            
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
            const query = `UPDATE clientes SET nombre = ?, apellido = ?, direccion = ?, telefono = ?, email = ?  WHERE cliente_id = ?`;
            const [result] = await this.mysql.query(query, [nombre, apellido, direccion, telefono, email, cliente_id]);

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
            const [result] = await this.mysql.query(query, [cliente_id]);

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
}
