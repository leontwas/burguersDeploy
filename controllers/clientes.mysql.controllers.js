import Mysql from '../connections/Mysql.js';

export default class ClientesDaoMysql extends Mysql {

    constructor() {
        super();
        this.table = 'clientes';
        this.#createTable();
    }

    #createTable() {
        const query = `CREATE TABLE IF NOT EXISTS clientes(
            cliente_id INT PRIMARY KEY AUTO_INCREMENT,
            nombre VARCHAR(100) NOT NULL,
            apellido VARCHAR(100) NOT NULL,
            direccion VARCHAT(100) NOT NULL,
            telefono VARCHAR(20) NOT NULL,
            email VARCHAR(100) NOT NULL
        )`;
        this.connection.query(query);
    }

    async getAllClientes() {
        try {
            const query = `SELECT * FROM clientes`;
            const [result] = await this.connection.promise().query(query);
            return result;
        } catch (err) {
            console.log('Problemas al obtener los clientes:', err);
            return [];
        }
    }

    async getClienteById(id) {
        try {
            const query = `SELECT * FROM clientes WHERE cliente_id = ?`;
            const [result] = await this.connection.promise().query(query, [id]);
            return result[0];
        } catch (err) {
            console.log('Problemas al obtener el cliente:', err);
            return null;
        }
    }

    async addCliente(cliente) {
        try {
            const { nombre, apellido, direccion, telefono, email } = cliente;
            const query = `INSERT INTO clientes (nombre, apellido, direccion, telefono, email) VALUES (?, ?, ?, ?, ?)`;
            const [result] = await this.connection.promise().query(query, [nombre, apellido, direccion, telefono, email]);
    
            if (result.affectedRows > 0) {
                console.log('Cliente agregado con éxito!');
            } else {
                console.log('No se pudo agregar el cliente.');
            }
    
            return result;
        } catch (err) {
            console.log('Problemas al agregar el cliente:', err);
            throw new Error('Error agregando el cliente');
        }
    }
    

    async updateCliente(cliente) {
        try {
            const { cliente_id, nombre, apellido, direccion, telefono, email } = cliente;
            const query = `UPDATE clientes SET nombre = ?, apellido = ?, direccion = ?, telefono = ?, email = ? WHERE cliente_id = ?`;
            const [result] = await this.connection.promise().query(query, [nombre, apellido, direccion, telefono, email, cliente_id]);
    
            if (result.affectedRows > 0) {
                console.log('Cliente actualizado con éxito!');
            } else {
                console.log('No se encontró el cliente para actualizar.');
            }
    
            return result;
        } catch (err) {
            console.log('Problemas al actualizar el cliente:', err);
            throw new Error('Error actualizando el cliente');
        }
    }
    

    async deleteCliente(id) {
        try {
            const query = `DELETE FROM clientes WHERE cliente_id = ?`;
            const [result] = await this.connection.promise().query(query, [id]);
    
            if (result.affectedRows > 0) {
                console.log('Cliente eliminado con éxito!');
            } else {
                console.log('No se encontró el cliente para eliminar.');
            }
    
            return result;
        } catch (err) {
            console.log('Problemas al eliminar el cliente:', err);
            throw new Error('Error eliminando el cliente');
        }
    }
    
    async getClientesByApellido(apellido) {
        try {
            const query = `SELECT * FROM clientes WHERE apellido LIKE ?`;
            const [result] = await this.connection.promise().query(query, [`%${apellido}%`]);
    
            if (result.length > 0) {
                console.log('Clientes encontrados:', result);
            } else {
                console.log('No se encontraron clientes con ese apellido.');
            }
    
            const clientesEncontrados = result;  

            return clientesEncontrados;
        } catch (err) {
            console.log('Problemas al obtener los clientes por apellido:', err);
            return [];
        }
    }
    
    async getClientesByEmail(email) {
        try {
            const query = `SELECT * FROM clientes WHERE email = ?`;
            const [result] = await this.connection.promise().query(query, [email]);
    
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
