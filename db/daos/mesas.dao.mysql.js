import Mysql from '../mysql.js'

class MesasDaoMysql {
    constructor() {
        this.initialize()
    }

    async initialize() {
        const mysqlInstance = await Mysql.getInstance()
        this.mysql = mysqlInstance.connection
        this.table = 'mesas'
        await this.#createTable()
    }

    async #createTable() {
        try {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
        mesa_id INT PRIMARY KEY AUTO_INCREMENT,
        numero INT NOT NULL,
        capacidad INT NOT NULL
    )`
            await this.mysql.query(query)
            console.log("Tabla creada o ya existente.")
        } catch (error) {
            console.error('Error creating table:', error)
            throw error
        }
    }

    async getAllMesas() {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table}`)
            return results
        } catch (err) {
            throw err
        }
    }

    async getMesasById(mesa_id) {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table} WHERE mesa_id = ?`, [mesa_id])
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async createMesa(numero, capacidad) {
        try {
            const client = { numero, capacidad };
            const [result] = await this.mysql.query(`INSERT INTO ${this.table} SET ?`, mesa );
            return result.insertId;
        } catch (err) {
            throw err;
        }
    }

    async updateMesas(mesa_id, numero, capacidad) {
        try {
            const [result] = await this.query
            (`UPDATE ${this.table} SET numero = ?, capacidad = ? WHERE mesa_id = ?`, [numero, capacidad, mesa_id])
            return result.affectedRows
        } catch (err) {
            throw err
        }
    }

    async deleteMesa(mesa_id) {
        try {
            const [result] = await this.mysql.query(`DELETE FROM ${this.table} WHERE mesa_id = ?`, [mesa_id])
            return result.affectedRows
        } catch (err) {
            throw err
        }
    }
}

export default MesasDaoMysql