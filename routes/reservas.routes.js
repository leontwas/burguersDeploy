import Routes from './routes.js';
import { Router } from 'express';

export default class ReservasRoutes extends Routes {
    constructor() {
        super();
        this.router = Router();
        this.getRoutes();
    }

    getRoutes() {
        this.router.get('/', (req, res) => {
            res.send('get reservas');
        });

        // Agrega más rutas según sea necesario
    }
}
