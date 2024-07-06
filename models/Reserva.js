export default class Reserva {
  constructor(cliente_id, nombre, apellido, telefono, email, fecha, comensales, menores) {
    this.cliente_id = cliente_id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.email = email;
    this.fecha = fecha;
    this.comensales = comensales;
    this.menores = menores;
    this.estado = 'Pendiente'; // Estado por defecto al crear la reserva
}
}