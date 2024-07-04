import express from 'express';
import ReservasRoutes from '../routes/reservas.routes.js';
import ProductosRoutes from '../routes/productos.routes.js';
import UsuariosRoutes from '../routes/usuarios.routes.js';
import PedidosRoutes from '../routes/pedidos.routes.js';

export default class Server {
    static app = express();

    static routes() {
        const reservas = new ReservasRoutes();
        const productos = new ProductosRoutes();
        const usuarios = new UsuariosRoutes();
        const pedidos = new PedidosRoutes();
        Server.app.use('/reservas', reservas.router);
        Server.app.use('/productos', productos.router);
        Server.app.use('/usuarios', usuarios.router);
        Server.app.use('/pedidos', pedidos.router);

        Server.app.get('/', (req, res) => {
            res.send('Hola');
        });
    }

    static runServer(port) {
        Server.app.listen(port, () =>
            console.log(`Escuchando en http://localhost:${port}`)
        );
    }

    static run(port) {
        console.clear();
        Server.routes();
        Server.runServer(port);
    }
}

