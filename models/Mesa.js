export default class Mesa {
    constructor(mesa_id = null, numero, capacidad, disponible = true) {
      this.mesa_id = mesa_id;
      this.numero = numero;
      this.capacidad = capacidad;
      this.disponible = disponible;
    }
}
