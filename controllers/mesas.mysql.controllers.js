import Mysql from '../db/connection/Mysql.js';
import MesasHelpers from '../helpers/mesas.helpers.js'; 

export default class MesasDaoMysql extends Mysql {

    constructor() {
        super();
        this.table = 'mesas';
        this.helpers = new MesasHelpers(); 
        this.#createTable();
    }

    #createTable() {
   const query = `CREATE TABLE IF NOT EXIST ${this.table} (
        mesa_id int(11) PRIMARY KEY,
        numero int(3) NOT NULL,
        capacidad int(2) NOT NULL,
        disponible tinyint(1) DEFAULT 1
      )`
    this.connection.query(query)
    }
           
 async getAllMesas() {
            const query = `SELECT * FROM ${this.table}`;
            const [result] = this.connection.promise().query(query);
            return result
    }

    async getMesaById(id) {
            const query = `SELECT * FROM ${this.table} WHERE ${id}`;
            const [result] = this.connection.promise().query(query);
            return result;
        }
    

    async createMesa(mesa) {
            const parseadaMesa = this.helpers.parseMesa(mesa); 
            const { numero, capacidad, disponible } = parseadaMesa;
            const query = `INSERT INTO mesas (numero, capacidad, disponible) VALUES (?, ?, ?)`;
            const [result] = this.connection.query(query, [numero, capacidad, disponible]);
            if (result.affectedRows > 0) {
                console.log('Mesa agregada con éxito!');
            } else {
                console.log('No se pudo agregar la mesa.');
            }
            return result;
    
    }

    async updateMesa(mesa) {
        try {
            const parsedMesa = this.helpers.parseMesa(mesa); 
            const { mesa_id, numero, capacidad, disponible } = parsedMesa;
            const query = `UPDATE mesas SET numero = ?, capacidad = ?, disponible = ? WHERE mesa_id = ?`;
            const [result] = await this.connection.promise().query(query, [numero, capacidad, disponible, mesa_id]);

            if (result.affectedRows > 0) {
                console.log('Mesa actualizada con éxito!');
            } else {
                console.log('No se encontró la mesa para actualizar.');
            }

            return result;
        } catch (err) {
            console.log('Problemas al actualizar la mesa:', err);
            throw new Error('Error actualizando la mesa');
        }
    }

    async deleteMesa(id) {
        try {
            const query = `DELETE FROM mesas WHERE mesa_id = ?`;
            const [result] = await this.connection.promise().query(query, [id]);

            if (result.affectedRows > 0) {
                console.log('Mesa eliminada con éxito!');
            } else {
                console.log('No se encontró la mesa para eliminar.');
            }

            return result;
        } catch (err) {
            console.log('Problemas al eliminar la mesa:', err);
            throw new Error('Error eliminando la mesa');
        }
    }
}
