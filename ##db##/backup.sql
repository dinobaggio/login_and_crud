-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versi server:                 10.1.30-MariaDB - mariadb.org binary distribution
-- OS Server:                    Win32
-- HeidiSQL Versi:               9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Membuang struktur basisdata untuk dblatihan
CREATE DATABASE IF NOT EXISTS `dblatihan` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `dblatihan`;

-- membuang struktur untuk table dblatihan.member
CREATE TABLE IF NOT EXISTS `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `status` enum('Super Admin','Admin','User') NOT NULL DEFAULT 'User',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- Membuang data untuk tabel dblatihan.member: ~3 rows (lebih kurang)
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` (`id`, `username`, `password`, `fullname`, `status`) VALUES
	(1, 'a', '1', 'LEON', 'Super Admin');
INSERT INTO `member` (`id`, `username`, `password`, `fullname`, `status`) VALUES
	(2, 'b', '2', 'NIDAS', 'Admin');
INSERT INTO `member` (`id`, `username`, `password`, `fullname`, `status`) VALUES
	(3, 'c', '3', 'DION', 'User');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;

-- membuang struktur untuk table dblatihan.student
CREATE TABLE IF NOT EXISTS `student` (
  `code` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `department` varchar(50) NOT NULL,
  `age` int(2) NOT NULL,
  `birthday` date NOT NULL,
  `salary` int(11) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- Membuang data untuk tabel dblatihan.student: ~3 rows (lebih kurang)
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` (`code`, `name`, `department`, `age`, `birthday`, `salary`) VALUES
	('001', 'LEON', 'IMF', 27, '1991-08-08', 1500000);
INSERT INTO `student` (`code`, `name`, `department`, `age`, `birthday`, `salary`) VALUES
	('002', 'LEONIDAS', 'PBB', 28, '1991-08-31', 25000000);
INSERT INTO `student` (`code`, `name`, `department`, `age`, `birthday`, `salary`) VALUES
	('003', 'DION', 'CIS', 22, '1996-06-11', 9000000);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;

-- membuang struktur untuk table dblatihan.tbhal1
CREATE TABLE IF NOT EXISTS `tbhal1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isi` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Membuang data untuk tabel dblatihan.tbhal1: ~3 rows (lebih kurang)
/*!40000 ALTER TABLE `tbhal1` DISABLE KEYS */;
INSERT INTO `tbhal1` (`id`, `isi`) VALUES
	(1, 'bla bla bla bla bla bla bla bla bla bla bla bla bl');
INSERT INTO `tbhal1` (`id`, `isi`) VALUES
	(2, 'xa xa xa xa xa xa xa xa xa xa ');
INSERT INTO `tbhal1` (`id`, `isi`) VALUES
	(3, 'wa wa wa wa wa wa wa wa wa wa ');
/*!40000 ALTER TABLE `tbhal1` ENABLE KEYS */;

-- membuang struktur untuk table dblatihan.tbhal2
CREATE TABLE IF NOT EXISTS `tbhal2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isi` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- Membuang data untuk tabel dblatihan.tbhal2: ~3 rows (lebih kurang)
/*!40000 ALTER TABLE `tbhal2` DISABLE KEYS */;
INSERT INTO `tbhal2` (`id`, `isi`) VALUES
	(1, 'aaaaaaaaa aaaaaa aaaaaaaa');
INSERT INTO `tbhal2` (`id`, `isi`) VALUES
	(2, 'bbbb bbbbbbb bbbbbbbbbbbbbbb');
INSERT INTO `tbhal2` (`id`, `isi`) VALUES
	(3, 'dd dddddd dddddd dddd ddddddddd');
/*!40000 ALTER TABLE `tbhal2` ENABLE KEYS */;

-- membuang struktur untuk table dblatihan.tbhal3
CREATE TABLE IF NOT EXISTS `tbhal3` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isi` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- Membuang data untuk tabel dblatihan.tbhal3: ~3 rows (lebih kurang)
/*!40000 ALTER TABLE `tbhal3` DISABLE KEYS */;
INSERT INTO `tbhal3` (`id`, `isi`) VALUES
	(1, 'xxxx xxxxxxxx xx');
INSERT INTO `tbhal3` (`id`, `isi`) VALUES
	(2, 'yy yyyyyyy yyy yyyyyyyy');
INSERT INTO `tbhal3` (`id`, `isi`) VALUES
	(3, 'zzzzzz zzzzzz zzzzzzzzzzzzzzzzzzzzzzzz');
/*!40000 ALTER TABLE `tbhal3` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
