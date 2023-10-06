-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 30-Set-2023 às 00:30
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `backend`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `cpf` text NOT NULL,
  `firebase_uid` text NOT NULL,
  `firebase_provider` text NOT NULL,
  `premium_level` int(11) NOT NULL,
  `premium_time` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `collections`
--

CREATE TABLE `collections` (
  `id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `styles` int(11) NOT NULL,
  `project` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `upload_time` text NOT NULL,
  `views` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `collections_files`
--

CREATE TABLE `collections_files` (
  `collection_id` int(11) NOT NULL,
  `file_path` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `collections_likes`
--

CREATE TABLE `collections_likes` (
  `collection_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `collections_softwares`
--

CREATE TABLE `collections_softwares` (
  `collection_id` int(11) NOT NULL,
  `software_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `collection_details_projects`
--

CREATE TABLE `collection_details_projects` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `collection_details_projects`
--

INSERT INTO `collection_details_projects` (`id`, `name`) VALUES
(1, 'Comercial'),
(2, 'Corporativo'),
(3, 'Educacional'),
(4, 'Hospitalar'),
(5, 'Hotelaria'),
(6, 'Interiores'),
(7, 'Paisagismo'),
(8, 'Residencial'),
(9, 'Urbanismo');

-- --------------------------------------------------------

--
-- Estrutura da tabela `collection_details_softwares`
--

CREATE TABLE `collection_details_softwares` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `collection_details_softwares`
--

INSERT INTO `collection_details_softwares` (`id`, `name`) VALUES
(1, 'Adobe After Effects'),
(2, 'Adobe Illustrator'),
(3, 'Adobe InDesin'),
(4, 'Adobe Photoshop'),
(5, 'Archicad'),
(6, 'ARmedia'),
(7, 'AutoCAD'),
(8, 'CorelDRAW'),
(9, 'Corona'),
(10, 'Dynamo for Revit'),
(11, 'Grasshopper 3D for Rhinoceros'),
(12, 'Lumion'),
(13, 'Promob'),
(14, 'Revit'),
(15, 'Rhinocheros 3D'),
(16, 'SketchUp'),
(17, 'Unreal'),
(18, 'V-ray for SketchUp'),
(19, 'V-ray for 3DS MAX'),
(20, '3DS MAX');

-- --------------------------------------------------------

--
-- Estrutura da tabela `collection_details_styles`
--

CREATE TABLE `collection_details_styles` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `collection_details_styles`
--

INSERT INTO `collection_details_styles` (`id`, `name`) VALUES
(1, 'Clássico'),
(2, 'Moderno'),
(3, 'Contemporâneo');

-- --------------------------------------------------------

--
-- Estrutura da tabela `collection_details_types`
--

CREATE TABLE `collection_details_types` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `collection_details_types`
--

INSERT INTO `collection_details_types` (`id`, `name`) VALUES
(1, 'Arquitetônico'),
(2, 'Interiores'),
(3, 'Planta Baixa'),
(4, 'Layout'),
(5, 'Croqui');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cascade author id to collections` (`author_id`);

--
-- Índices para tabela `collections_files`
--
ALTER TABLE `collections_files`
  ADD KEY `cascade collection id to collection_files` (`collection_id`);

--
-- Índices para tabela `collections_likes`
--
ALTER TABLE `collections_likes`
  ADD KEY `cascade collection id to collection_likes` (`collection_id`),
  ADD KEY `cascade account id to collection_likes` (`account_id`);

--
-- Índices para tabela `collections_softwares`
--
ALTER TABLE `collections_softwares`
  ADD KEY `cascade collection id to collection_softwares` (`collection_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `collections`
--
ALTER TABLE `collections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `collections`
--
ALTER TABLE `collections`
  ADD CONSTRAINT `cascade author id to collections` FOREIGN KEY (`author_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `collections_files`
--
ALTER TABLE `collections_files`
  ADD CONSTRAINT `cascade collection id to collection_files` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `collections_likes`
--
ALTER TABLE `collections_likes`
  ADD CONSTRAINT `cascade account id to collection_likes` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cascade collection id to collection_likes` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `collections_softwares`
--
ALTER TABLE `collections_softwares`
  ADD CONSTRAINT `cascade collection id to collection_softwares` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
