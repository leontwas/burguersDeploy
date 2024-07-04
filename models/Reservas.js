export default class Reservas {
    constructor() {
        this.reservas = [];
        this.nextId = 1; // Inicializamos el contador para generar ids únicos
    }

    // Método para crear una nueva reserva
    crearReserva(nombre, apellido, telefono, email, fecha, comensales, foto, menores) {
        const id = this.nextId++;
        const reserva = { id, nombre, apellido, telefono, email, fecha, comensales, foto, menores };
        this.reservas.push(reserva);
        return reserva;
    }

    // Método para modificar una reserva por su id
    modificarReserva(id, nombre, apellido, telefono, email, fecha, comensales, foto, menores) {
        const reservaIndex = this.reservas.findIndex(reserva => reserva.id === id);
        if (reservaIndex !== -1) {
            this.reservas[reservaIndex] = { id, nombre, apellido, telefono, email, fecha, comensales, foto, menores };
            return this.reservas[reservaIndex];
        }
        return null; // Si no se encuentra la reserva
    }

    // Método para eliminar una reserva por su id
    eliminarReserva(id) {
        const index = this.reservas.findIndex(reserva => reserva.id === id);
        if (index !== -1) {
            this.reservas.splice(index, 1);
            return true; // Reserva eliminada con éxito
        }
        return false; // No se encontró la reserva con ese id
    }
}
