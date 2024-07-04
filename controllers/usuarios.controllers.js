import usuariosMock from '../db/mocks/usuarios.mock.js'
export default class UsuariosControllers {

    constructor() {
        this.usuarios = usuariosMock
    }

    getAllUsuarios = (req, res) => {
        res.json(this.usuarios)
        }

    createUsuarios = (req, res) => {
        console.log(req.body)
        res.send('post usuarios desde controllers');
    } 
    
    updateUsuarios = (req, res) => {
        res.send('put usuarios desde controllers');
    }

    deleteUsuarios = (req, res) => {
        res.send('delete usuarios desde controllers');
    }

}
