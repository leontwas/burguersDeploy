import ClientesControllers from '../controllers/clientes.controllers.js';
import Routes from './routes.js';
import { Router } from 'express';


export default class ClientesRoutes extends Routes {
    constructor() {
        super();
        this.router = Router();
        this.controller = new ClientesControllers();
        this.getRoutes();
    }

    getRoutes() {
        this.router
            .get('/', this.controller.getAllClientes)
            .get('/id', this.controller.getClienteById)
            .post('/', this.controller.createCliente)
            .put('/', this.controller.updateCliente)
            .delete('/', this.controller.deleteCliente)      
    }
}