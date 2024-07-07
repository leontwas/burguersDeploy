import Mysql from '../mysql.js'

class ProductosDaoMysql {
    constructor() {
        this.initialize()
    }

    async initialize() {
        const mysqlInstance = await Mysql.getInstance()
        this.mysql = mysqlInstance.connection
        this.table = 'productos'
        await this.#createTable()
    }

    async #createTable() {
        try {
        const query = `CREATE TABLE IF NOT EXISTS productos (
        producto_id INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        precio DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL
    )`
            await this.mysql.query(query)
            console.log("Tabla creada o ya existente.")
        } catch (error) {
            console.error('Error creating table:', error)
            throw error
        }
    }

    async getAllProductos() {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM productos`)
            return results
        } catch (err) {
            throw err
        }
    }

    async getProductoById(producto_id) {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table} WHERE producto_id = ?`, [producto_id])
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async createProducto(nombre, descripcion, precio, stock) {
        try {
            const producto = { nombre, descripcion, precio, stock };
            const [result] = await this.mysql.query(`INSERT INTO ${this.table} SET ?`, producto);
            return result.insertId;
        } catch (err) {
            throw err;
        }
    }
    

    async updateProducto(producto_id, nombre, descripcion, precio, stock) {
        try {
            const query = `
                UPDATE ${this.table} 
                SET nombre = ?, descripcion = ?, precio = ?, stock = ?
                WHERE producto_id = ?
            `;
            const [result] = await this.mysql.query(query, [ nombre, descripcion, precio, stock, producto_id]);
            return result.affectedRows;
        } catch (err) {
            throw err;
        }
    }
    

    async deleteProducto(producto_id) {
        try {
            const [result] = await this.mysql.query(`DELETE FROM ${this.table} WHERE producto_id = ?`, [producto_id])
            return result.affectedRows
        } catch (err) {
            throw err
        }
    }
}

export default ProductosDaoMysql