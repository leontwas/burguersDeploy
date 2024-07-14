import Server from "./server/Server.js";
import Mysql from "./db/connection/Mysql.js";

Server.run(process.env.PORT || 8080);

const db = new Mysql();