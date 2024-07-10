export default class Cliente {
    constructor(cliente_id = null, nombre, apellido, direccion, telefono, email) {
        this.cliente_id = cliente_id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
    }
}