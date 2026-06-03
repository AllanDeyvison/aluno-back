-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: provadb.mysql.database.azure.com    Database: db_allan
-- ------------------------------------------------------
-- Server version	8.4.7-azure

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'b2b6f6e9-5ed6-11f1-8dd1-7ced8de7b856:1-30';

--
-- Table structure for table `alunos`
--

DROP TABLE IF EXISTS `alunos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alunos` (
  `id_aluno` int unsigned NOT NULL AUTO_INCREMENT,
  `nome_completo` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usuario_acesso` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_aluno` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `observacao` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto` longblob,
  `data_cadastro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_aluno`),
  UNIQUE KEY `usuario_acesso` (`usuario_acesso`),
  UNIQUE KEY `email_aluno` (`email_aluno`),
  CONSTRAINT `chk_email` CHECK (regexp_like(`email_aluno`,_utf8mb4'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'))
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos`
--

LOCK TABLES `alunos` WRITE;
/*!40000 ALTER TABLE `alunos` DISABLE KEYS */;
INSERT INTO `alunos` VALUES (1,'Ana Clara Souza','anaclara','$2b$10$SHKShn3dGgVwaCVHjzCo2eSn75tCotP5zgih/YVUvlhVqLBgMwio2','ana.clara@email.com','Aluno de teste',_binary 'https://exemplo.com/fotos/ana-clara.jpg','2026-06-02 23:44:30'),(2,'allan','allan','$2b$10$.4bD6/jsfdFjyI8V0TaOt.t0a2rGalFidFWbzoI0u4MN1DA0wPsw2','allan@gmail.com','sla',_binary 'https://p2.trrsf.com/image/fget/cf/1548/0/images.terra.com/2025/09/17/1844192073-curiosidades-sobre-o-bicho-preguica.jpg','2026-06-03 00:04:16'),(3,'deyvison','deyvison','$2b$10$/9IiCO1mYzuvgp/CsE3qIu/irAHa6RrkOAAfNuiEC5FfyIvRvlZu2','deyvison@gmail.com','observação',_binary 'https://folhago.com.br/wp-content/uploads/2020/12/foto-do-post-108.png','2026-06-03 00:10:02'),(4,'allan deyvison','allandey','$2b$10$7caNLphAm/waK1BdrKRkzOGj0Ljifc0d99vNgLMVKSP/vRrgv.ePe','allandey@gmail.com','observação',_binary 'http://localhost:3000/uploads/1780446537313-foto.jpeg','2026-06-03 00:28:53'),(5,'fernando','fernando','$2b$10$gbAo4MXR3bfJdAKIwMK6DOa2KBRcdYkwT8zVvpmG/pRJF7uawi/a2','fernand@gmail.com','',_binary 'http://localhost:3000/uploads/1780448628849-foto.jpeg','2026-06-03 01:03:44'),(6,'George','georfe','$2b$10$7hKXTXGtdJj0lf2whrhzJOB0dFmm7jz9I3lS/n.4IqBzNTPe4MGhG','george@gmail.com','',_binary 'https://www.bing.com/images/search?view=detailV2&ccid=QkhxR7mL&id=9A6A43732D382069D23830FC8BBA7AF207634793&thid=OIP.QkhxR7mLjsBjVcKcMEE0GQHaDH&mediaurl=https%3a%2f%2fwww.hostinger.com%2ftutorials%2fwp-content%2fuploads%2fsites%2f2%2f2022%2f07%2fthe-structure-of-a-url.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.42487147b98b8ec06355c29c30413419%3frik%3dk0djB%252fJ6uov8MA%26pid%3dImgRaw%26r%3d0&exph=450&expw=1068&q=url&FORM=IRPRST&ck=8892F5F8A34D393276F16305ABA7B9C0&selectedIndex=1&itb=0','2026-06-03 01:10:04'),(7,'asdas','bct','$2b$10$p/jp5OUWLhRl5a.rhnL1p..I/LNxayCv3R8fpmIRl2B4sQx.5rzGi','bct@gmail.com','asdasdas',NULL,'2026-06-03 01:10:29'),(8,'Rhuan Santana da SIlva','Rhuan','$2b$10$wNuB7UiEn/AZpEL9/Q2.keuMxOvIhgIXgAgHSlX.FpSTXwhTJ.jAK','rhuan.silva3@fatec.sp.gov.br','fghjk',_binary 'http://aluno-back.onrender.com/uploads/1780449052324-foto.png','2026-06-03 01:10:53');
/*!40000 ALTER TABLE `alunos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'db_allan'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-02 22:16:54
