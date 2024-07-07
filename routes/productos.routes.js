import ProductosMysqlControllers from '../controllers/productos.mysql.controllers.js';
import Routes from './routes.js';
import { Router } from 'express';

export default class ProductosRoutes extends Routes {
    constructor() {
        super();
        this.router = Router();
        this.controller = new ProductosMysqlControllers();
        this.getRoutes();
    }

    getRoutes() {
        this.router
        .get('/', this.controller.getAllProductos)
        .get('/nombre', this.controller.getProductosByNombre)
        .get('/id', this.controller.getProductoById)
        .post('/', this.controller.addProducto)
        .put('/id', this.controller.updateProducto)
        .delete('/id', this.controller.deleteProducto)     
    }
}
