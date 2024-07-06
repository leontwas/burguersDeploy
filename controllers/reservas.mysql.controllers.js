import { crearNuevaReserva } from '../helpers/reservas.helpers'; 

export default class ReservasMySQLControllers {

  constructor() {
  }

  crearReserva = (req, res) => {
    const { cliente_id, mesa_id, fecha_reserva, estado } = req.body; 
    const nuevaReserva = crearNuevaReserva({ cliente_id, mesa_id, fecha_reserva, estado });

    const query = 'INSERT INTO reservas SET ?';

    connection.query(query, nuevaReserva, (error, results) => {
      if (error) {
        console.error('Error al crear reserva en MySQL:', error);
        res.status(500).json({ message: 'Error al crear reserva' });
        return;
      }
      res.status(200).json({ message: 'Reserva creada exitosamente' });
    });
  }
}
