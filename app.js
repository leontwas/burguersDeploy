import Server from './server/Server.js';
import Mysql from './db/connection/Mysql.js';

const startServer = async () => {
    try {
        const db = new Mysql();

        const connection = await db.getConnection();
        console.log('Conectado a la Base de Datos MySQL');

        connection.release();

        const PORT = process.env.PORT || 3000;
        const server = new Server(PORT);
        await server.run();
    } catch (err) {
        console.error('No se pudo conectar a la Base de Datos:', err);
        process.exit(1); 
    }
};

startServer();
