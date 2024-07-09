import usuariosMock from '../mocks/usuarios.mock.js';

export default class UsuariosDaoMemory {
    constructor() {
        this.users = usuariosMock;
    }

    getAllUsuarios() {
        return this.users;
    }

    getUsuariosById(id) {
        const user = this.users.find(user => user.id === parseInt(id));
        return user;
    }

    getUsuariosByApellido(apellido) {
        const result = this.users.filter(user => user.apellido === apellido);
        return result;
    }

    addUsuario(usuario) {
        this.users.push(usuario);
        return true;
    }

    modifyUsuario(data) {
        let modifiedUsuario = null;
        this.users = this.users.map(user => {
            if (user.id === data.id) {
                user = data;
                modifiedUsuario = user;
            }
            return user;
        });
        return modifiedUsuario;
    }

    deleteUsuario(id) {
        const oldLength = this.users.length;
        this.users = this.users.filter(user => user.id !== parseInt(id));
        return oldLength !== this.users.length;
    }
}
