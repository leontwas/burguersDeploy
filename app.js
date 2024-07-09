import Server from "./server/Server.js";
import Mysql from "./db/connection/Mysql.js";


Server.run(process.env.PORT || 3000);

const db = new Mysql();

import Mysql from './Mysql.js';

(async () => {
    try {
        const db = new Mysql();
        const connection = await db.getConnection();
        console.log('Conectado a la Base de Datos MySQL');

        connection.release();
    } catch (err) {
        console.error('No se pudo conectar a la Base de Datos:', err);
    }
})();

