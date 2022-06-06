-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 05-06-2022 a las 20:36:56
-- Versión del servidor: 5.6.51-cll-lve
-- Versión de PHP: 7.3.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `miprueba_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `files`
--

INSERT INTO `files` (`id`, `name`) VALUES
(1, '629d641d69ada0.60622051.png'),
(2, '629d6838dd5bd7.01065082.png'),
(3, '629d68873317e5.03468739.png'),
(4, '629d69b0892ea2.31659964.png'),
(5, '629d72c5494a34.55154170.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `priorities`
--

CREATE TABLE `priorities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `priorities`
--

INSERT INTO `priorities` (`id`, `name`) VALUES
(1, 'Baja'),
(2, 'Normal'),
(3, 'Alta'),
(4, 'Urgente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(1, 'Abierto'),
(2, 'Verificando'),
(3, 'Cerrado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `file_id` int(11) DEFAULT NULL,
  `status_id` int(11) NOT NULL,
  `priority_id` int(11) NOT NULL,
  `user_id` char(23) NOT NULL,
  `created_by` char(23) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `start_date`, `end_date`, `file_id`, `status_id`, `priority_id`, `user_id`, `created_by`, `created_date`) VALUES
(1, 'Prueba3', 'asfdasdfas asdfasdf', '0002-11-30', '0002-11-30', 2, 1, 2, '629cff2c927f15.98777514', '629cd5898adaf1.67769334', '2022-06-05 19:36:40'),
(2, 'Prueba 2', 'asdfasdfasdftgfaergver', '2022-06-05', '2022-06-06', 3, 1, 2, '629cff2c927f15.98777514', '629cd5898adaf1.67769334', '2022-06-05 19:37:59'),
(3, 'Prueba 1', 'gw54gbws55v asdvasdfg', '2022-06-06', '2022-06-07', 4, 1, 1, '629cff2c927f15.98777514', '629cd5898adaf1.67769334', '2022-06-05 19:42:56'),
(4, 'Prueba 4', 'asdofpjasdfas', '2022-06-08', '2022-06-09', 5, 2, 2, '629cd5898adaf1.67769334', '629cd5898adaf1.67769334', '2022-06-05 20:21:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` char(23) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
('629cd5898adaf1.67769334', 'Juan Carlos Echeverría Barrera', 'jhonsarq@gmail.com', '017c61c7ae8b3aa987217e63745072f1'),
('629cff2c927f15.98777514', 'Alex Amperez', 'miprueba@test.com', '25d55ad283aa400af464c76d713c07ad');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `priorities`
--
ALTER TABLE `priorities`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `priorities`
--
ALTER TABLE `priorities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
