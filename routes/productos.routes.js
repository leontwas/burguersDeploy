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
        .post('/', this.controller.createProductos)
        .put('/', this.controller.updateProductos)
        .delete('/', this.controller.deleteProductos)
       
    }
}
