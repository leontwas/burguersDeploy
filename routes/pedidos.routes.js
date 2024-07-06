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
        .put('/id', this.controller.updatePedidos)
        .delete('/id', this.controller.deletePedidos)
    }
}
