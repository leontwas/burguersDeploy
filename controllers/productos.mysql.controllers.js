import Mysql from '../db/connection/Mysql.js';

export default class ProductosDaoMysql extends Mysql {

    constructor() {
        super();
        this.table = 'productos';
    }

    async getAllProductos() {
        try {
            const query = `SELECT * FROM productos`;
            const [result] = await this.connection.promise().query(query);
            return result;
        } catch (err) {
            console.log('Problemas al obtener los productos:', err);
            return [];
        }
    }

    async getProductoById(id) {
        try {
            const query = `SELECT * FROM productos WHERE producto_id = ?`;
            const [result] = await this.connection.promise().query(query, [id]);
            return result;
        } catch (err) {
            console.log('Problemas al obtener el producto:', err);
            return null;
        }
    }

    async addProducto(producto) {
        try {
            const { producto_id, nombre, descripcion, precio, stock } = producto;
            const query = `INSERT INTO productos (producto_id, nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?, ?)`;
            const [result] = await this.connection.promise().query(query, [producto_id, nombre, descripcion, precio, stock]);
            return result;
        } catch (err) {
            console.log('Problemas al agregar el producto:', err);
            return null;
        }
    }

    async updateProducto(producto) {
        try {
            const { producto_id, nombre, descripcion, precio, stock } = producto;
            const query = `UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE producto_id = ?`;
            const [result] = await this.connection.promise().query(query, [nombre, descripcion, precio, stock, producto_id]);
            return result;
        } catch (err) {
            console.log('Problemas al actualizar el producto:', err);
            return null;
        }
    }

    async deleteProducto(id) {
        try {
            const query = `DELETE FROM productos WHERE producto_id = ?`;
            const [result] = await this.connection.promise().query(query, [id]);
            return result;
        } catch (err) {
            console.log('Problemas al eliminar el producto:', err);
            return null;
        }
    }

    async getProductosByNombre(nombre) {
        try {
            const query = `SELECT * FROM productos WHERE nombre LIKE ?`;
            const [result] = await this.connection.promise().query(query, [`%${nombre}%`]);
            return result;
        } catch (err) {
            console.log('Problemas al obtener los productos por nombre:', err);
            return [];
        }
    }

    async getProductosByPrecioRango(minPrecio, maxPrecio) {
        try {
            const query = `SELECT * FROM productos WHERE precio BETWEEN ? AND ?`;
            const [result] = await this.connection.promise().query(query, [minPrecio, maxPrecio]);
            return result;
        } catch (err) {
            console.log('Problemas al obtener los productos por rango de precio:', err);
            return [];
        }
    }
}
