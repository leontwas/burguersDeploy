export default class Reserva {
  constructor(reserva_id = null, cliente_id = null, mesa_id = null, fecha_reserva, estado = true) {
    this.reserva_id = reserva_id;
    this.cliente_id = cliente_id;
    this.mesa_id = mesa_id;
    this.fecha_reserva = fecha_reserva;
    this.estado = estado;
  }
}
