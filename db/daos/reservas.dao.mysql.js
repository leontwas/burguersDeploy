import Mysql from '../connections/Mysql.js';
import ReservasHelpers from '../helpers/reservas.helpers.js';

export default class ReservasDaoMysql extends Mysql {

    constructor() {
        super();
        this.table = 'reservas';
        this.helpers = new ReservasHelpers();
        this.#createTable();
    }

    #createTable() {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table}(
            reserva_id INT PRIMARY KEY,
            cliente_id INT NOT NULL,
            mesa_id INT NOT NULL,
            fecha_reserva DATETIME NOT NULL,
            estado BOOLEAN NOT NULL
        )`;
        this.connection.query(query);
    }

    async getAllReservas() {
        try {
            const query = `SELECT * FROM ${this.table}`;
            const [result] = await this.connection.promise().query(query);
            return result;
        } catch (err) {
            console.log('Problemas al obtener las reservas:', err);
            return [];
        }
    }

    async getReservaById(id) {
        try {
            const query = `SELECT * FROM ${this.table} WHERE reserva_id = ?`;
            const [result] = await this.connection.promise().query(query, [id]);
            return result;
        } catch (err) {
            console.log('Problemas al obtener la reserva:', err);
            return null;
        }
    }

    async getReservasByClienteId(cliente_id) {
        try {
            const query = `SELECT * FROM ${this.table} WHERE cliente_id = ?`;
            const [result] = await this.connection.promise().query(query, [cliente_id]);
            return result;
        } catch (err) {
            console.log('Problemas al obtener las reservas del cliente:', err);
            return [];
        }
    }

    async getReservasByMesaId(mesa_id) {
        try {
            const query = `SELECT * FROM ${this.table} WHERE mesa_id = ?`;
            const [result] = await this.connection.promise().query(query, [mesa_id]);
            return result;
        } catch (err) {
            console.log('Problemas al obtener las reservas de la mesa:', err);
            return [];
        }
    }

    async addReserva(reserva) {
        try {
            const { reserva_id, cliente_id, mesa_id, fecha_reserva, estado } = this.helpers.parseReserva(reserva);
            const query = `INSERT INTO ${this.table} (reserva_id, cliente_id, mesa_id, fecha_reserva, estado) VALUES (?, ?, ?, ?, ?)`;
            const [result] = await this.connection.promise().query(query, [reserva_id, cliente_id, mesa_id, fecha_reserva, estado]);
            return result;
        } catch (err) {
            console.log('Problemas al agregar la reserva:', err);
            return null;
        }
    }

    async updateReserva(reserva) {
        try {
            const { reserva_id, cliente_id, mesa_id, fecha_reserva, estado } = this.helpers.parseReserva(reserva);
            const query = `UPDATE ${this.table} SET cliente_id = ?, mesa_id = ?, fecha_reserva = ?, estado = ? WHERE reserva_id = ?`;
            const [result] = await this.connection.promise().query(query, [cliente_id, mesa_id, fecha_reserva, estado, reserva_id]);
            return result;
        } catch (err) {
            console.log('Problemas al actualizar la reserva:', err);
            return null;
        }
    }

    async deleteReserva(id) {
        try {
            const query = `DELETE FROM ${this.table} WHERE reserva_id = ?`;
            const [result] = await this.connection.promise().query(query, [id]);
            return result;
        } catch (err) {
            console.log('Problemas al eliminar la reserva:', err);
            return null;
        }
    }
}
