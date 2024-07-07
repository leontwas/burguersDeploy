export default class ReservasHelpers {
    parseReserva(data) {
        return {
            reserva_id: parseInt(data.reserva_id) || null,
            cliente_id: parseInt(data.cliente_id) || null,
            mesa_id: parseInt(data.mesa_id) || null,
            fecha_reserva: this.parseDate(data.fecha_reserva),
            estado: this.parseBoolean(data.estado)
        };
    }

    parseDate(date) {
        const parsedDate = new Date(date);
        return isNaN(parsedDate) ? null : parsedDate;
    }

    parseBoolean(value) {
        return value === 'true' || value === true;
    }
}
