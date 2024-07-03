import express from 'express';
import ReservasRoutes from '../routes/reservas.routes.js';

export default class Server {
    static app = express();

    static routes() {
        const reservas = new ReservasRoutes();
        Server.app.use('/reservas', reservas.router);
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

