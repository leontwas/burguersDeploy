import Mysql from '../connections/Mysql.js';
import ReservasHelpers from '../helpers/reservas.helpers.js';

export default class ReservasDaoMysql extends Mysql {

    constructor() {
        super();
        this.table = 'reservas';
        this.helpers = new ReservasHelpers();
        this.initialize();
    }

    async initialize() {
        try {
            const mysqlInstance = await Mysql.getInstance();
            this.mysql = mysqlInstance.connection;
            await this.#createTable();
        } catch (error) {
            console.error('Error initializing MySQL connection:', error);
            throw error;
        }
    }

    async #createTable() {
        try {
            const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
                reserva_id INT PRIMARY KEY AUTO_INCREMENT,
                cliente_id INT NOT NULL,
                mesa_id INT NOT NULL,
                fecha_reserva DATETIME NOT NULL,
                estado VARCHAR(50) NOT NULL,
                FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id),
                FOREIGN KEY (mesa_id) REFERENCES Mesas(mesa_id)
            )`;
            await this.mysql.query(query);
            console.log("Tabla creada o ya existente.");
        } catch (error) {
            console.error('Error creating table:', error);
            throw error;
        }
    }

    async getAllReservas() {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table}`);
            return results;
        } catch (err) {
            console.log('Problemas al obtener las reservas:', err);
            return [];
        }
    }

    async getReservaById(reserva_id) {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table} WHERE reserva_id = ?`, [reserva_id]);
            return results[0];
        } catch (err) {
            console.log('Problemas al obtener la reserva:', err);
            return null;
        }
    }

    async getReservasByClienteId(cliente_id) {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table} WHERE cliente_id = ?`, [cliente_id]);
            return results;
        } catch (err) {
            console.log('Problemas al obtener las reservas del cliente:', err);
            return [];
        }
    }

    async getReservasByMesaId(mesa_id) {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table} WHERE mesa_id = ?`, [mesa_id]);
            return results;
        } catch (err) {
            console.log('Problemas al obtener las reservas de la mesa:', err);
            return [];
        }
    }

    async addReserva(reserva) {
        try {
            const { reserva_id, cliente_id, mesa_id, fecha_reserva, estado } = this.helpers.parseReserva(reserva);
            const query = `INSERT INTO ${this.table} (reserva_id, cliente_id, mesa_id, fecha_reserva, estado) VALUES (?, ?, ?, ?, ?)`;
            const [result] = await this.mysql.query(query, [reserva_id, cliente_id, mesa_id, fecha_reserva, estado]);
            return result.insertId;
        } catch (err) {
            console.log('Problemas al agregar la reserva:', err);
            return null;
        }
    }

    async updateReserva(reserva) {
        try {
            const { reserva_id, cliente_id, mesa_id, fecha_reserva, estado } = this.helpers.parseReserva(reserva);
            const query = `UPDATE ${this.table} SET cliente_id = ?, mesa_id = ?, fecha_reserva = ?, estado = ? WHERE reserva_id = ?`;
            const [result] = await this.mysql.query(query, [cliente_id, mesa_id, fecha_reserva, estado, reserva_id]);
            return result.affectedRows;
        } catch (err) {
            console.log('Problemas al actualizar la reserva:', err);
            return null;
        }
    }

    async deleteReserva(reserva_id) {
        try {
            const query = `DELETE FROM ${this.table} WHERE reserva_id = ?`;
            const [result] = await this.mysql.query(query, [reserva_id]);
            return result.affectedRows;
        } catch (err) {
            console.log('Problemas al eliminar la reserva:', err);
            return null;
        }
    }
}

