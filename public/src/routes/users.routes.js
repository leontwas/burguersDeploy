import UserControllers from "../controllers/user.controllers.js";
import Routes from "./Routes.js";

export default class UserRoutes extends Routes {
    constructor() {
        super();
        this.controller = new UserControllers();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router
            .get('/', this.controller.getAllUsers.bind(this.controller))
            .get('/user', this.controller.getUsersByNombre.bind(this.controller))
            .get('/:id', this.controller.getUsersById.bind(this.controller))
            .post('/', this.controller.createUsers.bind(this.controller))
            .put('/:id', this.controller.updateUsers.bind(this.controller))
            .delete('/:id', this.controller.deleteUsers.bind(this.controller));
    }
}
