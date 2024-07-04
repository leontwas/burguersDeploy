import Usuarios from '../models/Usuarios.js';

export default class UsuariosHelpers {
    parseUsuarios(data) {
        console.log("Datos recibidos en parseUsuarios:", data); // Verificar datos recibidos
        if (!data || typeof data !== 'object') {
            throw new Error("Datos inválidos para parseUsuarios");
        }

        const { id, nombre, apellido, telefono, email, pass } = data;
        console.log("Datos desestructurados en parseUsuarios:", id, nombre, apellido, telefono, email, pass); // Verificar datos desestructurados

        const usuario = new Usuarios(parseInt(id), nombre, apellido, parseInt(telefono), email, pass);
        console.log("Instancia de Usuarios en parseUsuarios:", usuario); // Verificar instancia creada

        return usuario;
    }
}
