import { query } from 'express';
import Mysql from '../connection/Mysql.js';

export default class ProductosDaoMysql extends Mysql {
    constructor() {
        super();
        this.query = query;
        this.table = 'productos';
        this.#createTable();
    }

    #createTable() {
        const query = `USE sql3718809,
            CREATE TABLE IF NOT EXISTS ${this.table} (
                producto_id INT(11) PRIMARY KEY AUTO_INCREMENT,
                nombre VARCHAR(100),
                descripcion TEXT,
                precio DECIMAL(10, 2),
                stock INT(11)
            )`;
        this.connection.query(query, (err, result) => {
            if (err) {
                console.error('Error al crear la tabla productos:', err);
            } else {
                console.log('Tabla productos creada con éxito!');
            }
        });
    }

    async getAllProductos() {
        const query = `SELECT * FROM ${this.table}`;
        try {
            const [results] = await this.connection.promise().query(query);
            return results;
        } catch (err) {
            console.error('Error al obtener todos los productos:', err);
            throw err;
        }
    }

    async getProductoById(producto_id) {
        const query = `SELECT * FROM ${this.table} WHERE producto_id = ?`;
        try {
            const [results] = await this.connection.promise().query(query, [producto_id]);
            return results;
        } catch (err) {
            console.error(`Error al obtener el producto con id ${producto_id}:`, err);
            throw err;
        }
    }

    async getProductosByNombre(nombre) {
        const query = `SELECT * FROM ${this.table} WHERE nombre = ?`;
        try {
            const [result] = await this.connection.promise().query(query, [nombre]);
            return result;
        } catch (err) {
            console.error(`Error al obtener el producto con nombre ${nombre}:`, err);
            throw err;
        }
    }

    async createProducto(producto) {
        const { nombre, descripcion, precio, stock } = producto;
        const query = `INSERT INTO ${this.table} (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)`;
        try {
            const [result] = await this.connection.promise().query(query, [nombre, descripcion, precio, stock]);
            return result.affectedRows;
        } catch (err) {
            console.error('Error al crear el producto:', err);
            throw err;
        }
    }

    async updateProducto(producto) {
        const { producto_id, nombre, descripcion, precio, stock } = producto;
        const query = `UPDATE ${this.table} SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE producto_id = ?`;
        try {
            const [result] = await this.connection.promise().query(query, [nombre, descripcion, precio, stock, producto_id]);
            return result.affectedRows;
        } catch (err) {
            console.error('Error al actualizar el producto:', err);
            throw err;
        }
    }

    async deleteProducto(producto_id) {
        const query = `DELETE FROM ${this.table} WHERE producto_id = ?`;
        try {
            const [result] = await this.connection.promise().query(query, [producto_id]);
            return result.affectedRows;
        } catch (err) {
            console.error(`Error al eliminar el producto con id ${producto_id}:`, err);
            throw err;
        }
    }
}
