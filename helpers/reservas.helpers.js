import Reservas from '../models/Reservas.js';

export default class ReservasHelpers {
    parseReservas(data) {
        console.log("Datos recibidos en parseReservas:", data); 
        if (!data || typeof data !== 'object') {
            throw new Error("Datos inválidos para parseReservas");
        }

        const { id, nombre, apellido, telefono, mail, fecha, comensales, menores } = data;
        console.log("Datos desestructurados en parseUsuarios:", id, nombre, apellido, telefono, mail, fecha, comensales, menores); 

        const reserva = new Reservas(parseInt(id), nombre, apellido, telefono, mail, parseDate(fecha), comensales, menores);
        console.log("Instancia de Usuarios en parseUsuarios:", reserva); 

        return reserva;
    }
}