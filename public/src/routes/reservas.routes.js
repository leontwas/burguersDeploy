import ReservaControllers from "../controllers/reserva.controllers.js";
import Routes from "./Routes.js";

export default class ReservaRoutes extends Routes {
    constructor() {
        super();
        this.controller = new ReservaControllers();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router
            .get('/', this.controller.getAllReservas.bind(this.controller))
            .get('/apellido', this.controller.getReservasByApellido.bind(this.controller))
            .get('/:id', this.controller.getReservasById.bind(this.controller))
            .post('/reservar', reservasController.crearReserva)
            .post('/', this.controller.createReservas.bind(this.controller))
            .put('/:id', this.controller.updateReservas.bind(this.controller))
            .delete('/:id', this.controller.deleteReservas.bind(this.controller));
    }
}


