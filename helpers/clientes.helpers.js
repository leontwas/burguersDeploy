export default class ClientesHelpers {
    parseCliente(data) {
        return {
            cliente_id: parseInt(data.cliente_id) || null,
            nombre: String(data.nombre) || '',
            apellido: String(data.apellido) || '',
            direccion: String(data.direccion) || '',
            telefono: String(data.telefono) || '',
            email: String(data.email) || ''
        };
    }
}
