CREATE DATABASE  IF NOT EXISTS `userstatus` /*!40100 DEFAULT CHARACTER SET utf16 COLLATE utf16_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `userstatus`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: userstatus
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `qr`
--

DROP TABLE IF EXISTS `qr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `courseId` int NOT NULL,
  `code` varchar(1024) COLLATE utf16_unicode_ci NOT NULL,
  `description` varchar(1024) COLLATE utf16_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `qr_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courseqr` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qr`
--

LOCK TABLES `qr` WRITE;
/*!40000 ALTER TABLE `qr` DISABLE KEYS */;
INSERT INTO `qr` VALUES (11,4,'{\"CCCD\":\"052199008226\",\"CMT\":\"215488078\",\"name\":\"TRẦN TƯỜNG VY\",\"dob\":\"02081999\",\"gender\":\"Nữ\",\"address\":\"bca\",\"registrationDate\":\"28062021\"}',NULL,'2025-08-27 21:32:37','2025-08-27 23:06:20'),(13,4,'{\"CCCD\":\"052099006695\",\"CMT\":\"215485523\",\"name\":\"Phạm Xuân Khả Vy\",\"dob\":\"12031999\",\"gender\":\"Nam\",\"address\":\"Thôn Xuân An, Cát Tường, Phù Cát, Bình Định\",\"registrationDate\":\"23092022\"}',NULL,'2025-08-27 23:03:10','2025-08-27 23:03:10'),(14,4,'{\"CCCD\":\"052099006695\",\"CMT\":\"215485523\",\"name\":\"Phạm Xuân Khả Vy\",\"dob\":\"12031999\",\"gender\":\"Nam\",\"address\":\"Thôn Xuân An, Cát Tường, Phù Cát, Bình Định\",\"registrationDate\":\"23092022\"}',NULL,'2025-08-27 23:47:00','2025-08-27 23:47:00'),(15,4,'{\"CCCD\":\"052099006695\",\"CMT\":\"215485523\",\"name\":\"Phạm Xuân Khả Vy\",\"dob\":\"12031999\",\"gender\":\"Nam\",\"address\":\"Thôn Xuân An, Cát Tường, Phù Cát, Bình Định\",\"registrationDate\":\"23092022\"}',NULL,'2025-08-29 22:03:34','2025-08-29 22:03:34'),(16,3,'{\"CCCD\":\"052099006695\",\"CMT\":\"215485523\",\"name\":\"Phạm Xuân Khả Vy\",\"dob\":\"12031999\",\"gender\":\"Nam\",\"address\":\"Thôn Xuân An, Cát Tường, Phù Cát, Bình Định\",\"registrationDate\":\"23092022\"}',NULL,'2025-08-29 22:03:50','2025-08-29 22:03:50');
/*!40000 ALTER TABLE `qr` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-25 16:18:42
