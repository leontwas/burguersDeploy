import Mysql from '../connections/Mysql.js';

export default class MesasDaoMysql extends Mysql {

    constructor() {
        super();
        this.table = 'mesas';
        this.#createTable();
    }

    #createTable() {
        const query = `CREATE TABLE IF NOT EXISTS mesas(
            mesa_id INT PRIMARY KEY AUTO_INCREMENT,
            numero INT NOT NULL,
            capacidad INT NOT NULL,
            ubicacion VARCHAR(100) NOT NULL
        )`;
        this.connection.query(query);
    }

    async getAllMesas() {
        try {
            const query = `SELECT * FROM mesas`;
            const [result] = await this.connection.promise().query(query);
            return result;
        } catch (err) {
            console.log('Problemas al obtener las mesas:', err);
            return [];
        }
    }

    async getMesaById(id) {
        try {
            const query = `SELECT * FROM mesas WHERE mesa_id = ?`;
            const [result] = await this.connection.promise().query(query, [id]);
            return result[0];
        } catch (err) {
            console.log('Problemas al obtener la mesa:', err);
            return null;
        }
    }

    async addMesa(mesa) {
        try {
            const { mesa_id, numero, capacidad, ubicacion } = mesa;
            const query = `INSERT INTO mesas (mesa_id, numero, capacidad, ubicacion) VALUES (?, ?, ?, ?)`;
            const [result] = await this.connection.promise().query(query, [mesa_id, numero, capacidad, ubicacion]);
            return result;
        } catch (err) {
            console.log('Problemas al agregar la mesa:', err);
            return null;
        }
    }

    async updateMesa(mesa) {
        try {
            const { mesa_id, numero, capacidad, ubicacion } = mesa;
            const query = `UPDATE mesas SET numero = ?, capacidad = ?, ubicacion = ? WHERE mesa_id = ?`;
            const [result] = await this.connection.promise().query(query, [numero, capacidad, ubicacion, mesa_id]);
            return result;
        } catch (err) {
            console.log('Problemas al actualizar la mesa:', err);
            return null;
        }
    }

    async deleteMesa(id) {
        try {
            const query = `DELETE FROM mesas WHERE mesa_id = ?`;
            const [result] = await this.connection.promise().query(query, [id]);
            return result;
        } catch (err) {
            console.log('Problemas al eliminar la mesa:', err);
            return null;
        }
    }
}
