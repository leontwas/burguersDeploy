import reservasMock from '../db/mocks/reservas.mock.js';
import ReservasHelpers from '../helpers/reservas.helpers.js';

let reservas = reservasMock; 

export default class ReservasControllers {

    constructor() {
        this.helpers = new ReservasHelpers();
    }

    getAllReservas = (req, res) => {
        try {
            res.json(reservas);
        } catch (error) {
            console.error('Error al obtener todas las reservas:', error);
            res.status(500).json({ message: 'Error interno al obtener todas las reservas' });
        }
    }

    getReservaById = (req, res) => {
        try {
            const { id } = req.params;
            const reserva = reservas.find(r => r.reserva_id === parseInt(id));
            if (reserva) {
                res.status(200).json(reserva);
            } else {
                res.status(404).json({ message: 'Reserva no encontrada' });
            }
        } catch (error) {
            console.error('Error al obtener la reserva por ID:', error);
            res.status(500).json({ message: 'Error interno al obtener la reserva por ID' });
        }
    }

    createReserva = (req, res) => {
        try {
            const nuevaReserva = this.helpers.parseReserva(req.body);
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
            const reservaIndex = reservas.findIndex(r => r.reserva_id === parseInt(id));
            if (reservaIndex !== -1) {
                const updatedReserva = this.helpers.parseReserva(req.body);
                reservas[reservaIndex] = { ...reservas[reservaIndex], ...updatedReserva };
                res.status(200).json({ message: 'Reserva actualizada exitosamente' });
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
            reservas = reservas.filter(r => r.reserva_id !== parseInt(id));
            res.status(200).json({ message: 'Reserva eliminada exitosamente' });
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
