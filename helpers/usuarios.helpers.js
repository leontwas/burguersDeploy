import Usuario from '../models/Usuario.js';

export default class UsuariosHelpers {
    parseUsuarios(data) {
        console.log("Datos recibidos en parseUsuarios:", data); 
        if (!data || typeof data !== 'object') {
            throw new Error("Datos inválidos para parseUsuarios");
        }

        const { usuario_id, email, pass } = data;
        console.log("Datos desestructurados en parseUsuarios:", usuario_id, email, pass); 

        const usuario = new Usuario(parseInt(usuario_id), String(email), String(pass));
        console.log("Instancia de Usuarios en parseUsuarios:", usuario); 

        return usuario;
    }
}
