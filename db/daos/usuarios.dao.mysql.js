import { query } from 'express'
import Mysql from '../connection/Mysql.js'

export default class UsuariosDaoMysql extends Mysql {

    constructor() {
        super();
        this.query = query
        this.table = 'usuarios';
        this.#createTable()
    }
        
        #createTable() {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
            usuario_id INT(11) PRIMARY KEY,
            email VARCHAR(50),
            pass VARCHAR(50)
        )`
        this.connection.query(query)
    }

    async getAllUsuarios() {
        const query = `SELECT * FROM ${this.table}`
        const [results] = await this.connection.promise().query(query);
        return results      
    }

    async getUsuariosById(usuario_id) {
        const query = `SELECT * FROM ${this.table} WHERE ${usuario_id}`;
        const [results] = await this.connection.promise().query(query);
        return results
    }

    async getUsuarioByEmail(email) {
         const query = `SELECT * FROM ${this.table} WHERE '${email}'`;
         const [result] = await this.connection.promise().query(query)
         return result
}   
    
    async createUsuarios(usuario) {     
      const { usuario_id, email, pass} = usuario 
      const query = `INSERT INTO ${this.table} VALUES(?,?,?)`
      const [result] = this.connection.promise().query(query, [usuario_id, email, pass])
      return result.affectedRows 
    }

    async updateUsuarios(usuario) {
        const { usuario_id, email, pass } = usuario;
        const query = `UPDATE ${this.table} SET email = ?, pass = ? WHERE usuario_id = ?`;
        const [result] = await this.connection.promise().query(query, [email, pass, usuario_id]);
        return result.affectedRows
    }

    async deleteUsuario(usuario_id) {
        const query = `DELETE FROM ${this.table} WHERE usuario_id = ?`;
        const [result] = await this.connection.promise().query(query, [usuario_id]);
        return result.affectedRows;      
    }
}
