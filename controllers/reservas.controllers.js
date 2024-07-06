import reservasMock from '../db/mocks/reservas.mock.js'
import ReservasHelpers from '../helpers/reservas.helpers.js'
import Reserva from '../models/Reserva.js';

export default class ReservasControllers {

    constructor() {
        this.reservas = reservasMock
        this.helpers = new ReservasHelpers()
    }

 crearReserva = (req, res) => {
  const { cliente_id, nombre, apellido, telefono, email, fecha, comensales, menores } = req.body;
  const nuevaReserva = new Reserva(cliente_id, nombre, apellido, telefono, email, fecha, comensales, menores);
  reservas.push(nuevaReserva);
  res.status(201).json(nuevaReserva);
};

modificarReserva = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, telefono, email, fecha, comensales, menores } = req.body;
  const reserva = reservas.find(r => r.cliente_id === id);
  if (reserva) {
    reserva.nombre = nombre;
    reserva.apellido = apellido;
    reserva.telefono = telefono;
    reserva.email = email;
    reserva.fecha = fecha;
    reserva.comensales = comensales;
    reserva.menores = menores;
    res.status(200).json(reserva);
  } else {
    res.status(404).json({ message: 'Reserva no encontrada' });
  }
};

eliminarReserva = (req, res) => {
  const { id } = req.params;
  reservas = reservas.filter(r => r.cliente_id !== id);
  res.status(200).json({ message: 'Reserva eliminada' });
};

buscarReservaPorApellido = (req, res) => {
  const { apellido } = req.query;
  const resultado = reservas.filter(r => r.apellido.toLowerCase().includes(apellido.toLowerCase()));
  res.status(200).json(resultado);
};

buscarReservaPorEmail = (req, res) => {
  const { email } = req.query;
  const resultado = reservas.filter(r => r.email.toLowerCase() === email.toLowerCase());
  res.status(200).json(resultado);
};

buscarReservaPorFecha = (req, res) => {
  const { fecha } = req.query;
  const resultado = reservas.filter(r => r.fecha === fecha);
  res.status(200).json(resultado);
};

}