export default class Compra {
    constructor(compra_id, carrito_id, cliente_id, fecha_compra, total) {
        this.compra_id = compra_id;
        this.carrito_id = carrito_id;
        this.cliente_id = cliente_id;
        this.fecha_compra = fecha_compra;
        this.total = total;
    }
}
