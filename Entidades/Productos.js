export default class Productos {
    constructor() {
        this.productos = [];
        this.nextId = 1; // Inicializamos el contador para generar ids únicos
    }

    // Método para crear un nuevo producto
    crearProducto(nombre, precio) {
        const id = this.nextId++;
        const producto = { id, nombre, precio };
        this.productos.push(producto);
        return producto;
    }

    // Método para modificar un producto por su id
    modificarProducto(id, nombre, precio) {
        const productoIndex = this.productos.findIndex(producto => producto.id === id);
        if (productoIndex !== -1) {
            this.productos[productoIndex].nombre = nombre;
            this.productos[productoIndex].precio = precio;
            return this.productos[productoIndex];
        }
        return null; // Si no se encuentra el producto
    }

    // Método para buscar un producto por su id
    buscarPorId(id) {
        return this.productos.find(producto => producto.id === id);
    }

    // Método para buscar productos por su nombre (búsqueda parcial y case insensitive)
    buscarPorNombre(nombre) {
        return this.productos.filter(producto => producto.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }

    // Método para eliminar un producto por su id
    eliminarPorId(id) {
        const index = this.productos.findIndex(producto => producto.id === id);
        if (index !== -1) {
            this.productos.splice(index, 1);
            return true; // Producto eliminado con éxito
        }
        return false; // No se encontró el producto con ese id
    }
}
