import MesasMysqlControllers from '../controllers/mesas.mysql.controllers.js';
import Routes from './Routes.js';
import { Router } from 'express';

export default class MesasRoutes extends Routes {
    constructor() {
        super();
        this.router = Router();
        this.controller = new MesasMysqlControllers();
        this.getRoutes();
    }

    getRoutes() {
        this.router
        .get('/', this.controller.getAllMesas)
        .get('/id', this.controller.getMesaById)
        .post('/', this.controller.addMesa)
        .put('/id', this.controller.updateMesa)
        .delete('/id', this.controller.deleteMesa)
    }
}
