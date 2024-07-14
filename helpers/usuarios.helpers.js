import Usuario from '../models/Usuario.js';

export default class UsuariosHelpers {
    parseUsuarios(data = {}) {
        console.log("Datos recibidos en parseUsuarios:", data); 
        
        if (typeof data !== 'object' || !data) {
            throw new Error("Datos inválidos para parseUsuarios");
        }

        const { usuario_id, email, pass } = data;
        console.log("Datos desestructurados en parseUsuarios:", usuario_id, email, pass); 

        const usuario = new Usuario(
            usuario_id ? parseInt(usuario_id) : null,
            email ? String(email) : '',
            pass ? String(pass) : ''
        );
        console.log("Instancia de Usuario en parseUsuarios:", usuario); 

        return usuario;
    }
}
