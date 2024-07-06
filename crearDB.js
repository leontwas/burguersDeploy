import Mysql from "../connection/Mysql";

const query = `
CREATE DATABASE IF NOT EXISTS Hamburgueseria;

USE Hamburgueseria;

CREATE TABLE IF NOT EXISTS Clientes (
    cliente_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    direccion VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Mesas (
    mesa_id INT PRIMARY KEY AUTO_INCREMENT,
    numero INT NOT NULL,
    capacidad INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Reservas (
    reserva_id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    mesa_id INT NOT NULL,
    fecha_reserva DATETIME NOT NULL,
    estado VARCHAR(50) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id),
    FOREIGN KEY (mesa_id) REFERENCES Mesas(mesa_id)
);

CREATE TABLE IF NOT EXISTS Productos (
    producto_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL
);
`;

async function crearBaseDeDatos() {
  let connection;
  try {
    connection = await Mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'your_password' // Reemplaza con tu contraseña de MySQL
    });

    console.log('Conectado a MySQL');
    await connection.query(query);
    console.log('Base de datos y tablas creadas exitosamente');
  } catch (err) {
    console.error('Error ejecutando la consulta:', err);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Conexión cerrada');
    }
  }
}

crearBaseDeDatos();
