SET NAMES utf8mb4;

# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `passwd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('0','1','2','3','4','5','6','7','8','9') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '5' COMMENT '0:탈퇴, 1:유휴, 3:인증회원, 5:회원, 6:VIP, 9:관리자',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`idx`, `userid`, `passwd`, `username`, `email`, `createdAt`, `status`)
VALUES
	(9,'lainchan','$2b$08$mI0IslT6.Vp.xLNmI7pA7utmNKeCPsb8zSlqEuFasaGMOlheAq7l6','마스터','master@localhost.com','2021-10-01 10:33:36','5'),
	(11,'lainchan2','$2b$08$xFtNdrnydfoJMKjDBsBhDeSldi40dyBVqElFOav5Dt0uGnNyhjSCa','러인','slave@localhost.com','2021-10-01 13:16:30','5'),
	(12,'1929312626','','탁찬연','rhymeconqueror@gmail.com','2021-10-01 14:47:48','3'),
	(14,'k6kih9lUJlhwStWdcuyd5hvk2VK8SZszOybdL_UMxM0','','탁찬연','sliced_lime@naver.com','2021-10-01 15:13:11','3'),
	(15,'lainchan3','$2b$08$h8cxcR/GslBiO3qklJhsPO9JB9qS5r/9HEm6dRwzgXB/I1lEiYtWy','탁찬연','lainchan@naver.com','2021-10-19 11:23:18','0');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `books`;

CREATE TABLE `books` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '도서제목',
  `writer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '저자',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '요약설명',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성시간',
  `status` enum('0','1','2','3') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '상태 (0:삭제, 1:현재판매, 2:발행예정, 3:절판)',
  `fidx` int unsigned NOT NULL,
  PRIMARY KEY (`idx`),
  KEY `USER_KEY` (`fidx`),
  CONSTRAINT `USER_KEY` FOREIGN KEY (`fidx`) REFERENCES `users` (`idx`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;

INSERT INTO `books` (`idx`, `title`, `writer`, `content`, `createdAt`, `status`, `fidx`)
VALUES
	(3,'한일 필수단어왕','리디북스','일본어 사전','2021-10-13 15:09:48','1',9),
	(4,'낯선 자의 일기','엘리 그리피스','추리 소설','2021-10-13 16:02:15','1',9),
	(5,'낯선 자의 일기','엘리 그리피스','추리 소설','2021-10-13 16:03:04','1',9),
	(7,'낯선 자의 일기','엘리 그리피스','추리 소설','2021-10-13 16:03:04','1',9),
	(8,'낯선 자의 일기','엘리 그리피스','추리 소설','2021-10-13 16:03:04','1',9),
	(9,'낯선 자의 일기','엘리 그리피스','추리 소설','2021-10-13 16:03:04','1',9),
	(10,'낯선 자의 일기','엘리 그리피스','추리 소설','2021-10-13 16:03:04','1',9),
	(11,'낯선 자의 일기','엘리 그리피스','추리 소설','2021-10-13 16:03:04','1',9),
	(12,'낯선 자의 일기','엘리 그리피스','추리 소설','2021-10-13 16:03:04','1',9),
	(13,'낯선 자의 일기','엘리 그리피스','추리 소설','2021-10-13 16:03:04','1',9),
	(14,'낯선 자의 일기','엘리 그리피스','추리 소설','2021-10-13 16:03:04','1',9),
	(15,'낯선 자의 일기','엘리 그리피스','추리 소설','2021-10-13 16:03:04','1',9),
	(16,'낯선 자의 일기','엘리 그리피스','추리 소설','2021-10-13 16:03:04','1',9),
	(17,'낯선 자의 일기','엘리 그리피스','추리 소설','2021-10-13 16:03:04','1',9),
	(18,'낯선 자의 일기','엘리 그리피스','추리 소설','2021-10-13 16:03:04','1',9),
	(19,'낯선 자의 일기','엘리 그리피스','추리 소설','2021-10-13 16:03:04','1',9),
	(20,'낯선 자의 일기','엘리 그리피스','추리 소설','2021-10-13 16:03:04','1',9);

/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table files
# ------------------------------------------------------------

DROP TABLE IF EXISTS `files`;

CREATE TABLE `files` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  `fidx` int unsigned NOT NULL COMMENT '책 고유번호',
  `oriname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '파일 이름',
  `savename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '저장 이름',
  `mimetype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `size` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fieldname` enum('C','U') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'U',
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '0:삭제, 1:사용',
  PRIMARY KEY (`idx`),
  KEY `FK_files_books` (`fidx`),
  CONSTRAINT `FK_files_books` FOREIGN KEY (`fidx`) REFERENCES `books` (`idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;

INSERT INTO `files` (`idx`, `fidx`, `oriname`, `savename`, `mimetype`, `size`, `createdAt`, `fieldname`, `status`)
VALUES
	(4,5,'XL (2).jpeg','211013_9b8eee16-f8ef-41cb-baea-8b84980fa9ad.jpeg','image/jpeg',97132,'2021-10-13 16:03:04','C','1'),
	(5,5,'XL.jpeg','211013_500110fb-991d-459c-a9fb-0c314a54aefd.jpeg','image/jpeg',250870,'2021-10-13 16:03:04','U','1');

