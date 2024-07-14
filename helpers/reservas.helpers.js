export default class ReservasHelpers {
    parseReserva(data = {}) {
        return {
            reserva_id: data.reserva_id ? parseInt(data.reserva_id) : null,
            cliente_id: data.cliente_id ? parseInt(data.cliente_id) : null,
            mesa_id: data.mesa_id ? parseInt(data.mesa_id) : null,
            fecha_reserva: this.parseDate(data.fecha_reserva),
            estado: this.parseBoolean(data.estado)
        };
    }

    parseDate(date) {
        const parsedDate = new Date(date);
        return isNaN(parsedDate.getTime()) ? null : parsedDate;
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
