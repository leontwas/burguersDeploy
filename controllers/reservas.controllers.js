import reservasMock from '../db/mocks/reservas.mock.js';
import ReservasHelpers from '../helpers/reservas.helpers.js';
import Reserva from '../models/Reserva.js'; 

let reservas = reservasMock; 

export default class ReservasControllers {

    constructor() {
        this.helpers = new ReservasHelpers();
    }

    getAllReservas = (req, res) => {
        res.json(reservas);
    }

    getReservaById = (req, res) => {
        const { id } = req.params;
        const reserva = reservas.find(r => r.cliente_id === id);
        if (reserva) {
            res.status(200).json(reserva);
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
    }

    createReserva = (req, res) => {
        try {
            const { cliente_id, nombre, apellido, telefono, email, fecha, comensales, menores } = req.body;
            const nuevaReserva = new Reserva(cliente_id, nombre, apellido, telefono, email, fecha, comensales, menores);
            reservas.push(nuevaReserva);
            res.status(201).json(nuevaReserva);
        } catch (error) {
            console.error('Error al crear reserva:', error);
            res.status(500).json({ message: 'Error interno al crear reserva' });
        }
    }

    updateReserva = (req, res) => {
        try {
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
        } catch (error) {
            console.error('Error al actualizar reserva:', error);
            res.status(500).json({ message: 'Error interno al actualizar reserva' });
        }
    }

    deleteReserva = (req, res) => {
        try {
            const { id } = req.params;
            reservas = reservas.filter(r => r.cliente_id !== id);
            res.status(200).json({ message: 'Reserva eliminada' });
        } catch (error) {
            console.error('Error al eliminar reserva:', error);
            res.status(500).json({ message: 'Error interno al eliminar reserva' });
        }
    }

    buscarReservaPorApellido = (req, res) => {
        try {
            const { apellido } = req.query;
            const resultado = reservas.filter(r => r.apellido.toLowerCase().includes(apellido.toLowerCase()));
            res.status(200).json(resultado);
        } catch (error) {
            console.error('Error al buscar reserva por apellido:', error);
            res.status(500).json({ message: 'Error interno al buscar reserva por apellido' });
        }
    }

    buscarReservaPorEmail = (req, res) => {
        try {
            const { email } = req.query;
            const resultado = reservas.filter(r => r.email.toLowerCase() === email.toLowerCase());
            res.status(200).json(resultado);
        } catch (error) {
            console.error('Error al buscar reserva por email:', error);
            res.status(500).json({ message: 'Error interno al buscar reserva por email' });
        }
    }

    buscarReservaPorFecha = (req, res) => {
        try {
            const { fecha } = req.query;
            const resultado = reservas.filter(r => r.fecha === fecha);
            res.status(200).json(resultado);
        } catch (error) {
            console.error('Error al buscar reserva por fecha:', error);
            res.status(500).json({ message: 'Error interno al buscar reserva por fecha' });
        }
    }
}
