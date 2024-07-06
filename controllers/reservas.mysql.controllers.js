import Reserva from '../models/Reserva.js';

export default class ReservasMySQLControllers {

  constructor() {
  }

  crearReserva = (req, res) => {
    const { nombre, apellido, telefono, email, fecha, comensales, menores } = req.body;
    const nuevaReserva = new Reserva(null, nombre, apellido, telefono, email, fecha, comensales, menores); // cliente_id será generado automáticamente por la base de datos
    const query = 'INSERT INTO reservas SET ?';

    connection.query(query, nuevaReserva, (error, results) => {
      if (error) {
        console.error('Error al crear reserva en MySQL:', error);
        res.status(500).json({ message: 'Error al crear reserva' });
        return;
      }

      nuevaReserva.cliente_id = results.insertId;
      res.status(201).json(nuevaReserva);
    });
  };

  modificarReserva = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, email, fecha, comensales, menores } = req.body;
    const query = 'UPDATE reservas SET nombre=?, apellido=?, telefono=?, email=?, fecha=?, comensales=?, menores=? WHERE cliente_id=?';
    const values = [nombre, apellido, telefono, email, fecha, comensales, menores, id];

    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error al modificar reserva en MySQL:', error);
        res.status(500).json({ message: 'Error al modificar reserva' });
        return;
      }

      if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Reserva no encontrada' });
      } else {
        res.status(200).json({ message: 'Reserva modificada' });
      }
    });
  };

  eliminarReserva = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM reservas WHERE cliente_id=?';

    connection.query(query, id, (error, results) => {
      if (error) {
        console.error('Error al eliminar reserva en MySQL:', error);
        res.status(500).json({ message: 'Error al eliminar reserva' });
        return;
      }

      if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Reserva no encontrada' });
      } else {
        res.status(200).json({ message: 'Reserva eliminada' });
      }
    });
  };

  buscarReservaPorApellido = (req, res) => {
    const { apellido } = req.query;
    const query = 'SELECT * FROM reservas WHERE LOWER(apellido) LIKE ?';
    const searchTerm = `%${apellido.toLowerCase()}%`;

    connection.query(query, searchTerm, (error, results) => {
      if (error) {
        console.error('Error al buscar reservas por apellido en MySQL:', error);
        res.status(500).json({ message: 'Error al buscar reservas' });
        return;
      }

      res.status(200).json(results);
    });
  };

  buscarReservaPorEmail = (req, res) => {
    const { email } = req.query;
    const query = 'SELECT * FROM reservas WHERE LOWER(email) = ?';

    connection.query(query, email.toLowerCase(), (error, results) => {
      if (error) {
        console.error('Error al buscar reservas por email en MySQL:', error);
        res.status(500).json({ message: 'Error al buscar reservas' });
        return;
      }

      res.status(200).json(results);
    });
  };

  buscarReservaPorFecha = (req, res) => {
    const { fecha } = req.query;
    const query = 'SELECT * FROM reservas WHERE fecha = ?';

    connection.query(query, fecha, (error, results) => {
      if (error) {
        console.error('Error al buscar reservas por fecha en MySQL:', error);
        res.status(500).json({ message: 'Error al buscar reservas' });
        return;
      }

      res.status(200).json(results);
    });
  };
}
