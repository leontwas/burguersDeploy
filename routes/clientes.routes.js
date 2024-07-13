import ClientesControllers from '../controllers/clientes.controllers.js';
import Routes from '../routes/Routes.js';
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
            .get('/:id', this.controller.getClienteById)
            .get('/apellido', this.controller.getClientesByApellido)
            .get('/email', this.controller.getClientesByEmail)
            .post('/', this.controller.createCliente)
            .put('/:id', this.controller.updateCliente)
            .delete('/:id', this.controller.deleteCliente)      
    }
}