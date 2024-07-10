import { query } from 'express'
import Mysql from '../connection/Mysql.js'

export default class ProductosDaoMysql extends Mysql {
    constructor() {
        super();
        this.query = query
        this.table = 'productos'
        this.#createTable()
    }

 #createTable() {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
        producto_id INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        precio DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL
    )`
    this.connection.query(query)  
    }

    async getAllProductos() {
        const query = `SELECT * FROM ${this.table}`
        const [results] = await this.connection.promise().query(query);
        return results      
    }


    async getProductoById(producto_id) {
        const query = `SELECT * FROM ${this.table} WHERE ${producto_id}`;
        const [results] = await this.connection.promise().query(query);
        return results
    }

    async getProductosByNombre(nombre) {
        const query = `SELECT * FROM ${this.table} WHERE '${nombre}'`;
        const [result] = await this.connection.promise().query(query)
        return result
    }


    async createProducto(producto) {
            const { producto_id, nombre, descripcion, precio, stock } =  producto
            const query = `INSERT INTO ${this.table} VALUES (?,?,?,?,?)`
            const [result] = this.connection.promise().query(query, [producto_id, nombre, descripcion, precio, stock])
            return result.affectedRows 
    }
    

    async updateProducto(producto) {
        const { producto_id, nombre, descripcion, precio, stock  } = producto;
        const query = `UPDATE ${this.table} SET nombre = ?, descripción = ?, precio, stock = ? WHERE producto_id = ?`;
        const [result] = await this.connection.promise().query(query, [nombre, descripcion, precio, stock, producto_id]);
        return result.affectedRows
    }

    async deleteUsuario(producto_id) {
        const query = `DELETE FROM ${this.table} WHERE producto_id = ?`;
        const [result] = await this.connection.promise().query(query, [producto_id]);
        return result.affectedRows;      
    }
}
