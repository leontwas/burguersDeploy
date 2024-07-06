export default class ReservasHelpers {
    parseReserva(data) {
        return {
            reserva_id: parseInt(data.reserva_id),
            cliente_id: parseInt(data.cliente_id),
            mesa_id: parseInt(data.mesa_id),
            fecha_reserva: new Date(data.fecha_reserva),
            estado: Boolean(data.estado)
        };
    }
}
