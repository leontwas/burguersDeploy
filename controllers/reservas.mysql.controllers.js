import connection from '../db/connection';  
import ReservasHelpers from '../helpers/reservas.helpers.js';

export default class ReservasMySQLControllers {

    constructor() {
        this.helpers = new ReservasHelpers();
    }

    getAllReservas = (req, res) => {
        const query = 'SELECT * FROM reservas';

        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error al obtener todas las reservas en MySQL:', error);
                res.status(500).json({ message: 'Error interno al obtener todas las reservas' });
                return;
            }
            res.json(results);
        });
    }

    getReservaById = (req, res) => {
        const { id } = req.params;
        const query = 'SELECT * FROM reservas WHERE reserva_id = ?';

        connection.query(query, [id], (error, results) => {
            if (error) {
                console.error('Error al obtener la reserva por ID en MySQL:', error);
                res.status(500).json({ message: 'Error interno al obtener la reserva por ID' });
                return;
            }
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ message: 'Reserva no encontrada' });
            }
        });
    }

    createReserva = (req, res) => {
        const nuevaReserva = this.helpers.parseReserva(req.body);
        const query = 'INSERT INTO reservas SET ?';

        connection.query(query, nuevaReserva, (error, results) => {
            if (error) {
                console.error('Error al crear reserva en MySQL:', error);
                res.status(500).json({ message: 'Error interno al crear reserva' });
                return;
            }
            res.status(201).json({ message: 'Reserva creada exitosamente', reserva_id: results.insertId });
        });
    }

    updateReserva = (req, res) => {
        const { id } = req.params;
        const updatedReserva = this.helpers.parseReserva(req.body);
        const query = 'UPDATE reservas SET ? WHERE reserva_id = ?';

        connection.query(query, [updatedReserva, id], (error, results) => {
            if (error) {
                console.error('Error al actualizar reserva en MySQL:', error);
                res.status(500).json({ message: 'Error interno al actualizar reserva' });
                return;
            }
            if (results.affectedRows > 0) {
                res.status(200).json({ message: 'Reserva actualizada exitosamente' });
            } else {
                res.status(404).json({ message: 'Reserva no encontrada' });
            }
        });
    }

    deleteReserva = (req, res) => {
        const { id } = req.params;
        const query = 'DELETE FROM reservas WHERE reserva_id = ?';

        connection.query(query, [id], (error, results) => {
            if (error) {
                console.error('Error al eliminar reserva en MySQL:', error);
                res.status(500).json({ message: 'Error interno al eliminar reserva' });
                return;
            }
            if (results.affectedRows > 0) {
                res.status(200).json({ message: 'Reserva eliminada exitosamente' });
            } else {
                res.status(404).json({ message: 'Reserva no encontrada' });
            }
        });
    }

    buscarReservaPorApellido = (req, res) => {
        const { apellido } = req.query;
        const query = 'SELECT * FROM reservas WHERE apellido LIKE ?';

        connection.query(query, [`%${apellido}%`], (error, results) => {
            if (error) {
                console.error('Error al buscar reserva por apellido en MySQL:', error);
                res.status(500).json({ message: 'Error interno al buscar reserva por apellido' });
                return;
            }
            res.status(200).json(results);
        });
    }

    buscarReservaPorEmail = (req, res) => {
        const { email } = req.query;
        const query = 'SELECT * FROM reservas WHERE email = ?';

        connection.query(query, [email], (error, results) => {
            if (error) {
                console.error('Error al buscar reserva por email en MySQL:', error);
                res.status(500).json({ message: 'Error interno al buscar reserva por email' });
                return;
            }
            res.status(200).json(results);
        });
    }

    buscarReservaPorFecha = (req, res) => {
        const { fecha } = req.query;
        const query = 'SELECT * FROM reservas WHERE fecha = ?';

        connection.query(query, [fecha], (error, results) => {
            if (error) {
                console.error('Error al buscar reserva por fecha en MySQL:', error);
                res.status(500).json({ message: 'Error interno al buscar reserva por fecha' });
                return;
            }
            res.status(200).json(results);
        });
    }
}
