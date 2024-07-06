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

    getUsuarioById = (req, res) => {
        const { id } = req.params
        const usuario = this.usuarios.find(usuario => usuario.id === parseInt(id))
        if (usuario) {
            res.json(usuario)
        } else {
            res.status(404).send('Usuario no encontrado')
        }
    }

    createUsuarios = (req, res) => {
        console.log(req.body.id, req.body.nombre, req.body.apellido, req.body.telefono, req.body.email)
        const usuario = this.helpers.parseUsuarios(req.body)
        this.usuarios.push(usuario)
        res.send('Usuario creado exitosamente');
    } 

    updateUsuarios = (req, res) => {
        const { id } = req.params
        const usuarioIndex = this.usuarios.findIndex(usuario => usuario.id === parseInt(id))
        if (usuarioIndex !== -1) {
            const updatedUsuario = this.helpers.parseUsuarios(req.body)
            this.usuarios[usuarioIndex] = { ...this.usuarios[usuarioIndex], ...updatedUsuario }
            res.send('Usuario actualizado exitosamente')
        } else {
            res.status(404).send('Usuario no encontrado')
        }
    }

    deleteUsuarios = (req, res) => {
        const { id } = req.params
        this.usuarios = this.usuarios.filter(usuario => usuario.id !== parseInt(id))
        res.send('Usuario eliminado exitosamente');
    }

}
