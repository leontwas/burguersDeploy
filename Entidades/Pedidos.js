import Precios from './Precios.js';

export default class Pedidos {
    constructor() {
        this.productos = [];
        this.nextId = 1; // Inicializamos el contador para generar ids únicos
    }

    // Método para agregar un producto al pedido
    agregarProducto(producto) {
        producto.id = this.nextId++; // Generamos un id único para el producto
        this.productos.push(producto);
    }

    // Método para eliminar un producto del pedido por su nombre
    eliminarProducto(nombre) {
        this.productos = this.productos.filter(producto => producto.nombre !== nombre);
    }

    // Método para mostrar el detalle del pedido
    mostrarDetalle() {
        const precio = new Precios(this.productos);
        precio.detallePedido();
    }

    // Método para obtener el precio total del pedido
    obtenerTotal() {
        const precio = new Precios(this.productos);
        return precio.calcularTotal();
    }
}