-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 06 juil. 2022 à 19:22
-- Version du serveur : 10.4.19-MariaDB
-- Version de PHP : 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `naf`
--

-- --------------------------------------------------------

--
-- Structure de la table `naf_users`
--

CREATE TABLE `naf_users` (
  `id` int(11) NOT NULL,
  `identifier` varchar(100) NOT NULL,
  `accounts` longtext DEFAULT '{"bank":0}',
  `permissions` varchar(50) DEFAULT 'user',
  `inventory` longtext DEFAULT NULL,
  `charinfo` longtext DEFAULT '{"firstname":"","lastname":"","dob":"","nationality":"","height":0,"sex":"","job":"unemployed","job_grade":0,"job2":"unemployed2","job2_grade":0}',
  `position` varchar(255) DEFAULT '{"x":-269.4,"y":-955.3,"z":31.2,"heading":205.8}',
  `skin` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `naf_users`
--

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `naf_users`
--
ALTER TABLE `naf_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `naf_users`
--
ALTER TABLE `naf_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
