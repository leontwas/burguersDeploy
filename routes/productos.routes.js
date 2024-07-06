import ProductosControllers from '../controllers/productos.controllers.js';
import Routes from './routes.js';
import { Router } from 'express';

export default class ProductosRoutes extends Routes {
    constructor() {
        super();
        this.router = Router();
        this.controller = new ProductosControllers();
        this.getRoutes();
    }

    getRoutes() {
        this.router
        .get('/', this.controller.getAllProductos)
        .get('/descripcion', this.controller.getProductosByDescripcion)
        .get('/nombre', this.controller.getProductosByNombre)
        .post('/', this.controller.createProducto)
        .put('/id', this.controller.updateProducto)
        .delete('/id', this.controller.deleteProducto)     
    }
}
