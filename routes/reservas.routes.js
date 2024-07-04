import ReservasControllers from '../controllers/reservas.controllers.js'
import Routes from './routes.js';
import { Router } from 'express';

export default class ReservasRoutes extends Routes {
    constructor() {
        super();
        this.router = Router();
        this.controller = new ReservasControllers();
        this.getRoutes();
    }

    getRoutes() {
        this.router
        .get('/', this.controller.getAllReservas)
        .post('/', this.controller.createReservas)
        .put('/', this.controller.updateReservas)
        .delete('/', this.controller.deleteReservas)      
    }
}
