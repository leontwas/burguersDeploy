import express from 'express';
import ReservasRoutes from '../routes/reservas.routes.js';
import ProductosRoutes from '../routes/productos.routes.js';
import UsuariosRoutes from '../routes/usuarios.routes.js';
import PedidosRoutes from '../routes/pedidos.routes.js';

export default class Server {
    static app = express();

    static middlewares(){
        Server.app.use(express.json())
        Server.app.use(express.urlencoded({ extended: true }))
    }

    static routes() {
        const reservas = new ReservasRoutes();
        const productos = new ProductosRoutes();
        const usuarios = new UsuariosRoutes();
        const pedidos = new PedidosRoutes();
        Server.app.use('/reservas', reservas.router);
        Server.app.use('/productos', productos.router);
        Server.app.use('/usuarios', usuarios.router);
        Server.app.use('/pedidos', pedidos.router);
    }

    static runServer(port) {
        Server.app.listen(port, () =>
            console.log(`Escuchando en http://localhost:${port}`)
        );
    }

    static run(port) {
        console.clear();
        Server.middlewares();
        Server.routes();
        Server.runServer(port);
    }
}

