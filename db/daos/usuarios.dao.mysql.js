import Mysql from '../connections/Mysql.js';


export default class UsuariosDaoMysql extends Mysql {

    constructor() {
        super()
        this.table = 'usuarios'
        this.#createTable()
    }

    #createTable() {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table}(
            id INT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            age INT NOT NULL            
        )`
        this.connection.query(query)
    }

    async getAllUsers() {
        try {
            const query = `SELECT * FROM ${this.table}`
            const [result] = await this.connection.promise().query(query)
            return result
        }

        catch (err) {
            console.log('Problemas al obtener los usuarios')
            return []
        }
    }


    async getUsuariosById(id) {
        const query = `SELECT * FROM ${this.table} WHERE id = ?`
        const [result] = await this.connection.promise().query(query, [id])
        return result
    }


    async getUsuariosByApellido(apellido) {
        const query = `SELECT * FROM ${this.table} WHERE apellido = '${apellido}'`
        const [result] = await this.connection.promise().query(query)
        return result
    }

    async addUsuarios(userio) {
        const { id, nombre, apellido, direccion, telefono, email } = usuario
        const query = `INSERT INTO ${this.table} VALUES (?,?,?,?,?,?)`
        const [result] = await this.connection.promise().query(query, [id, nombre, apellido, direccion, telefono, email])
        return result
    }


    async modifyUser(usuario) {
        const { id, nombre, apellido, direccion, telefono, email } = usuario
        const query = `UPDATE ${this.table} SET nombre = ?, apellido = ?, direccion = ?, telefono = ?, email = ?, WHERE id = ?`
        const [result] = await this.connection.promise().query(query, [id, nombre, apellido, direccion, telefono, email])
        return result
    }


    async deleteUsuario(id) {
        const query = `DELETE FROM ${this.table} WHERE id = ${id}`
        const [result] = await this.connection.promise().query(query)
        return result
    }
}