/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sessions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;

INSERT INTO `sessions` (`session_id`, `expires`, `data`)
VALUES
	(X'35357153614637754876795663693769534441764143316D62426F566C4F5861',1634708316,X'7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22736563757265223A66616C73652C22687474704F6E6C79223A747275652C2270617468223A222F227D2C2270617373706F7274223A7B2275736572223A31327D7D');

/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users_withdrawal
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users_withdrawal`;

CREATE TABLE `users_withdrawal` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT,
  `fidx` int unsigned NOT NULL COMMENT 'users -> idx',
  `msg` text COMMENT '탈퇴 사유',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '탈퇴일',
  PRIMARY KEY (`idx`),
  KEY `FIDX_KEY` (`fidx`),
  CONSTRAINT `FIDX_KEY` FOREIGN KEY (`fidx`) REFERENCES `users` (`idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users_withdrawal` WRITE;
/*!40000 ALTER TABLE `users_withdrawal` DISABLE KEYS */;

INSERT INTO `users_withdrawal` (`idx`, `fidx`, `msg`, `createdAt`)
VALUES
	(5,12,'ㄴㄴㄴ','2021-10-19 14:38:18');

/*!40000 ALTER TABLE `users_withdrawal` ENABLE KEYS */;
UNLOCK TABLES;

# Dump of table users_api
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users_api`;

CREATE TABLE `users_api` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT,
  `fidx` int unsigned DEFAULT NULL COMMENT 'users -> id',
  `domain` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '허용 가능 도메인',
  `apikey` varchar(255) DEFAULT NULL COMMENT 'uuid4',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1' COMMENT '0:사용안함 1:사용함',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users_api` WRITE;
/*!40000 ALTER TABLE `users_api` DISABLE KEYS */;

INSERT INTO `users_api` (`idx`, `fidx`, `domain`, `apikey`, `createdAt`, `status`)
VALUES
	(7,9,'http://127.0.0.1:3100,http://localhost:3100,http://127.0.0.1:3200,http://localhost:3200,https://lain-vue-book.web.app,http://127.0.0.1:3100/book,http://localhost:8080','902c79a5-d66b-4ba2-b018-08d15b47832d','2021-10-01 17:12:19','1');

/*!40000 ALTER TABLE `users_api` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users_sns
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users_sns`;

CREATE TABLE `users_sns` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT COMMENT '고유값',
  `fidx` int unsigned NOT NULL COMMENT 'user -> idx',
  `provider` enum('KA','NA') DEFAULT NULL COMMENT '''KA'', ''NA''',
  `snsid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT 'sns id',
  `snsName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '' COMMENT 'sns user name',
  `displayName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '' COMMENT 'sns display name',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '' COMMENT 'sns email',
  `profileURL` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '' COMMENT 'sns profile img',
  `accessToken` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '접근 token',
  `refreshToken` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '갱신 token',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '접속일',
  `status` enum('0','1','2','3','4','5','6','7','8','9') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '2' COMMENT '0:탈퇴, 1:유휴, 2:일반, 3:VIP, 9:관리자',
  PRIMARY KEY (`idx`),
  KEY `USER_IDX_KEY` (`fidx`),
  CONSTRAINT `USER_IDX_KEY` FOREIGN KEY (`fidx`) REFERENCES `users` (`idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users_sns` WRITE;
/*!40000 ALTER TABLE `users_sns` DISABLE KEYS */;

INSERT INTO `users_sns` (`idx`, `fidx`, `provider`, `snsid`, `snsName`, `displayName`, `email`, `profileURL`, `accessToken`, `refreshToken`, `createdAt`, `status`)
VALUES
	(8,12,'KA','1929312626','탁찬연','탁찬연','rhymeconqueror@gmail.com','http://k.kakaocdn.net/dn/HTtCK/btq5FhJI8UK/koyuMpMCofAj0myYdUP4t1/img_640x640.jpg','KktoLmStm7AsV3ltanO-ZV6NfMxMDmFq019VAAopb9UAAAF8OmT5eA','sCt1p0JzF-iKbETWqtKE1ZqDz1gircw6QkkQ3gopb9UAAAF8OmT5dg','2021-10-01 14:47:48','2'),
	(10,14,'NA','k6kih9lUJlhwStWdcuyd5hvk2VK8SZszOybdL_UMxM0','탁찬연','탁찬연','sliced_lime@naver.com','https://ssl.pstatic.net/static/pwe/address/img_profile.png','AAAAO14ka6ZUdCItHhrbzQ2rDgwGhev_rbyGdE5ZUqpHIVeUK9dqkgiW3la6XpJaOxzuAK1fv48e8guDbLgg-HkxZZE','83NPDGIdx1KQR0wv6Yn5xhBnVoo9iiQup0Gg7fmpisDfaUeBpg5TywziprDxuxs0Ksy8NuGSfFzmgrgbnbBCG8zXZ7WzHajSXWFNiiC5xVtHWIYBoGbhzjwADD03vzCpsEjA','2021-10-01 15:13:11','2');

/*!40000 ALTER TABLE `users_sns` ENABLE KEYS */;
UNLOCK TABLES;