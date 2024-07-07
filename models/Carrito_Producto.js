export default class Carrito_Producto {
    constructor(carrito_producto_id = null, carrito_id = null, producto_id = null, cantidad) {
        this.carrito_producto_id = carrito_producto_id;
        this.carrito_id = carrito_id;
        this.producto_id = producto_id;
        this.cantidad = cantidad;
    }
}