-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 23, 2017 at 11:14 AM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skyapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE `car` (
  `id` int(100) NOT NULL,
  `carcode` varchar(100) NOT NULL,
  `location_from` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `location_to` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `chal` tinyint(1) NOT NULL,
  `iduser` int(100) NOT NULL,
  `carnumber` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`id`, `carcode`, `location_from`, `location_to`, `chal`, `iduser`, `carnumber`) VALUES
(1, '18B-16424', 'Giao Thủy - Nam Định', 'Giáp Bát - Hà Nội', 1, 2, 0),
(2, '18B-18424', 'Giao Thủy - Nam Định', 'Giáp Bát - Hà Nội', 1, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `goods`
--

CREATE TABLE `goods` (
  `id` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `mShip` varchar(100) NOT NULL,
  `mItem` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  `iduser` int(100) NOT NULL,
  `send` varchar(100) NOT NULL,
  `time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `goods`
--

INSERT INTO `goods` (`id`, `name`, `location`, `mShip`, `mItem`, `url`, `iduser`, `send`, `time`) VALUES
(1, 'Hang 1', 'Hà Nội', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150606'),
(2, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150611'),
(3, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150612'),
(4, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150615'),
(5, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150620'),
(6, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150620'),
(7, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150628'),
(8, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150606'),
(9, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150606'),
(10, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150606'),
(11, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150606'),
(12, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150606'),
(13, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150606'),
(14, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150606'),
(15, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150606'),
(16, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150606'),
(17, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150606'),
(18, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150606'),
(19, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150606'),
(20, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150606'),
(21, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150606'),
(22, 'Hang 1', 'Hanoi, Ho?n Ki?m, Hanoi, Vietnam', '100000', '2900', 'http://facebook.com', 1, 'thanh', '20170114_150606'),
(23, '', 'Hanoi, Hoàn Kiếm, Hanoi, Vietnam', '', '', 'http://facebook.com', 1, 'thanh', '20170115_015528');

-- --------------------------------------------------------

--
-- Table structure for table `historysell`
--

CREATE TABLE `historysell` (
  `id` int(100) NOT NULL,
  `iduser` int(100) NOT NULL,
  `idgood` int(100) NOT NULL,
  `time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `user` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `facebook` varchar(100) NOT NULL,
  `google` varchar(100) NOT NULL,
  `sel` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `user`, `pass`, `phone`, `address`, `facebook`, `google`, `sel`) VALUES
(1, 'thanh', 'thanh', '560b14e5c4a4c8d510a6db0b5845d66004033adeea4cedf0cab317ca732ab8df', '0868966978', 'Hà nội', 'https://www.facebook.com/dangcapfc.hoang', 'kekhong95@gmail.com', 0),
(2, 'thanh95', 'thanh95', '9a9c32976052c17d20d0ef61f850b0cc088a8bb77fbebb6c126cffcd164ef8a4', '0868966978', 'Hà nội', 'https://www.facebook.com/dangcapfc.hoang', 'kekhong95@gmail.com', 1),
(3, 'thanh95', 'thanh951', '9a9c32976052c17d20d0ef61f850b0cc088a8bb77fbebb6c126cffcd164ef8a4', '0868966978', 'Hà nội', 'https://www.facebook.com/dangcapfc.hoang', 'kekhong95@gmail.com', 1),
(4, 'thanh95', 'kekhong95@gmail.com', '9a9c32976052c17d20d0ef61f850b0cc088a8bb77fbebb6c126cffcd164ef8a4', '0868966978', 'Hà nội', 'https://www.facebook.com/dangcapfc.hoang', 'kekhong95@gmail.com', 1),
(5, 'thanh95', '826176137531115', '9a9c32976052c17d20d0ef61f850b0cc088a8bb77fbebb6c126cffcd164ef8a4', '0868966978', 'Hà nội', 'https://www.facebook.com/dangcapfc.hoang', 'kekhong95@gmail.com', 1),
(6, '', '', '095425b920bffb57c8d6a4925b7a4efe8219ee0f421087eaebdc7168ec7e229c', '', '', '', '', 0),
(7, '', '', '4ca9ad87814e15ee619c64f1c7da13c4df1a63b3cbc30ce425e5c238d2522a67', '', '', '', '', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `car`
--
ALTER TABLE `car`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `goods`
--
ALTER TABLE `goods`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
