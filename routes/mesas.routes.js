import MesasControllers from '../controllers/mesas.controllers.js';
import Routes from './routes.js';
import { Router } from 'express';

export default class MesasRoutes extends Routes {
    constructor() {
        super();
        this.router = Router();
        this.controller = new MesasControllers();
        this.getRoutes();
    }

    getRoutes() {
        this.router
        .get('/', this.controller.getAllMesas)
        .get('/id', this.controller.getMesaById)
        .post('/', this.controller.createMesa)
        .put('/id', this.controller.updateMesa)
        .delete('/id', this.controller.deleteMesa)
    }
}
