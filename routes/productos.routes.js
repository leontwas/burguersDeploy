import ProductosControllers from '../controllers/productos.controllers.js';
import Routes from './Routes.js';
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
        .get('/nombre', this.controller.getProductosByNombre)
        .get('/id', this.controller.getProductoById)
        .get('/descripcion', this.controller.getProductosByDescripcion)
        .post('/', this.controller.createProducto)
        .put('/updProd:id', this.controller.updateProducto)
        .delete('/id', this.controller.deleteProducto)     
    }
}
