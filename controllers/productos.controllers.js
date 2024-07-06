import productosMock from '../db/mocks/productos.mock.js';
import ProductosHelpers from '../helpers/productos.helpers.js';

export default class ProductosControllers {

    constructor() {
        this.productos = productosMock;
        this.helpers = new ProductosHelpers();
    }

    getAllProductos = (req, res) => {
        res.json(this.productos);
    }

    getProductoById = (req, res) => {
        const { id } = req.params;
        const producto = this.productos.find(producto => producto.producto_id === parseInt(id));
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    }

    getProductosByNombre = (req, res) => {
        const { nombre } = req.params;
        const productos = this.productos.filter(producto => producto.nombre.toLowerCase().includes(nombre.toLowerCase()));
        if (productos.length > 0) {
            res.json(productos);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    }

    getProductosByDescripcion = (req, res) => {
        const { descripcion } = req.params;
        const productos = this.productos.filter(producto => producto.descripcion.toLowerCase().includes(descripcion.toLowerCase()));
        if (productos.length > 0) {
            res.json(productos);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    }

    createProducto = (req, res) => {
        console.log(req.body.producto_id, req.body.nombre, req.body.descripcion, req.body.precio, req.body.stock);
        const producto = this.helpers.parseProducto(req.body);
        this.productos.push(producto);
        res.send('Producto creado exitosamente');
    } 

    updateProducto = (req, res) => {
        const { id } = req.params;
        const productoIndex = this.productos.findIndex(producto => producto.producto_id === parseInt(id));
        if (productoIndex !== -1) {
            const updatedProducto = this.helpers.parseProducto(req.body);
            this.productos[productoIndex] = { ...this.productos[productoIndex], ...updatedProducto };
            res.send('Producto actualizado exitosamente');
        } else {
            res.status(404).send('Producto no encontrado');
        }
    }

    deleteProducto = (req, res) => {
        const { id } = req.params;
        this.productos = this.productos.filter(producto => producto.producto_id !== parseInt(id));
        res.send('Producto eliminado exitosamente');
    }
}
