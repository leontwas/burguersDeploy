import Mysql from '../connections/Mysql.js';

export default class MesasDaoMysql extends Mysql {

    constructor() {
        super();
        this.table = 'mesas';
        this.#createTable();
    }

    #createTable() {
        try {
            const query = `CREATE TABLE IF NOT EXISTS mesas (
                mesa_id INT AUTO_INCREMENT PRIMARY KEY,
                numero INT NOT NULL,
                capacidad INT NOT NULL,
                disponible BOOLEAN DEFAULT TRUE
            )`;
            const [result] = this.connection.promise().query(query);
            console.log("Tabla mesas creada correctamente.");
            return result;
        } catch (err) {
            console.error("Error al crear la tabla mesas:", err);
            throw err; 
        }
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
            mesa.disponible = true;
    
            const { mesa_id, numero, capacidad, disponible } = mesa;
            const query = `INSERT INTO mesas (mesa_id, numero, capacidad, disponible) VALUES (?, ?, ?, ?)`;
            const [result] = await this.connection.promise().query(query, [mesa_id, numero, capacidad, disponible]);
    
            if (result.affectedRows > 0) {
                console.log('Mesa agregada con éxito!');
            } else {
                console.log('No se pudo agregar la mesa.');
            }
    
            return result;
        } catch (err) {
            console.log('Problemas al agregar la mesa:', err);
            throw new Error('Error agregando la mesa');
        }
    }
    
    async updateMesa(mesa) {
        try {
            const { mesa_id, numero, capacidad, disponible } = mesa;
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
            return result;
        } catch (err) {
            console.log('Problemas al eliminar la mesa:', err);
            return null;
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
