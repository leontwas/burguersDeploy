-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-07-2024 a las 02:32:54
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hamburgueseria`
--
CREATE DATABASE IF NOT EXISTS `hamburgueseria` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `hamburgueseria`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `cliente_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`cliente_id`, `nombre`, `apellido`, `direccion`, `telefono`, `email`) VALUES
(1, 'Juan', 'Pérez', 'Av. Córdoba 6123 PB 3', '555-1234', 'juan.perez@example.com'),
(2, 'María', 'González', 'Cabildo 232 CABA', '555-5678', 'maria.gonzalez@example.com'),
(3, 'Carlos', 'López', 'Esmeralda 234 San Martín Bs As', '555-9012', 'carlos.lopez@example.com'),
(4, 'Leonardo', 'Lipiejko', 'Santos Dumont 3310', '1121566870', 'leonardo_dl@hotmail.com'),
(5, 'Ana', 'Martínez', 'Calle 34 y 135 Berazategui Bs As', '555-3456', 'ana.martinez@example.com'),
(6, 'Sebastian', 'Toledo', 'Fitz Roy 3453, CABA', '1123546422', 'sebarecio@gmail.com'),
(7, 'Maria', 'Lopez', 'Av. Corrientes 1234, CABA', '1134567890', 'maria.lopez@example.com'),
(8, 'Carlos', 'Gomez', 'Santa Fe 5678, CABA', '1145678901', 'carlos.gomez@example.com'),
(9, 'Lucia', 'Martinez', 'Av. Libertador 8765, CABA', '1156789012', 'lucia.martinez@example.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesas`
--

CREATE TABLE `mesas` (
  `mesa_id` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `capacidad` int(11) NOT NULL,
  `disponible` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mesas`
--

INSERT INTO `mesas` (`mesa_id`, `numero`, `capacidad`, `disponible`) VALUES
(1, 1, 4, 1),
(2, 2, 2, 1),
(3, 3, 6, 0),
(4, 4, 8, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `producto_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`producto_id`, `nombre`, `descripcion`, `precio`, `stock`) VALUES
(1, 'Classic Beef Burger', 'Beef burger with lettuce, tomato, and special sauce', 8.99, 50),
(2, 'BBQ Cheeseburger', 'Beef burger with cheddar cheese, caramelized onions, and BBQ sauce', 9.99, 40),
(3, 'Vegetarian Falafel Burger', 'Falafel burger with lettuce, tomato, and avocado mayo', 7.99, 30),
(4, 'Double Cheeseburger', 'Double beef burger with Swiss cheese and special sauce', 10.99, 35);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `reserva_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `mesa_id` int(11) NOT NULL,
  `fecha_reserva` datetime NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`reserva_id`, `cliente_id`, `mesa_id`, `fecha_reserva`, `estado`) VALUES
(1, 6, 1, '2024-07-07 21:29:02', 1),
(2, 5, 2, '2024-07-07 21:29:02', 1),
(3, 4, 3, '2024-07-07 21:29:02', 1),
(4, 3, 4, '2024-07-07 21:29:02', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`cliente_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `mesas`
--
ALTER TABLE `mesas`
  ADD PRIMARY KEY (`mesa_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`producto_id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`reserva_id`),
  ADD KEY `cliente_id` (`cliente_id`),
  ADD KEY `mesa_id` (`mesa_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `cliente_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `mesas`
--
ALTER TABLE `mesas`
  MODIFY `mesa_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `producto_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `reserva_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`cliente_id`),
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`mesa_id`) REFERENCES `mesas` (`mesa_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
