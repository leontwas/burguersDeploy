import Server from "./server/Server.js";
import Mysql from "./db/connection/Mysql.js";

Server.run(process.env.PORT || 3000);

const db = new Mysql();

