-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: a2
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agendamentos`
--

DROP TABLE IF EXISTS `agendamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agendamentos` (
  `codAgendamento` int NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `idCliente` int NOT NULL,
  `idConsole` int NOT NULL,
  PRIMARY KEY (`codAgendamento`),
  KEY `idCliente` (`idCliente`),
  KEY `idConsole` (`idConsole`),
  CONSTRAINT `agendamentos_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`codCliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `agendamentos_ibfk_2` FOREIGN KEY (`idConsole`) REFERENCES `consoles` (`codConsole`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamentos`
--

LOCK TABLES `agendamentos` WRITE;
/*!40000 ALTER TABLE `agendamentos` DISABLE KEYS */;
INSERT INTO `agendamentos` VALUES (1,'2026-10-30','15:30:00',1,1),(2,'2026-11-11','10:00:00',3,2),(3,'2026-11-12','15:00:00',4,3);
/*!40000 ALTER TABLE `agendamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `codCliente` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `cpf` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  PRIMARY KEY (`codCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Carlos','carlos@gmail.com','U2FsdGVkX18fY/b7NZ82Dv/UsaKdDLpKF12YchwCBaw=','U2FsdGVkX1+UQkCNLwzAUR581P4HOKOQqvtRSqeu1Zg=','4899999999'),(3,'Ana Souza','ana.souza@example.com','U2FsdGVkX1+3cKU8GnnqB8GKRTtY9Fmmoj9fDtSwTCQ=','U2FsdGVkX19KhWZ0YFxqM3mM5M5I+Qvt+ShkTATWPgg=','48988887777'),(4,'Bruno Lima','bruno.lima@example.com','U2FsdGVkX19bPW3A42BHEic4Qpyy8275cQCyUd+5Ro0=','U2FsdGVkX18KyyOKH8yPGW6g+yCt7ZnI3dgdr40bC30=','48977776666');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consoles`
--

DROP TABLE IF EXISTS `consoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consoles` (
  `codConsole` int NOT NULL AUTO_INCREMENT,
  `modelo` varchar(255) NOT NULL,
  `marca` varchar(255) NOT NULL,
  `numeroSerie` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `idCliente` int NOT NULL,
  PRIMARY KEY (`codConsole`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `consoles_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`codCliente`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consoles`
--

LOCK TABLES `consoles` WRITE;
/*!40000 ALTER TABLE `consoles` DISABLE KEYS */;
INSERT INTO `consoles` VALUES (1,'PlayStation 5','Sony','U2FsdGVkX1/1/ka3EweW5x4i4nIYOUqfdgXpwJWhruc=','Mídia Digital',1),(2,'Xbox Series X','Microsoft','U2FsdGVkX1/zPgACYL4Q+UScr6m5UzGSxlUdrErl/6hYcDWUhQa6n/Hjn9SMjJLN','Disco',3),(3,'Nintendo Switch','Nintendo','U2FsdGVkX18/sDoaHMFVlFhMaNvXYtMHZHM9xHyofYtI8iZQTePluvjWADfb9SV8','Cartucho',4);
/*!40000 ALTER TABLE `consoles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-22  9:41:34
