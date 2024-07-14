export default class MesasHelpers {
    parseMesa(data = {}) {
        return {
            mesa_id: data.mesa_id ? parseInt(data.mesa_id) : null,
            numero: data.numero ? parseInt(data.numero) : 0,
            capacidad: data.capacidad ? parseInt(data.capacidad) : 0,
            disponible: this.parseBoolean(data.disponible)
        };
    }

    parseBoolean(value) {
        if (typeof value === 'boolean') {
            return value;
        }
        if (typeof value === 'string') {
            value = value.toLowerCase();
            return value === 'true' || value === '1';
        }
        return Boolean(value);
    }
}

