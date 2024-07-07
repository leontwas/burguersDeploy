export default class ClientesHelpers {
    parseCliente(data) {
        return {
            cliente_id: parseInt(data.cliente_id),
            nombre: parseString(data.nombre),
            apellido: parseString(data.apellido),
            direccion:parseString(data.direccion),
            telefono: parseString(data.telefono),
            email: parseString(data.email),
        };
    }
}
