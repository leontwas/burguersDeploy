export default class Producto {
    constructor(producto_id = null, nombre, descripcion, precio, stock) {
        this.producto_id = producto_id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
      }
    }