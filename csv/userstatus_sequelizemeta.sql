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
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20241104010112-khoahoc_table.js'),('20241104010140-thisinh_table.js'),('20241104011206-create_status_table.js'),('20241104064120-create-khoahoc_thisinh.js'),('20241105144856-alter-anh-column-to-mediumblob.js'),('20241106003417-exam-type.js'),('20241108025649-add-col-khoahoc-thisinh-stt.js'),('20241119131900-add-col-payment-khoahoc-thisinh.js'),('20241119151532-add-col-money-payment-khoahoc-thisinh.js'),('20241126022945-user.js'),('20241126023628-group.js'),('20241130055246-role.js'),('20241130055317-group_role.js'),('20241203222746-subject.js'),('20241203222752-test.js'),('20241203224148-question.js'),('20241204011727-test-question.js'),('20241204115836-add-col-nameEx-subject.js'),('20241204123801-add-col-number-test-question.js'),('20241204135722-add-col-subjectid.js'),('20241204163115-add-col-table-subject-thisinh.js'),('20241205042323-create-table-processtest.js'),('20241205080928-add-col-process-table-thisinh.js'),('20241205132406-add-col-rank-of-subject.js'),('20241205132837-crate-table-rank.js'),('20241205133731-change-col-threshold-table-subject.js'),('20241205161550-change-col-numberofquestin-table-subject.js'),('20241206022812-add-col-showsubject-table-subject.js'),('20241207035627-create-table-exam.js'),('20241207154939-add-col-time-subject.js'),('20241215013515-change-col-Anh-thisinh.js'),('20241215144348-add-col-subject-table-exam.js'),('20250112144723-add-col-print-tbl-thisinh.js'),('20250116145748-add-col-order-tbl-test-question.js'),('20250129104827-create-table-userstoredetect.js'),('20250129110004-create-table-detect.js'),('20250306043621-add-col-note-table-exam.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
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
