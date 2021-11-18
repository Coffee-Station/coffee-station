-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 3.38.99.110    Database: coffee_station
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `extra`
--

DROP TABLE IF EXISTS `extra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extra` (
  `extra_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  `price` int NOT NULL,
  `menu_id` bigint NOT NULL,
  PRIMARY KEY (`extra_id`),
  KEY `FKmiea5icprxtde2mm063k207g5` (`menu_id`),
  CONSTRAINT `FKmiea5icprxtde2mm063k207g5` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extra`
--

LOCK TABLES `extra` WRITE;
/*!40000 ALTER TABLE `extra` DISABLE KEYS */;
INSERT INTO `extra` VALUES (1,'아이스',500,1),(2,'아이스',500,5),(3,'아이스',500,9),(4,'시럽 추가',0,1),(5,'시럽 추가',0,2),(6,'시럽 추가',0,9),(7,'syrup',100,17),(8,'syrup no',12,17),(9,'syrup no',12,17),(10,'syrup no',12,17),(11,'double',5000,19),(12,'syrup',500,21),(13,'more more',234,23),(14,'ice',1212,24);
/*!40000 ALTER TABLE `extra` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-19  4:56:43
