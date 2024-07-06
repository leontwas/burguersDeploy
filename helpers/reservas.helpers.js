import Reservas from '../models/Reserva.js';

export default class ReservasHelpers {
  parseReserva(datosReserva) {
    const { nombre, apellido, telefono, email, fecha, comensales, menores } = datosReserva;

    // Puedes implementar lógica adicional aquí, como validar datos o ajustar valores antes de crear la reserva

    // Crear una instancia de Reserva
    const nuevaReserva = new Reservas(null, nombre, apellido, telefono, email, fecha, comensales, menores);

    return nuevaReserva;
}
}