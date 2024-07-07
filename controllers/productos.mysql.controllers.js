import Mysql from '../db/connection/Mysql.js'; // Ajustar la ruta según la ubicación real

export default class ProductosDaoMysql extends Mysql {

    constructor() {
        super();
        this.table = 'productos';
        this.#createTable(); // Llamar al método privado para crear la tabla al instanciar
    }

    #createTable = () => {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table}(
            producto_id INT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            descripcion TEXT NOT NULL,
            precio DECIMAL(10, 2) NOT NULL,
            stock INT NOT NULL
        )`;
        this.connection.query(query, (error, result) => {
            if (error) {
                console.error('Error al crear la tabla de productos:', error);
            } else {
                console.log('Tabla de productos creada exitosamente');
            }
        });
    }

    async getAllProductos() {
        try {
            const query = `SELECT * FROM ${this.table}`;
            const [result] = await this.connection.promise().query(query);
            return result;
        } catch (err) {
            console.log('Problemas al obtener los productos:', err);
            return [];
        }
    }

    async getProductoById(id) {
        try {
            const query = `SELECT * FROM ${this.table} WHERE producto_id = ?`;
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
            const query = `INSERT INTO ${this.table} (producto_id, nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?, ?)`;
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
            const query = `UPDATE ${this.table} SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE producto_id = ?`;
            const [result] = await this.connection.promise().query(query, [nombre, descripcion, precio, stock, producto_id]);
            return result;
        } catch (err) {
            console.log('Problemas al actualizar el producto:', err);
            return null;
        }
    }

    async deleteProducto(id) {
        try {
            const query = `DELETE FROM ${this.table} WHERE producto_id = ?`;
            const [result] = await this.connection.promise().query(query, [id]);
            return result;
        } catch (err) {
            console.log('Problemas al eliminar el producto:', err);
            return null;
        }
    }

    async getProductosByNombre(nombre) {
        try {
            const query = `SELECT * FROM ${this.table} WHERE nombre LIKE ?`;
            const [result] = await this.connection.promise().query(query, [`%${nombre}%`]);
            return result;
        } catch (err) {
            console.log('Problemas al obtener los productos por nombre:', err);
            return [];
        }
    }

    async getProductosByPrecioRango(minPrecio, maxPrecio) {
        try {
            const query = `SELECT * FROM ${this.table} WHERE precio BETWEEN ? AND ?`;
            const [result] = await this.connection.promise().query(query, [minPrecio, maxPrecio]);
            return result;
        } catch (err) {
            console.log('Problemas al obtener los productos por rango de precio:', err);
            return [];
        }
    }
}
