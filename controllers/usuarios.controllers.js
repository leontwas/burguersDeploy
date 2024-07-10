import UsuariosDaoMysql from '../db/daos/usuarios.dao.mysql.js'
import UsuariosHelpers from '../helpers/usuarios.helpers.js'

export default class UsuariosControllers {

    constructor() {
        this.db = UsuariosDaoMysql
        this.helpers = new UsuariosHelpers()
    }

    getAllUsuarios =  async (req, res) => {
        const usuarios = await this.db.getAllUsuarios()
        res.json(usuarios)
    }

    getUsuarioById = async (req, res) => {
        const { usuario_id } = req.params
        const usuario = await this.db.getUsuarioById(usuario_id)
        res.json(usuario)
    }

getUsuariosByEmail = async (req, res) => {
    const { email } = req.params
    const usuario = await this.db.getUsuariosByEmail(email)
    res.json(usuario)
}

createUsuarios = async (req, res) => {
        const usuario = this.helpers.parseUsuarios(req.body)
        const result = await this.db.createUsuarios(usuario)
        res.json(result);
    } 

    updateUsuarios = async (req, res) => {
        const usuario = this.helpers.parseUsuarios(req.body)
        const result = await this.db.updateUsuarios(usuario)
        res.json(result);
    } 

    deleteUsuarios = async (req, res) => {
        const { usuario_id } = this.helpers.parseUsuarios(req.body)
        const result = await this.db.deleteUsuarios(usuario_id)
        res.json(result)
    }

}
