import { query } from 'express'
import Mysql from '../connection/Mysql.js'

export default class MesasDaoMysql extends Mysql  {
    constructor() {
        super();
        this.query = query
        this.table = 'mesas';
        this.#createTable()
    }

   #createTable() {
         const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
            mesa_id INT(11) PRIMARY KEY AUTO_INCREMENT,
            numero INT(2),
            capacidad INT(2),
            estado TINYINT(1) DEFAULT 1)`;
        this.connection.query(query)
        console.log('Tabla mesas creada con éxito!')
            }

    async getAllMesas() {
        const query = `SELECT * FROM ${this.table}`
        const [results] = await this.connection.promise().query(query);
        return results      
    }

    async getMesaById(mesa_id) {
        const query = `SELECT * FROM ${this.table} WHERE ${mesa_id}`;
        const [results] = await this.connection.promise().query(query);
        return results
    }

    async createMesa(mesa) {
        const { mesa_id, numero, capacidad, estado } = mesa;
        const query = `INSERT INTO ${this.table} (mesa_id, numero, capacidad, estado) VALUES (?, ?, ?, ?)`;
        const [result] = this.connection.promise().query(query, [mesa_id, numero, capacidad, estado])
        return result.affectedRows 
    }

    async updateMesa(mesa) {
        const { mesa_id, numero, capacidad, estado } = mesa;
        const query = `UPDATE  ${this.table} SET numero = ?, capacidad = ?, estado = ? WHERE mesa_id = ?`;
        const [result] = await this.connection.promise().query(query, [numero, capacidad, estado, mesa_id]);
        return result.affectedRows;
       
    }

    async deleteMesa(mesa_id) {
        const query = `DELETE FROM ${this.table} WHERE mesa_id = ?`;
            const [result] = await this.connection.promise().query(query, [mesa_id]);
            return result.affectedRows;
    }
}
