export default class ClientesHelpers {
    parseCliente(data = {}) {
        return {
            cliente_id: parseInt(data.cliente_id) || null,
            nombre: data.nombre ? String(data.nombre) : '',
            apellido: data.apellido ? String(data.apellido) : '',
            direccion: data.direccion ? String(data.direccion) : '',
            telefono: data.telefono ? String(data.telefono) : '',
            email: data.email ? String(data.email) : ''
        };
    }
}

