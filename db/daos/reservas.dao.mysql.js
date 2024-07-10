import { query } from 'express'
import Mysql from '../connection/Mysql.js'


export default class ReservasDaoMysql extends Mysql {
    constructor() {
        super();
        this.query = query
        this.table = 'reservas';
        this.#createTable()
    }


   #createTable() {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
            reserva_id int(11) NOT NULL,
            cliente_id int(11) NOT NULL,
            mesa_id int(11) NOT NULL,
            fecha_reserva datetime NOT NULL,
            estado tinyint(1) NOT NULL
            FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id),
            FOREIGN KEY (mesa_id) REFERENCES Mesas(mesa_id))`;
         this.connection.query(query)
    }

    async getAllReservas() {
        const query = `SELECT * FROM ${this.table}`
        const [results] = await this.connection.promise().query(query);
        return results

    }

    async getReservasById(reserva_id) {
        const query = `SELECT * FROM ${this.table} WHERE ${reserva_id}`;
        const [results] = await this.connection.promise().query(query);
        return results
    }

    async createReserva(reserva) {
            const { cliente_id, mesa_id, fecha_reserva, estado } = reserva
            const query = `INSERT INTO ${this.table} VALUES (?, ?, ?, ?)`;
            const [result] = this.connection.promise().query(query, [cliente_id, mesa_id, fecha_reserva, estado]);
            return result.affectedRows
    }

    async updateReserva(reserva) {
            const { reserva_id, cliente_id, mesa_id, fecha_reserva, estado } = reserva;
            const query = `UPDATE ${this.reserva} SET cliente_id = ?, mesa_id = ?, fecha_reserva = ?, estado = ? WHERE reserva_id = ?`;
            const [result] = await this.connection.promise().query(query, [cliente_id, mesa_id, fecha_reserva, estado, reserva_id]);
            return result.affectedRows; 
    }

    async deleteReserva(reserva_id) {
            const query = `DELETE FROM ${this.table} WHERE reserva_id = ?`;
            const [result] = await this.connection.promise().query(query, [reserva_id]);
            return result.affectedRows;
    }
}

