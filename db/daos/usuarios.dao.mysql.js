import { query } from 'express';
import Mysql from '../connection/Mysql.js';

export default class UsuariosDaoMysql extends Mysql {

    constructor() {
        super();
        this.query = query;
        this.table = 'usuarios';
        this.#createTable();
    }
    
    #createTable() {
        const query = `USE sql3718809,
            CREATE TABLE IF NOT EXISTS ${this.table} (
                usuario_id INT(11) PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(50),
                pass VARCHAR(50))`;
        this.connection.query(query, (err, result) => {
            if (err) {
                console.error('Error al crear la tabla usuarios:', err);
            } else {
                console.log('Tabla usuarios creada con éxito!');
            }
        });
    }

    async getAllUsuarios() {
        const query = `SELECT * FROM ${this.table}`;
        try {
            const [results] = await this.connection.promise().query(query);
            return results;
        } catch (err) {
            console.error('Error al obtener todos los usuarios:', err);
            throw err;
        }
    }

    async getUsuariosById(usuario_id) {
        const query = `SELECT * FROM ${this.table} WHERE usuario_id = ?`;
        try {
            const [results] = await this.connection.promise().query(query, [usuario_id]);
            return results;
        } catch (err) {
            console.error(`Error al obtener el usuario con id ${usuario_id}:`, err);
            throw err;
        }
    }

    async getUsuarioByEmail(email) {
        const query = `SELECT * FROM ${this.table} WHERE email = ?`;
        try {
            const [result] = await this.connection.promise().query(query, [email]);
            return result;
        } catch (err) {
            console.error(`Error al obtener el usuario con email ${email}:`, err);
            throw err;
        }
    }   
    
    async createUsuarios(usuario) {     
        const { email, pass } = usuario;
        const query = `INSERT INTO ${this.table} (email, pass) VALUES (?, ?)`;
        try {
            const [result] = await this.connection.promise().query(query, [email, pass]);
            return result.affectedRows;
        } catch (err) {
            console.error('Error al crear el usuario:', err);
            throw err;
        }
    }

    async updateUsuarios(usuario) {
        const { usuario_id, email, pass } = usuario;
        const query = `UPDATE ${this.table} SET email = ?, pass = ? WHERE usuario_id = ?`;
        try {
            const [result] = await this.connection.promise().query(query, [email, pass, usuario_id]);
            return result.affectedRows;
        } catch (err) {
            console.error('Error al actualizar el usuario:', err);
            throw err;
        }
    }

    async deleteUsuario(usuario_id) {
        const query = `DELETE FROM ${this.table} WHERE usuario_id = ?`;
        try {
            const [result] = await this.connection.promise().query(query, [usuario_id]);
            return result.affectedRows;
        } catch (err) {
            console.error(`Error al eliminar el usuario con id ${usuario_id}:`, err);
            throw err;
        }
    }
}
