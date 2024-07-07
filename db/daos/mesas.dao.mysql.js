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

        const query = `CREATE TABLE IF NOT EXISTS mesas (
                mesa_id INT AUTO_INCREMENT PRIMARY KEY,
                numero INT NOT NULL,
                capacidad INT NOT NULL,
                disponible BOOLEAN DEFAULT TRUE
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
            const [results] = await this.mysql.query(`SELECT * FROM mesas`)
            return results
        } catch (err) {
            throw err
        }
    }

    async getMesasById(mesa_id) {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM mesas WHERE mesa_id = ?`, [mesa_id])
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async createMesa(numero, capacidad, disponible) {
        try {
            const mesa = { numero, capacidad, disponible };
            const [result] = await this.mysql.query(`INSERT INTO mesas SET ?`, mesa);
            return result.insertId; 
        } catch (err) {
            console.error('Error al crear la mesa:', err); 
            throw err; 
        }
    }
    
    async updateMesas(mesa_id, numero, capacidad, disponible) {
        try {
            const [result] = await this.query
            (`UPDATE mesas SET numero = ?, capacidad = ?,  disponible = ? WHERE mesa_id = ?`, [numero, capacidad, disponible, mesa_id])
            return result.affectedRows
        } catch (err) {
            throw err
        }
    }

    async deleteMesa(mesa_id) {
        try {
            const [result] = await this.mysql.query(`DELETE FROM mesas WHERE mesa_id = ?`, [mesa_id])
            return result.affectedRows
        } catch (err) {
            throw err
        }
    }
}

export default MesasDaoMysql