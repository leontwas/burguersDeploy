import usuariosMock from '../mocks/usuarios.mock.js'

export default class UsuariosDaoMemory {

    constructor() {
        this.users = usuariosMock
    }

    getAllUsuarios() {
        return this.usuarios
    }


    getUsuariosById(id) {
        const user = this.usuarios.find(user =>
            user.id === parseInt(id))
        return user
    }


    getUsuariosByApellido(apellido) {
        const result = this.usuarios.filter(user =>
            user.apellido === apellido)
        return result
    }

    addUsuarios(usuario) {
        this.usuarios.push(usuario)
        return true
    }


    modifyUsuarios(data) {
        let modifiedUsuarios = null
        this.usuarios = this.usuarios.map(user => {
            if (user.id === data.id) {
                user = data
                modifiedUsuarios = user
            }
            return user
        })
        return modifiedUsuarios
    }


    deleteUsuarios(id) {
        let oldLength = this.usuarios.length
        this.usuarios = this.usuarios.filter(user =>
            user.id !== parseInt(id))
        return oldLength !== this.usuarios.length
    }
}