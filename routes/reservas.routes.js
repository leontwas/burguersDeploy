import ReservasControllers from '../controllers/reservas.controllers.js'
import Routes from './Routes.js';
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
            .get('/:id', this.controller.getReservaById) 
            .get('/apellido', this.controller.buscarReservaPorApellido)
            .get('/email', this.controller.buscarReservaPorEmail)
            .get('/fecha', this.controller.buscarReservaPorFecha)
            .post('/', this.controller.createReserva)
            .put('/:id', this.controller.updateReserva) 
            .delete('/:id', this.controller.deleteReserva); 
    }  
}

