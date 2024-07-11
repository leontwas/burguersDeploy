import express from 'express';
import ReservasRoutes from '../routes/reservas.routes.js';
import ProductosRoutes from '../routes/productos.routes.js';
import ClientesRoutes from '../routes/clientes.routes.js';
import MesasRoutes from '../routes/mesas.routes.js';

export default class Server {
    static app = express();

    static middlewares(){
        Server.app.use(express.json())
        Server.app.use(express.urlencoded({ extended: true }))
        Server.app.use(cors())
    }

                                                                                                                                                                                                                                                                                                                                                                                                                                    
    static runServer(port) {
        Server.app.listen(port, () =>
            console.log(`Escuchando en http://localhost:${port}`)
        );
    }

    static routes() {
        const reservas = new ReservasRoutes();
        const productos = new ProductosRoutes();
        const clientes = new ClientesRoutes();
        const mesas = new MesasRoutes();
        Server.app.use('/reservas', reservas.router);
        Server.app.use('/productos', productos.router);
        Server.app.use('/clientes', clientes.router);
        Server.app.use('/mesas', mesas.router);
    }

    static run(port) {
        console.clear();
        Server.middlewares();
        Server.routes();
        Server.runServer(port);
    }
}

