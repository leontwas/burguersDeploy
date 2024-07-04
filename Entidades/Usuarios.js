export default class Usuarios {
    constructor(id, nombre, apellido, telefono, email, pass) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
        this.pass = pass;
    }

    // Método estático para crear un nuevo usuario
    static crearUsuario(id, nombre, apellido, telefono, email, pass) {
        return new Usuarios(id, nombre, apellido, telefono, email, pass);
    }

    // Método estático para buscar usuarios por apellido
    static buscarPorApellido(usuarios, apellido) {
        return usuarios.find(usuario => usuario.apellido === apellido);
    }

    // Método estático para buscar usuarios por id
    static buscarPorId(usuarios, id) {
        return usuarios.find(usuario => usuario.id === id);
    }

    // Método estático para eliminar usuarios por id
    static eliminarPorId(usuarios, id) {
        return usuarios.filter(usuario => usuario.id !== id);
    }
}
