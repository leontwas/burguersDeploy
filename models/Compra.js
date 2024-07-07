export default class Compra {
    constructor(compra_id = null, carrito_id = null, cliente_id = null, fecha_compra, total) {
        this.compra_id = compra_id;
        this.carrito_id = carrito_id;
        this.cliente_id = cliente_id;
        this.fecha_compra = fecha_compra;
        this.total = total;
    }
}
