import usuariosMock from '../db/mocks/usuarios.mock.js'
import UsuariosHelpers from '../helpers/usuarios.helpers.js'
export default class UsuariosControllers {

    constructor() {
        this.usuarios = usuariosMock
        this.helpers = new UsuariosHelpers()
    }

    getAllUsuarios = (req, res) => {
        res.json(this.usuarios)
        }

    createUsuarios = (req, res) => {
        console.log(req.body.id, req.body.nombre, req.body.apellido, req.body.telefono, req.body.email)
        const usuarios = this.helpers.parseUsuarios(req.body)
        this.usuarios.push(usuarios)
        res.send('post usuarios desde controllers');
    } 
    
    updateUsuarios = (req, res) => {
        res.send('put usuarios desde controllers');
    }

    deleteUsuarios = (req, res) => {
        const { id } = req.params
        this.usuarios = this.usuarios.filter(usuario => 
            usuario.id !== parseInt(id))
        res.json(this.usuarios);
    }

}