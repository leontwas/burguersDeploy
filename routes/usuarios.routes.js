import UsuariosControllers from '../controllers/usuarios.controllers.js';
import Routes from './routes.js';
import { Router } from 'express';

export default class UsuariosRoutes extends Routes {
    constructor() {
        super();
        this.router = Router();
        this.controller = new UsuariosControllers();
        this.getRoutes();
    }

    getRoutes() {
        this.router
            .get('/', this.controller.getAllUsuarios)
            .get('/id', this.controller.getUsuarioById)
            .post('/', this.controller.createUsuarios)
            .put('/', this.controller.updateUsuarios)
            .delete('/', this.controller.deleteUsuarios)      
    }
}