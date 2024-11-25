-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: guiatour
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
-- Table structure for table `atracciones`
--

DROP TABLE IF EXISTS `atracciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atracciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ciudad_id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ciudad_id` (`ciudad_id`),
  CONSTRAINT `atracciones_ibfk_1` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudades` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atracciones`
--

LOCK TABLES `atracciones` WRITE;
/*!40000 ALTER TABLE `atracciones` DISABLE KEYS */;
INSERT INTO `atracciones` VALUES (1,1,'Ciudad Amurallada','/images/cartagena_attraction1.jpg','Explora la increíble Ciudad Amurallada, patrimonio histórico con calles empedradas y hermosos balcones coloniales.'),(2,1,'Castillo San Felipe','/images/cartagena_attraction2.jpg','Visita el imponente Castillo San Felipe, una fortaleza construida por los españoles para proteger la ciudad.'),(3,2,'Parque Arví','/images/medellin_attraction1.jpg','Disfruta del contacto con la naturaleza en el Parque Arví, un parque ecológico ideal para caminatas y picnic.'),(4,2,'Comuna 13','/images/medellin_attraction2.jpg','Descubre la historia de la transformación social en la Comuna 13, llena de arte urbano y grafitis.'),(5,3,'Museo del Oro','/images/bogota_attraction1.jpg','El Museo del Oro alberga la mayor colección de oro prehispánico del mundo.'),(6,3,'Monserrate','/images/bogota_attraction2.jpg','Visita el cerro de Monserrate y disfruta de una vista panorámica espectacular de toda la ciudad.'),(7,4,'Cristo Rey','/images/cali_attraction1.jpg','El Cristo Rey es una de las atracciones más icónicas de Cali, ofreciendo una vista magnífica de la ciudad.'),(8,4,'Zoológico de Cali','/images/cali_attraction2.jpg','Visita el Zoológico de Cali, uno de los más importantes de América Latina.'),(9,5,'Parque Tayrona','/images/santamarta_attraction1.jpg','El Parque Tayrona ofrece playas paradisíacas y senderos naturales que permiten observar la flora y fauna del Caribe.'),(10,5,'Quinta de San Pedro Alejandrino','/images/santamarta_attraction2.jpg','Visita la histórica Quinta de San Pedro Alejandrino, donde murió Simón Bolívar.'),(11,6,'Hoyo Soplador','/images/sanandres_attraction1.jpg','El Hoyo Soplador es un fenómeno natural donde el agua y el viento crean un espectáculo impresionante.'),(12,6,'Johnny Cay','/images/sanandres_attraction2.jpg','Johnny Cay es una pequeña isla cercana a San Andrés, famosa por sus playas y ambiente relajado.');
/*!40000 ALTER TABLE `atracciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudades`
--

DROP TABLE IF EXISTS `ciudades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `imagen_principal` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudades`
--

LOCK TABLES `ciudades` WRITE;
/*!40000 ALTER TABLE `ciudades` DISABLE KEYS */;
INSERT INTO `ciudades` VALUES (1,'Cartagena','/images/cartagena.jpg','Cartagena es una ciudad portuaria en la costa del Caribe, famosa por su arquitectura colonial, vibrante vida nocturna, y sus playas hermosas. Es un lugar lleno de historia y cultura.'),(2,'Medellín','/images/medellin.jpg','Medellín, la ciudad de la eterna primavera, es conocida por su clima cálido, gente amigable, y transformación urbana ejemplar.'),(3,'Bogotá','/images/bogota.jpg','Bogotá, la capital de Colombia, es una metrópolis vibrante llena de cultura, arte y gastronomía. Ofrece una experiencia única con museos, parques y una rica historia colonial.'),(4,'Cali','/images/cali.jpg','Cali es la capital mundial de la salsa, famosa por su música, baile y su cultura viva. También es conocida por su clima cálido y hospitalidad.'),(5,'Santa Marta','/images/santamarta.jpg','Santa Marta, ubicada en la costa del Caribe, es un destino turístico popular gracias a sus hermosas playas y el Parque Nacional Natural Tayrona.'),(6,'San Andrés','/images/sanandres.jpg','San Andrés es una hermosa isla del Caribe conocida por su mar de siete colores, playas paradisíacas y cultura raizal única.');
/*!40000 ALTER TABLE `ciudades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guias`
--

DROP TABLE IF EXISTS `guias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ciudad_id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `experiencia` varchar(50) NOT NULL DEFAULT 'Sin experiencia especificada',
  `idiomas` varchar(50) NOT NULL DEFAULT 'No especificado',
  `foto` varchar(50) NOT NULL DEFAULT 'No foto',
  `especialidad` varchar(50) NOT NULL DEFAULT 'No especificado',
  `sobre_mi` text NOT NULL,
  `tarifa` varchar(50) NOT NULL DEFAULT '0 COP',
  `tour` varchar(255) NOT NULL DEFAULT 'Tour no especificado',
  `calificacion` decimal(3,2) NOT NULL DEFAULT '0.00',
  `email` varchar(100) NOT NULL,
  `whatsapp` varchar(20) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  KEY `ciudad_id` (`ciudad_id`),
  CONSTRAINT `guias_ibfk_1` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudades` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guias`
--

LOCK TABLES `guias` WRITE;
/*!40000 ALTER TABLE `guias` DISABLE KEYS */;
INSERT INTO `guias` VALUES (1,1,'Carlos Gómez','5 años de experiencia','Español, Inglés','/images/guias/carlos_gomez.jpg','Historia colonial','Apasionado por la historia y las historias que construyeron Cartagena. Mis tours son entretenidos y llenos de datos curiosos.','200,000 COP','Recorrido por la Ciudad Amurallada',4.80,'carlos.gomez@example.com','3001234567','123456789','2024-11-21 08:33:39'),(2,1,'Ana Torres','3 años de experiencia','Español, Francés','/images/guias/ana_torres.jpg','Arquitectura y cultura','Arquitecta de profesión, guía de corazón. Amo enseñar sobre los tesoros arquitectónicos de Cartagena.','160,000 COP','Tour por el Castillo San Felipe y alrededores',4.60,'ana.torres@example.com','3012345678','123456789','2024-11-21 08:33:39'),(3,2,'Juan Pérez','4 años de experiencia','Español, Inglés','/images/guias/juan_perez.jpg','Naturaleza y ecoturismo','Soy amante de la naturaleza y disfruto compartir las maravillas de Medellín y sus alrededores.','120,000 COP','Excursión en el Parque Arví',4.30,'juan.perez@example.com','3023456789','123456789','2024-11-21 08:33:39'),(4,2,'Laura Mejía','6 años de experiencia','Español, Alemán','/images/guias/laura_mejia.jpg','Arte urbano y transformación social','Guía especializada en tours por la Comuna 13. Cada grafiti cuenta una historia.','140,000 COP','Recorrido por la Comuna 13',4.90,'laura.mejia@example.com','3034567890','123456789','2024-11-21 08:33:39'),(5,3,'María Rodríguez','7 años de experiencia','Español, Inglés','/images/guias/maria_rodriguez.jpg','Historia y arte','Exploro la historia y el arte de Bogotá en cada rincón. Amo el Museo del Oro.','240,000 COP','Tour en el Museo del Oro',4.70,'maria.rodriguez@example.com','3045678901','123456789','2024-11-21 08:33:39'),(6,3,'Andrés López','5 años de experiencia','Español, Italiano','/images/guias/andres_lopez.jpg','Religión e historia','Soy guía en el Cerro de Monserrate, combinando vistas increíbles con historias espirituales.','180,000 COP','Caminata a Monserrate',4.50,'andres.lopez@example.com','3056789012','123456789','2024-11-21 08:33:39'),(7,4,'Sofía Martínez','6 años de experiencia','Español, Portugués','/images/guias/sofia_martinez.jpg','Historia y naturaleza','Soy guía especializada en tours por Cali, combinando historia y naturaleza en mis recorridos.','200,000 COP','Visita al Cristo Rey',4.60,'sofia.martinez@example.com','3067890123','123456789','2024-11-21 08:33:39'),(8,4,'José Hernández','4 años de experiencia','Español, Inglés','/images/guias/jose_hernandez.jpg','Familias y actividades','Mi pasión es trabajar con familias, asegurando que todos disfruten del Zoológico de Cali.','140,000 COP','Recorrido en el Zoológico de Cali',4.40,'jose.hernandez@example.com','3078901234','123456789','2024-11-21 08:33:39'),(9,5,'Manuel Gutiérrez','8 años de experiencia','Español, Inglés','/images/guias/manuel_gutierrez.jpg','Parques naturales y ecoturismo','Me encanta conectar a las personas con la naturaleza. El Parque Tayrona es mi hogar.','280,000 COP','Exploración en el Parque Tayrona',4.90,'manuel.gutierrez@example.com','3089012345','123456789','2024-11-21 08:33:39'),(10,5,'Carolina Suárez','5 años de experiencia','Español, Francés','/images/guias/carolina_suarez.jpg','Historia y cultura','Apasionada por la historia y las raíces culturales de Santa Marta.','200,000 COP','Visita a la Quinta de San Pedro Alejandrino',4.70,'carolina.suarez@example.com','3090123456','123456789','2024-11-21 08:33:39'),(11,6,'Ricardo Moreno','7 años de experiencia','Español, Inglés','/images/guias/ricardo_moreno.jpg','Fenómenos naturales y relax','Soy guía especializado en tours relajantes por San Andrés.','240,000 COP','Tour al Hoyo Soplador',4.80,'ricardo.moreno@example.com','3101234567','123456789','2024-11-21 08:33:39'),(12,6,'Liliana Ríos','4 años de experiencia','Español','/images/guias/liliana_rios.jpg','Playas y cultura raizal','Comparto la riqueza cultural y las playas paradisíacas de San Andrés.','220,000 COP','Visita a Johnny Cay',4.60,'liliana.rios@example.com','3112345678','123456789','2024-11-21 08:33:39'),(13,1,'Pedro Ramírez Gonzales','5 años de experiencia','Español, Inglés','No foto','Historia colonial','Guía apasionado por la historia y la cultura.','150,000 COP','Tour por la Ciudad Amurallada',0.00,'pedro.ramirez@example.com','3123456786','securepassword123','2024-11-21 09:53:47'),(14,3,'minombre','Información no disponible','No especificado','No foto','No especificado','Información no disponible','0 COP','Tour no especificado',0.00,'nombre@correo.com','3133002222','123456','2024-11-21 20:14:12');
/*!40000 ALTER TABLE `guias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resenas_guias`
--

DROP TABLE IF EXISTS `resenas_guias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resenas_guias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `guia_id` int NOT NULL,
  `texto` text NOT NULL,
  `calificacion` int NOT NULL,
  `fecha` date NOT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_resenas_guias_guia` (`guia_id`),
  KEY `fk_resenas_guias_usuario` (`usuario_id`),
  CONSTRAINT `fk_resenas_guias_guia` FOREIGN KEY (`guia_id`) REFERENCES `guias` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_resenas_guias_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `resenas_guias_ibfk_1` FOREIGN KEY (`guia_id`) REFERENCES `guias` (`id`),
  CONSTRAINT `resenas_guias_chk_1` CHECK ((`calificacion` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resenas_guias`
--

LOCK TABLES `resenas_guias` WRITE;
/*!40000 ALTER TABLE `resenas_guias` DISABLE KEYS */;
INSERT INTO `resenas_guias` VALUES (1,1,'Excelente guía, muy conocedor de la ciudad.',5,'2024-11-15',1),(2,2,'Muy amable y profesional. Lo recomiendo.',4,'2024-11-16',2),(3,3,'Gran experiencia, pero podría ser más puntual.',3,'2024-11-17',3),(4,4,'Súper guía, nos ayudó mucho en el tour.',5,'2024-11-18',4),(5,5,'Conocía todos los secretos de la ciudad. Fascinante.',4,'2024-11-19',1),(6,6,'No estaba muy preparado para el clima, pero bien.',3,'2024-11-20',2),(7,7,'Gran actitud y súper carismática.',5,'2024-11-21',3),(8,8,'Podría mejorar la explicación en algunos puntos.',3,'2024-11-22',4),(9,9,'Nos mostró lugares ocultos, un gran guía.',5,'2024-11-23',1),(10,10,'Excelente comunicación y atención.',5,'2024-11-24',2),(11,11,'Un poco caro, pero valió la pena.',4,'2024-11-25',3),(12,12,'Muy profesional y atento. Recomendado.',5,'2024-11-26',4),(13,1,'Guía espectacular, aprendí muchísimo.',5,'2024-11-19',1),(14,1,'Estuvo ma o meno el guia.',3,'2024-11-20',3),(15,3,'Estuvo ma o meno el guia.',3,'2024-11-20',3),(16,5,'Estuvo ma o meno el guia.',2,'2024-11-20',2),(17,5,'Excelente guía, muy profesional.',5,'2024-11-20',1),(18,6,'hola',5,'2024-11-20',4),(19,6,'prueba prueba',4,'2024-11-20',4),(20,6,'prueba 2',5,'2024-11-20',4);
/*!40000 ALTER TABLE `resenas_guias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_completo` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Luis Miguel ','lucho@example.com','12345623','2024-11-18 09:15:38'),(2,'jose jose','jose@correco.com','123456','2024-11-18 09:28:42'),(3,'Juan Pérez','juanperez@example.com','123456','2024-11-18 20:51:38'),(4,'miguel','miguel@correo.com','123456','2024-11-18 21:02:50');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-22  3:17:42
