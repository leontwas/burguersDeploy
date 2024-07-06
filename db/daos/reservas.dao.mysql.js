import Mysql from '../mysql.js'

class ReservasDaoMysql {
    constructor() {
        this.initialize()
    }

    async initialize() {
        const mysqlInstance = await Mysql.getInstance()
        this.mysql = mysqlInstance.connection
        this.table = 'reservas'
        await this.#createTable()
    }

    async #createTable() {
        try {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table}  (
        reserva_id INT PRIMARY KEY AUTO_INCREMENT,
        cliente_id INT NOT NULL,
        mesa_id INT NOT NULL,
        fecha_reserva DATETIME NOT NULL,
        estado VARCHAR(50) NOT NULL,
        FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id),
        FOREIGN KEY (mesa_id) REFERENCES Mesas(mesa_id)
    )`
            await this.mysql.query(query)
            console.log("Tabla creada o ya existente.")
        } catch (error) {
            console.error('Error creating table:', error)
            throw error
        }
    }

    async getAllReservas() {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table}`)
            return results
        } catch (err) {
            throw err
        }
    }

    async getReservaById(reserva_id) {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table} WHERE id = ?`, [reserva_id])
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async createReserva(cliente_id, mesa_id, fecha_reserva, estado) {
        try {
            const reserva = { cliente_id, mesa_id, fecha_reserva, estado };
            const [result] = await this.mysql.query(`INSERT INTO ${this.table} SET ?`, reserva);
            return result.insertId;
        } catch (err) {
            throw err;
        }
    }
    

    async updateReserva(reserva_id, cliente_id, mesa_id, fecha_reserva, estado) {
        try {
            const query = `
                UPDATE ${this.table} 
                SET cliente_id = ?, mesa_id = ?, fecha_reserva = ?, estado = ?
                WHERE reserva_id = ?
            `;
            const [result] = await this.mysql.query(query, [cliente_id, mesa_id, fecha_reserva, estado, reserva_id]);
            return result.affectedRows;
        } catch (err) {
            throw err;
        }
    }
    

    async deleteReserva(reserva_id) {
        try {
            const [result] = await this.mysql.query(`DELETE FROM ${this.table} WHERE reserva_id = ?`, [reserva_id])
            return result.affectedRows
        } catch (err) {
            throw err
        }
    }
}

export default ReservasDaoMysql