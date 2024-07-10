import Mysql from "../db/connection/Mysql";
import UsuariosHelpers from "../helpers/usuarios.helpers";

export default class UsuariosDaoMysql extends Mysql {

    constructor() {
        super();
        this.table = 'usuarios';
        this.helpers = new UsuariosHelpers();
        this.#createTable();
    }

    #createTable() {
        const query = `CREATE TABLE IF NOT EXIST ${this.table} (
        Usuario_id INT(11) PRIMARY KEY,
        email VARCHAR (50) NOT NULL,
        pass VARCHAR (50) NOT NULL
        )`
        this.connection.query(query)
    }
    async getAllUsuarios() {
        const query = `SELECT * FROM ${this.table}`;
        const [result] = this.connection.promise().query(query);
        return result
}

async getUsuariosById(id) {
        const query = `SELECT * FROM ${this.table} WHERE ${id}`;
        const [result] = this.connection.promise().query(query);
        return result;
    }

    async getUsuariosByNombre(nombre) {
        const query = `SELECT * FROM ${this.table} WHERE '${nombre}';
        const [result]= this.co
    }
}
