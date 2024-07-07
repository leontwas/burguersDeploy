export default class MesasHelpers {
    parseMesas(data) {
        return {
            mesa_id: parseInt(data.mesa_id),
            numero: parseInt(data.numero),
            capacidad: parseInt(data.capacidad),
            disponible: parseBoolean(data.disponible)
        };
    }
}