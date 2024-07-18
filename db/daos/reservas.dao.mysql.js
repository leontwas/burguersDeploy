import { query } from 'express';
import Mysql from '../connection/Mysql.js';


export default class ReservasDaoMysql extends Mysql {
    constructor() {
        super();
        this.query = query;
        this.table = 'reservas';
        this.#createTable();
    }

    #createTable() {
        const query = `USE sql3718809,
            CREATE TABLE IF NOT EXISTS ${this.table} (
                reserva_id INT(11) AUTO_INCREMENT,
                cliente_id INT(11),
                mesa_id INT(11),
                fecha_reserva DATETIME,
                estado TINYINT(1),
                PRIMARY KEY (reserva_id),   
            )`;
        this.connection.query(query, (err, result) => {
            if (err) {
                console.error('Error al crear la tabla reservas:', err);
            } else {
                console.log('Tabla reservas creada con éxito!');
            }
        });
    }

    async getAllReservas() {
        const query = `SELECT * FROM ${this.table}`;
        const [results] = await this.connection.promise().query(query);
        return results;
    }

    async getReservasById(reserva_id) {
        const query = `SELECT * FROM ${this.table} WHERE reserva_id = ?`;
        const [results] = await this.connection.promise().query(query, [reserva_id]);
        return results;
    }

    async createReserva(reserva) {
        const { cliente_id, mesa_id, fecha_reserva, estado } = reserva;
        const query = `INSERT INTO ${this.table} (cliente_id, mesa_id, fecha_reserva, estado) VALUES (?, ?, ?, ?)`;
        const [result] = await this.connection.promise().query(query, [cliente_id, mesa_id, fecha_reserva, estado]);
        return result.affectedRows;
    }

    async updateReserva(reserva) {
        const { reserva_id, cliente_id, mesa_id, fecha_reserva, estado } = reserva;
        const query = `UPDATE ${this.table} SET cliente_id = ?, mesa_id = ?, fecha_reserva = ?, estado = ? WHERE reserva_id = ?`;
        const [result] = await this.connection.promise().query(query, [cliente_id, mesa_id, fecha_reserva, estado, reserva_id]);
        return result.affectedRows;
    }

    async deleteReserva(reserva_id) {
        const query = `DELETE FROM ${this.table} WHERE reserva_id = ?`;
        const [result] = await this.connection.promise().query(query, [reserva_id]);
        return result.affectedRows;
    }
}
