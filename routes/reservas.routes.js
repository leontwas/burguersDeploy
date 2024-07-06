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
        .get('/', this.controller.buscarReservaPorApellido)
        .get('/', this.controller.buscarReservaPorEmail)
        .get('/', this.controller.buscarReservaPorFecha)
        .post('/', this.controller.createReserva)
        .put('/', this.controller.updateReserva)
        .delete('/', this.controller.deleteReserva)      
    }
}
