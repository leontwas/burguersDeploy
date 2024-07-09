import Mysql from '../connections/Mysql.js';

export default class UsuariosDaoMysql extends Mysql {

    constructor() {
        super();
        this.table = 'usuarios';
        this.initialize();
    }

    async initialize() {
        try {
            await this.createTable();
        } catch (error) {
            console.error('Error creating table:', error);
            throw error;
        }
    }

    async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS usuarios (
            id INT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            apellido VARCHAR(100) NOT NULL,
            direccion VARCHAR(255),
            telefono VARCHAR(20),
            email VARCHAR(100)
        )`;
        try {
            await this.connection.promise().query(query);
            console.log("Tabla 'usuarios' creada o ya existente.");
        } catch (error) {
            console.error('Error creating table:', error);
            throw error;
        }
    }

    async getAllUsuarios() {
        const query = `SELECT * FROM ${this.table}`;
        try {
            const [results] = await this.connection.promise().query(query);
            return results;
        } catch (err) {
            console.error('Problemas al obtener los usuarios:', err);
            return [];
        }
    }

    async getUsuariosById(id) {
        const query = `SELECT * FROM ${this.table} WHERE id = ?`;
        try {
            const [results] = await this.connection.promise().query(query, [id]);
            return results[0];
        } catch (err) {
            console.error('Problemas al obtener el usuario:', err);
            return null;
        }
    }

    async getUsuariosByApellido(apellido) {
        const query = `SELECT * FROM ${this.table} WHERE apellido = ?`;
        try {
            const [results] = await this.connection.promise().query(query, [apellido]);
            return results;
        } catch (err) {
            console.error('Problemas al obtener los usuarios por apellido:', err);
            return [];
        }
    }

    async createUsuarios(usuario) {
        const { id, nombre, apellido, direccion, telefono, email } = usuario;
        const query = `INSERT INTO ${this.table} (id, nombre, apellido, direccion, telefono, email) VALUES (?, ?, ?, ?, ?, ?)`;
        try {
            const [result] = await this.connection.promise().query(query, [id, nombre, apellido, direccion, telefono, email]);
            return result.insertId;
        } catch (err) {
            console.error('Problemas al crear el usuario:', err);
            return null;
        }
    }

    async updateUsuarios(usuario) {
        const { id, nombre, apellido, direccion, telefono, email } = usuario;
        const query = `UPDATE ${this.table} SET nombre = ?, apellido = ?, direccion = ?, telefono = ?, email = ? WHERE id = ?`;
        try {
            const [result] = await this.connection.promise().query(query, [nombre, apellido, direccion, telefono, email, id]);
            return result.affectedRows;
        } catch (err) {
            console.error('Problemas al actualizar el usuario:', err);
            return null;
        }
    }

    async deleteUsuario(id) {
        const query = `DELETE FROM ${this.table} WHERE id = ?`;
        try {
            const [result] = await this.connection.promise().query(query, [id]);
            return result.affectedRows;
        } catch (err) {
            console.error('Problemas al eliminar el usuario:', err);
            return null;
        }
    }
}
