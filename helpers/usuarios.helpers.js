import Usuarios from '../models/Usuarios.js';

export default class UsuariosHelpers {
    parseUsuarios(data) {
        console.log("Datos recibidos en parseUsuarios:", data); 
        if (!data || typeof data !== 'object') {
            throw new Error("Datos inválidos para parseUsuarios");
        }

        const { id, nombre, apellido, telefono, email} = data;
        console.log("Datos desestructurados en parseUsuarios:", id, nombre, apellido, telefono, email); 

        const usuario = new Usuarios(parseInt(id), nombre, apellido, telefono, email);
        console.log("Instancia de Usuarios en parseUsuarios:", usuario); 

        return usuario;
    }
}
