import ProductsControllers from "../../controllers/products.controllers.js";
import Routes from "./Routes.js";

export default class ProductsRoutes extends Routes {
    constructor() {
        super();
        this.controller = new ProductsControllers();
        this.initializeRoutes(); 
    }

    initializeRoutes() {
        this.router
        .get('/', this.controller.getAllProducts.bind(this.controller))
        .get('/product', this.controller.getProductsByNombre.bind(this.controller))
        .get('/:id', this.controller.getProductsById.bind(this.controller))
        .post('/', this.controller.createProducts.bind(this.controller))
        .put('/:id', this.controller.updateProducts.bind(this.controller))
        .delete('/:id', this.controller.deleteProducts.bind(this.controller));
    }
}

