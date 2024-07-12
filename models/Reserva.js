export default class Reserva {
  constructor(reserva_id, cliente_id, mesa_id, fecha_reserva, estado) {
    this.reserva_id = reserva_id;
    this.cliente_id = cliente_id;
    this.mesa_id = mesa_id;
    this.fecha_reserva = fecha_reserva;
    this.estado = estado;
  }
}
