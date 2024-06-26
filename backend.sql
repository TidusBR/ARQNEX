-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 21-Nov-2023 às 18:15
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
  `premium_time` bigint(20) NOT NULL,
  `biography` text NOT NULL,
  `phone` text NOT NULL,
  `register_date` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `account_courses`
--

CREATE TABLE `account_courses` (
  `account_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `course` text NOT NULL,
  `institution` text NOT NULL,
  `workLoad` text NOT NULL,
  `conclusionYear` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `account_experiences`
--

CREATE TABLE `account_experiences` (
  `account_id` int(11) NOT NULL,
  `experience_id` int(11) NOT NULL,
  `role` text NOT NULL,
  `company` text NOT NULL,
  `companyPhone` text NOT NULL,
  `remuneration` text NOT NULL,
  `admissionDate` text NOT NULL,
  `departureDate` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `account_formation`
--

CREATE TABLE `account_formation` (
  `account_id` int(11) NOT NULL,
  `formation_id` int(11) NOT NULL,
  `education` text NOT NULL,
  `formation` text NOT NULL,
  `institution` text NOT NULL,
  `situation` text NOT NULL,
  `startYear` text NOT NULL,
  `endYear` text NOT NULL,
  `period` text NOT NULL,
  `semester` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `account_softwares`
--

CREATE TABLE `account_softwares` (
  `account_id` int(11) NOT NULL,
  `software_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `account_styles`
--

CREATE TABLE `account_styles` (
  `account_id` int(11) NOT NULL,
  `style_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `address`
--

CREATE TABLE `address` (
  `account_id` int(11) NOT NULL,
  `cep` text NOT NULL,
  `house_number` text NOT NULL,
  `street` text NOT NULL,
  `neighborhood` text NOT NULL,
  `city` text NOT NULL
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
  `upload_timestamp` bigint(20) NOT NULL,
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
  `name` text NOT NULL,
  `iconPath` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `collection_details_softwares`
--

INSERT INTO `collection_details_softwares` (`id`, `name`, `iconPath`) VALUES
(1, 'Adobe After Effects', 'software-icons/Adobe-After-Effects.svg'),
(2, 'Adobe Illustrator', 'software-icons/Adobe-Illustrator.svg'),
(3, 'Adobe InDesin', 'software-icons/Adobe-InDesign.svg'),
(4, 'Adobe Photoshop', 'software-icons/Adobe-Photoshop.svg'),
(5, 'Archicad', 'software-icons/archicad.png'),
(6, 'ARmedia', 'software-icons/armedia.png'),
(7, 'AutoCAD', 'software-icons/autocad.png'),
(8, 'CorelDRAW', 'software-icons/CorelDraw.png'),
(9, 'Corona', 'software-icons/Corona.svg'),
(10, 'Dynamo for Revit', 'software-icons/Dynamo.svg'),
(11, 'Grasshopper 3D for Rhinoceros', 'software-icons/grasshopper-3d.png'),
(12, 'Lumion', 'software-icons/Lumion.svg'),
(13, 'Promob', 'software-icons/promob.png'),
(14, 'Revit', 'software-icons/AutodeskRevit.svg'),
(15, 'Rhinocheros 3D', 'software-icons/rhinosceros-3d.png'),
(16, 'SketchUp', 'software-icons/Sketchup.png'),
(17, 'Unreal', 'software-icons/unreal.svg'),
(18, 'V-ray for SketchUp', 'software-icons/V-Ray.svg'),
(19, 'V-ray for 3DS MAX', 'software-icons/V-Ray.svg'),
(20, '3DS MAX', 'software-icons/3dsMax.svg');

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

-- --------------------------------------------------------

--
-- Estrutura da tabela `following`
--

CREATE TABLE `following` (
  `account_id` int(11) NOT NULL,
  `follow_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `action_id` int(11) NOT NULL,
  `extra_id` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `offices`
--

CREATE TABLE `offices` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `cnpj` text NOT NULL,
  `photo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `offices_address`
--

CREATE TABLE `offices_address` (
  `office_id` int(11) NOT NULL,
  `cep` text NOT NULL,
  `house_number` text NOT NULL,
  `street` text NOT NULL,
  `neighborhood` text NOT NULL,
  `city` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `offices_members`
--

CREATE TABLE `offices_members` (
  `office_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `account_formation`
--
ALTER TABLE `account_formation`
  ADD KEY `cascade author id to account_formation` (`account_id`);

--
-- Índices para tabela `account_softwares`
--
ALTER TABLE `account_softwares`
  ADD KEY `cascade author id to account_softwares` (`account_id`),
  ADD KEY `cascade software id to account_softwares` (`software_id`);

--
-- Índices para tabela `account_styles`
--
ALTER TABLE `account_styles`
  ADD KEY `cascade author id to account_styles` (`account_id`),
  ADD KEY `cascade style_id to account_styles` (`style_id`);

--
-- Índices para tabela `address`
--
ALTER TABLE `address`
  ADD KEY `cascade author id to address` (`account_id`);

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
-- Índices para tabela `collection_details_softwares`
--
ALTER TABLE `collection_details_softwares`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `collection_details_styles`
--
ALTER TABLE `collection_details_styles`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `following`
--
ALTER TABLE `following`
  ADD KEY `cascade follow id to following` (`account_id`),
  ADD KEY `cascade follow_id to following` (`follow_id`);

--
-- Índices para tabela `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cascade account id to notifications` (`account_id`),
  ADD KEY `cascade sender id to notifications` (`sender_id`);

--
-- Índices para tabela `offices`
--
ALTER TABLE `offices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cascade account id to offices` (`owner_id`);

--
-- Índices para tabela `offices_address`
--
ALTER TABLE `offices_address`
  ADD KEY `cascade office id to offices_address` (`office_id`);

--
-- Índices para tabela `offices_members`
--
ALTER TABLE `offices_members`
  ADD KEY `cascade office id to offices_members` (`office_id`),
  ADD KEY `cascade account_id id to offices_members` (`account_id`);

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
-- AUTO_INCREMENT de tabela `collection_details_softwares`
--
ALTER TABLE `collection_details_softwares`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `collection_details_styles`
--
ALTER TABLE `collection_details_styles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `offices`
--
ALTER TABLE `offices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `account_formation`
--
ALTER TABLE `account_formation`
  ADD CONSTRAINT `cascade author id to account_formation` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `account_softwares`
--
ALTER TABLE `account_softwares`
  ADD CONSTRAINT `cascade author id to account_softwares` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cascade software id to account_softwares` FOREIGN KEY (`software_id`) REFERENCES `collection_details_softwares` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `account_styles`
--
ALTER TABLE `account_styles`
  ADD CONSTRAINT `cascade author id to account_styles` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cascade style_id to account_styles` FOREIGN KEY (`style_id`) REFERENCES `collection_details_styles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `cascade author id to address` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

--
-- Limitadores para a tabela `following`
--
ALTER TABLE `following`
  ADD CONSTRAINT `cascade account id to following` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `cascade account id to notifications` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cascade sender id to notifications` FOREIGN KEY (`sender_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `offices`
--
ALTER TABLE `offices`
  ADD CONSTRAINT `cascade account id to offices` FOREIGN KEY (`owner_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `offices_address`
--
ALTER TABLE `offices_address`
  ADD CONSTRAINT `cascade office id to offices_address` FOREIGN KEY (`office_id`) REFERENCES `offices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `offices_members`
--
ALTER TABLE `offices_members`
  ADD CONSTRAINT `cascade account_id id to offices_members` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cascade office id to offices_members` FOREIGN KEY (`office_id`) REFERENCES `offices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
