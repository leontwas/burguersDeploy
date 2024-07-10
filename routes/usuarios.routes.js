import UsuariosControllers from '../controllers/usuarios.controllers.js';
import Routes from './Routes.js';
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
            .get('/nombre', this.controller.getUsuariosByEmail)
            .post('/', this.controller.createUsuarios)
            .put('/id', this.controller.updateUsuarios)
            .delete('/id', this.controller.deleteUsuarios)      
    }
}