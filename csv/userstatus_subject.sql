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
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf16 COLLATE utf16_unicode_ci DEFAULT NULL,
  `numberofquestion` int DEFAULT '10',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `nameEx` varchar(255) CHARACTER SET utf16 COLLATE utf16_unicode_ci DEFAULT NULL,
  `threshold` int DEFAULT '5',
  `IDrank` int DEFAULT '1',
  `showsubject` tinyint(1) DEFAULT '1',
  `timeFinish` int DEFAULT '6',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (1,'Pháp luật giao thông đường bộ',20,NULL,'2025-01-09 22:37:55','PLGTDB',10,1,1,11),(2,'Cấu tạo và sửa chữa thông thường',10,NULL,'2025-01-09 22:37:55','CauTao',5,1,1,6),(3,'Nghiệp vụ vận tải',10,NULL,'2025-01-09 22:37:54','NVVT',5,1,1,6),(4,'Đạo đức người lái xe và văn hóa giao thông',10,NULL,'2025-01-09 22:37:54','DaoDuc',5,1,1,6),(5,'Kỹ thuật lái xe',10,NULL,'2025-01-09 22:37:54','KTLX',5,1,1,6),(6,'Pháp luật giao thông đường bộ',20,'2025-01-02 14:02:21','2025-01-09 22:38:06','PLGTDB',10,2,1,11),(7,'Cấu tạo và sửa chữa thông thường',10,'2025-01-02 14:02:53','2025-01-09 22:38:06','CauTao',5,2,1,6),(8,'Nghiệp vụ vận tải',10,'2025-01-02 14:03:08','2025-01-09 22:38:06','NVVT',5,2,1,6),(9,'Đạo đức người lái xe và văn hóa giao thông',10,'2025-01-02 14:03:18','2025-01-09 22:38:06','DaoDuc',5,2,1,6),(10,'Kỹ thuật lái xe',10,'2025-01-02 14:03:28','2025-01-09 22:38:06','KTLX',5,2,1,6),(11,'Pháp luật giao thông đường bộ',20,'2025-01-02 14:04:15','2025-01-09 22:38:23','PLGTDB',10,3,1,11),(12,'Cấu tạo và sửa chữa thông thường',10,'2025-01-02 14:04:40','2025-01-09 22:38:23','CauTao',5,3,1,6),(13,'Nghiệp vụ vận tải',10,'2025-01-02 14:04:48','2025-01-10 08:02:38','NVVT',5,3,0,6),(14,'Đạo đức người lái xe và văn hóa giao thông',10,'2025-01-02 14:04:56','2025-01-09 22:38:23','DaoDuc',5,3,1,6),(15,'Kỹ thuật lái xe',10,'2025-01-02 14:05:05','2025-01-09 22:38:23','KTLX',5,3,1,6),(16,'Pháp luật giao thông đường bộ',30,'2025-02-11 22:41:16','2025-06-18 07:01:15','PLGTDB',25,5,1,17),(17,'Cấu tạo và sửa chữa thông thường',10,'2025-02-11 22:41:52','2025-06-18 07:01:21','CauTao',5,5,1,3),(18,'Nghiệp vụ vận tải',10,'2025-02-11 22:43:50','2025-06-18 07:02:51','NVVT',5,5,0,3),(19,'Đạo đức người lái xe và văn hóa giao thông',10,'2025-02-11 22:44:01','2025-06-18 07:01:32','DaoDuc',5,5,1,3),(20,'Kỹ thuật lái xe',10,'2025-02-11 22:44:10','2025-06-18 07:01:38','KTLX',5,5,1,3),(21,'Pháp luật giao thông đường bộ',30,'2025-02-11 22:44:34','2025-06-18 07:01:53','PLGTDB',25,6,1,17),(22,'Cấu tạo và sửa chữa thông thường',10,'2025-02-11 22:44:52','2025-06-18 07:01:58','CauTao',5,6,1,3),(23,'Nghiệp vụ vận tải',10,'2025-02-11 22:45:02','2025-06-18 07:02:46','NVVT',5,6,0,3),(24,'Đạo đức người lái xe và văn hóa giao thông',10,'2025-02-11 22:45:11','2025-06-18 07:02:03','DaoDuc',5,6,1,3),(25,'Kỹ thuật lái xe',10,'2025-02-11 22:45:19','2025-06-18 07:02:07','KTLX',5,6,1,3),(26,'Pháp luật giao thông đường bộ',30,'2025-02-11 22:46:33','2025-06-18 07:02:25','PLGTDB',25,7,1,17),(27,'Cấu tạo và sửa chữa thông thường',10,'2025-02-11 22:46:50','2025-06-18 07:02:29','CauTao',5,7,1,3),(28,'Nghiệp vụ vận tải',10,'2025-02-11 22:47:01','2025-06-18 07:02:39','NVVT',5,7,0,3),(29,'Đạo đức người lái xe và văn hóa giao thông',10,'2025-02-11 22:47:09','2025-06-18 07:02:33','DaoDuc',5,7,1,3),(30,'Kỹ thuật lái xe',10,'2025-02-11 22:47:17','2025-06-18 07:02:35','KTLX',5,7,1,3),(31,'Kiến thức mới về xe nâng hạng',10,'2025-03-12 08:03:13','2025-05-23 09:02:01','KTXNH',5,8,1,6),(32,'Pháp luật giao thông đường bộ',20,'2025-03-12 08:03:53','2025-05-23 09:02:01','PLGTDB',5,8,1,6),(33,'	Cấu tạo và sửa chữa thông thường',10,'2025-03-12 08:04:01','2025-05-23 09:02:01','CauTao',5,8,0,6),(34,'Nghiệp vụ vận tải',10,'2025-03-12 08:04:08','2025-05-23 09:02:01','NVVT',5,8,1,6),(35,'Đạo đức người lái xe và văn hóa giao thông',10,'2025-03-12 08:04:19','2025-05-23 09:02:01','DaoDuc',5,8,1,6),(36,'Kỹ thuật lái xe',10,'2025-03-12 08:04:40','2025-05-23 09:02:01','KTLX',5,8,0,6);
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-25 16:18:43
