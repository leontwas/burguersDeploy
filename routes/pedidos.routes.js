import PedidosControllers from '../controllers/pedidos.controllers.js';
import Routes from './routes.js';
import { Router } from 'express';

export default class PedidosRoutes extends Routes {
    constructor() {
        super();
        this.router = Router();
        this.controller = new PedidosControllers();
        this.getRoutes();
    }

    getRoutes() {
        this.router
        .get('/', this.controller.getAllPedidos)
        .post('/', this.controller.createPedidos)
        .put('/', this.controller.updatePedidos)
        .delete('/', this.controller.deletePedidos)
       
    }
}
