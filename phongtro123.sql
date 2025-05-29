-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2023 at 04:48 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `phongtro123`
--

-- --------------------------------------------------------

--
-- Table structure for table `arearanges`
--

CREATE TABLE `arearanges` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `from` int(11) DEFAULT NULL,
  `to` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `arearanges`
--

INSERT INTO `arearanges` (`id`, `title`, `from`, `to`, `createdAt`, `updatedAt`) VALUES
(1, 'Dưới 20 m2', 0, 20, '2023-03-28 19:55:20', '2023-04-29 09:31:52'),
(2, 'Từ 20 - 30 m2', 20, 30, '2023-03-30 14:57:01', '2023-03-30 14:57:01'),
(3, 'Từ 30 - 50 m2', 30, 50, '2023-03-30 14:57:53', '2023-03-30 14:57:53'),
(4, 'Từ 50 - 70 m2', 50, 70, '2023-03-30 14:58:18', '2023-03-30 14:58:18'),
(5, 'Từ 70 - 90 m2', 70, 90, '2023-03-30 14:58:34', '2023-03-30 14:58:34'),
(6, 'Trên 90 m2', 90, 999999999, '2023-03-30 14:59:32', '2023-03-30 14:59:32');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `header` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subheader` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`, `header`, `subheader`, `createdAt`, `updatedAt`) VALUES
(2, 'Cho thuê phòng trọ', 'Cho Thuê Phòng Trọ, Giá Rẻ, Tiện Nghi, Mới Nhất 2023', 'Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, phòng trọ sinh viên, phòng trọ cao cấp mới nhất năm 2022. Tất cả nhà trọ cho thuê giá tốt nhất tại Việt Nam.', '2023-03-30 11:21:55', '2023-03-30 11:21:55'),
(3, 'Tìm người ở ghép', 'Tìm Người Ở Ghép, Tìm Nam Ở Ghép, Tìm Nữ Ở Ghép, Mới Nhất 2023', 'Tìm người ở ghép, tìm nam ở ghép, tìm nữ ở ghép, share phòng trọ, tìm chỗ ở ghép cùng, tìm bạn ở ghép, xin ở ghép mới nhất 2023. Đăng tin ở ghép hiệu quả, nhanh chóng nhất...', '2023-03-28 19:55:10', '2023-04-29 14:28:07');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `postId`, `userId`, `createdAt`, `updatedAt`) VALUES
(43, 34, 1, '2023-04-30 15:09:08', '2023-04-30 15:09:08');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fileName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `url`, `fileName`, `postId`, `createdAt`, `updatedAt`) VALUES
(147, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682837548/phongtro123/qdaateulqj4xpwedpwlv.jpg', NULL, 30, '2023-04-30 13:54:18', '2023-04-30 13:54:18'),
(148, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682837549/phongtro123/nnjfwnveopdcygsfjz3h.jpg', NULL, 30, '2023-04-30 13:54:18', '2023-04-30 13:54:18'),
(149, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682837550/phongtro123/npyouffthkevby4zh9wl.jpg', NULL, 30, '2023-04-30 13:54:18', '2023-04-30 13:54:18'),
(150, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682837550/phongtro123/vgnozwlhf2ptmfx0gu5k.jpg', NULL, 30, '2023-04-30 13:54:18', '2023-04-30 13:54:18'),
(151, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682837551/phongtro123/mkpp1nsy9hzfjsl1rhox.jpg', NULL, 30, '2023-04-30 13:54:18', '2023-04-30 13:54:18'),
(152, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682837552/phongtro123/kwfxv8wna2ajo7mridbo.jpg', NULL, 30, '2023-04-30 13:54:18', '2023-04-30 13:54:18'),
(153, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682837552/phongtro123/y1mloqxfnrirylr5xvko.jpg', NULL, 30, '2023-04-30 13:54:18', '2023-04-30 13:54:18'),
(154, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682837553/phongtro123/xxzfbnzbtdbx6m3iixuk.jpg', NULL, 30, '2023-04-30 13:54:18', '2023-04-30 13:54:18'),
(155, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682837554/phongtro123/vcewqhrm0ikx3grtzth4.jpg', NULL, 30, '2023-04-30 13:54:18', '2023-04-30 13:54:18'),
(156, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682837554/phongtro123/f6dyhr3fslgcmf5blnei.jpg', NULL, 30, '2023-04-30 13:54:18', '2023-04-30 13:54:18'),
(157, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682838604/phongtro123/trge8kbcfkm7nhi8t2nb.jpg', NULL, 31, '2023-04-30 14:11:58', '2023-04-30 14:11:58'),
(158, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682838605/phongtro123/mi9kcoo3snmj1oxgu0qx.jpg', NULL, 31, '2023-04-30 14:11:58', '2023-04-30 14:11:58'),
(159, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682838606/phongtro123/pydbz0vxt0jald1snic4.jpg', NULL, 31, '2023-04-30 14:11:58', '2023-04-30 14:11:58'),
(160, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682838606/phongtro123/lri4xgp9if3zrxhcieyv.jpg', NULL, 31, '2023-04-30 14:11:58', '2023-04-30 14:11:58'),
(161, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682838607/phongtro123/kkfuhb0smczhtzhssvff.jpg', NULL, 31, '2023-04-30 14:11:58', '2023-04-30 14:11:58'),
(162, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682838608/phongtro123/vumpces1pkmyulxsrzwj.jpg', NULL, 31, '2023-04-30 14:11:58', '2023-04-30 14:11:58'),
(163, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682839748/phongtro123/kuqp2fjjuj7e4ehkshpk.jpg', NULL, 32, '2023-04-30 14:31:23', '2023-04-30 14:31:23'),
(164, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682839749/phongtro123/tbbd18om5ajg5ccgsjub.jpg', NULL, 32, '2023-04-30 14:31:23', '2023-04-30 14:31:23'),
(165, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682839750/phongtro123/mmugh8ts0dokmk1ihqsv.jpg', NULL, 32, '2023-04-30 14:31:23', '2023-04-30 14:31:23'),
(166, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682839751/phongtro123/mioployetpqz7suosoji.jpg', NULL, 32, '2023-04-30 14:31:23', '2023-04-30 14:31:23'),
(167, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682839751/phongtro123/km2lrar7d2ptjnvdb82s.jpg', NULL, 32, '2023-04-30 14:31:23', '2023-04-30 14:31:23'),
(168, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682841557/phongtro123/y3c8nxe0ebzuzs32c7cg.jpg', NULL, 33, '2023-04-30 14:59:59', '2023-04-30 14:59:59'),
(169, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682841558/phongtro123/xdgewxxfrni9vk2stsjx.jpg', NULL, 33, '2023-04-30 14:59:59', '2023-04-30 14:59:59'),
(170, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682841558/phongtro123/smyizgdfu5ic8ppd8vvt.jpg', NULL, 33, '2023-04-30 14:59:59', '2023-04-30 14:59:59'),
(171, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682841559/phongtro123/kiilap9oouch54v6yhne.jpg', NULL, 33, '2023-04-30 14:59:59', '2023-04-30 14:59:59'),
(172, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682841559/phongtro123/nqhuu0sutbpiy5klrphg.jpg', NULL, 33, '2023-04-30 14:59:59', '2023-04-30 14:59:59'),
(173, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682841731/phongtro123/cqslvukb9pielsdgshjc.jpg', NULL, 34, '2023-04-30 15:02:26', '2023-04-30 15:02:26'),
(174, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682841732/phongtro123/uxgcmqvsfebzk8tf2yne.jpg', NULL, 34, '2023-04-30 15:02:26', '2023-04-30 15:02:26'),
(175, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682841733/phongtro123/bdin2wucvgluucspjdno.jpg', NULL, 34, '2023-04-30 15:02:26', '2023-04-30 15:02:26'),
(176, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682841733/phongtro123/uotzqtbtxxfd6ov8ieiq.jpg', NULL, 34, '2023-04-30 15:02:26', '2023-04-30 15:02:26'),
(177, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682841734/phongtro123/hqv6lwmtzmbjireesbo6.jpg', NULL, 34, '2023-04-30 15:02:26', '2023-04-30 15:02:26'),
(178, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682841735/phongtro123/uqlksoekdteajocxfcgf.jpg', NULL, 34, '2023-04-30 15:02:26', '2023-04-30 15:02:26'),
(179, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682841735/phongtro123/cg0qgm2boirpw8biaqfn.jpg', NULL, 34, '2023-04-30 15:02:26', '2023-04-30 15:02:26'),
(180, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682841736/phongtro123/w2vegak6bohhoc6ll0st.jpg', NULL, 34, '2023-04-30 15:02:26', '2023-04-30 15:02:26'),
(181, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682841737/phongtro123/qtglejs20naowahqhvwh.jpg', NULL, 34, '2023-04-30 15:02:26', '2023-04-30 15:02:26'),
(182, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682841737/phongtro123/pfcs8paifhmfcndk6cbm.jpg', NULL, 34, '2023-04-30 15:02:26', '2023-04-30 15:02:26'),
(183, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682841738/phongtro123/pkcrvazstmt8nyjpg8uf.jpg', NULL, 34, '2023-04-30 15:02:26', '2023-04-30 15:02:26'),
(184, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682841739/phongtro123/b1hupadsdgvuhuxx6sqv.jpg', NULL, 34, '2023-04-30 15:02:26', '2023-04-30 15:02:26'),
(185, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682843453/phongtro123/j05ypdzqaashptmoz3mc.jpg', NULL, 35, '2023-04-30 15:31:08', '2023-04-30 15:31:08'),
(186, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682843454/phongtro123/z8rn4oh9cqvpiinzuzaf.jpg', NULL, 35, '2023-04-30 15:31:08', '2023-04-30 15:31:08'),
(187, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682843455/phongtro123/p7nw46b5yyqrzgyvzcad.jpg', NULL, 35, '2023-04-30 15:31:08', '2023-04-30 15:31:08'),
(188, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682843456/phongtro123/tfe6vov435909quhjwjy.jpg', NULL, 35, '2023-04-30 15:31:08', '2023-04-30 15:31:08'),
(189, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682844856/phongtro123/puang5k7bherd9ycknmx.jpg', NULL, 36, '2023-04-30 15:56:19', '2023-04-30 15:56:19'),
(190, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682844856/phongtro123/bkdkntlngicpkecahko8.jpg', NULL, 36, '2023-04-30 15:56:19', '2023-04-30 15:56:19'),
(191, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682844857/phongtro123/ix90w3tw5wvmxnns9etz.jpg', NULL, 36, '2023-04-30 15:56:19', '2023-04-30 15:56:19'),
(192, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682844858/phongtro123/fhm3enzgkvgtewp59kzp.jpg', NULL, 36, '2023-04-30 15:56:19', '2023-04-30 15:56:19'),
(193, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682844859/phongtro123/fvmwv18h6aqpvkeoqtz2.jpg', NULL, 36, '2023-04-30 15:56:19', '2023-04-30 15:56:19'),
(194, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682844859/phongtro123/emidpaeec49wmz1chuqy.jpg', NULL, 36, '2023-04-30 15:56:19', '2023-04-30 15:56:19'),
(195, 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682844860/phongtro123/qctikrw6gy7rr3hfj6fw.jpg', NULL, 36, '2023-04-30 15:56:19', '2023-04-30 15:56:19');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `area` int(11) DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryId` int(11) NOT NULL,
  `province` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `priceRangeId` int(11) NOT NULL,
  `areaRangeId` int(11) NOT NULL,
  `status` enum('SHOW','HIDE') COLLATE utf8mb4_unicode_ci DEFAULT 'HIDE',
  `target` enum('ALL','MALE','FEMALE') COLLATE utf8mb4_unicode_ci DEFAULT 'ALL',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `description`, `price`, `area`, `address`, `categoryId`, `province`, `userId`, `priceRangeId`, `areaRangeId`, `status`, `target`, `createdAt`, `updatedAt`) VALUES
(30, 'PHÒNG TRỌ ĐỐI DIỆN KS 5 SAO TÂN SƠN NHẤT MỚI XÂY RẤT ĐẸP - GẦN CÔNG VIÊN HOÀNG VĂN THỤ', '- Phòng đẹp nằm ngay trung tâm quận Phú Nhuận (xem hình thật). View trước là đối diện Khách Sạn 3* Tân Sơn Nhất, View sau là đường Nguyễn Văn Trỗi.\n\n+ Phòng mới rất đẹp được ốp lát gạch, tất cả các phòng đều có CỬA SỔ, CÓ BAN CÔNG, MÁY LẠNH, Rèm cửa. Rất thoáng mát.\n\n- Bỏ xe dưới tầng hầm, có bảo vệ trong coi, Sân thượng phơi quần áo có mái che, có 02 bộ ghế đá ngồi thư giản.\n\n- Trong nhà có Thang máy đi lại, Có Camera an ninh quan sát.\n\n- Toilet riêng, đặc biệt có BẾP nấu ăn.\n\n- Internet cáp quang lắp đặt trong phòng rất mạnh. Cáp Tivi.\n\n- Bảo vệ trong coi 24/24 giúp Bạn có cảm giác an toàn, khóa vân tay giờ giấc tự do.\n\n- Diện tích: 25 - 40 m2.\n\n+ Giá: 5tr/tháng.\n\n(MỜI BẠN ĐẾN XEM, CÓ BẢO VỆ DẪN BẠN XEM)\n\n+ Địa chỉ: 205/10A Hoàng Văn Thụ, P.8, Phú Nhuận, Tp. Hồ Chí Minh.', 5000000, 25, 'Phường 08, Quận Phú Nhuận, Thành phố Hồ Chí Minh', 2, 'Thành phố Hồ Chí Minh', 1, 5, 2, 'SHOW', 'ALL', '2023-04-30 13:54:18', '2023-04-30 13:54:54'),
(31, 'Cho thuê phòng trọ khu X2A, Yên sở, Hoàng Mai, Hà Nội ( Cạnh chung cư Hateco Hoàng mai)', 'Cho thuê nhà trọ, phòng trọ tại Đường Vành Đai 3, Phường Yên Sở, Quận Hoàng Mai, Hà Nội, ở trên đường Pháp Vân cách bến xe nước Ngầm 1,5km, nhà nằm phía sau khu chung cư Hateco Hoàng Mai, lối vào là cổng khu Tái Định cư X2A , đường rộng thoáng đãng , đường trước nhà 2 ô tô tải tránh nhau thoải mái, diện tích nhà khoảng 16 m2, diện tích sử dụng gồm ban công và nhà tắm trên 25 m2, nhà xây cao tầng như phòng nghỉ khách sạn.nhà trong khu tái định cư đuờng rất rộng và thoáng mát. nhà lát đá hoa ,sơn tường sạch đẹp, công trình phụ khép kín đầy đủ tiện nghi ,riêng biệt,có bình nóng lạnh,vòi hoa sen,bồn cầu xí bệt...có mạng internet ra các phòng. giá từ 1.8 đến 2.5 tr tuỳ phòng\n\nChủ nhà : Chú Thuật 0912043517\n\nĐịa chỉ chi tiết: 76, Đường Vành Đai 3, Phường Yên Sở, Quận Hoàng Mai, Hà Nội', 2000000, 25, 'Phường Yên Sở, Quận Hoàng Mai, Thành phố Hà Nội', 2, 'Thành phố Hà Nội', 1, 3, 2, 'SHOW', 'ALL', '2023-04-30 14:11:58', '2023-04-30 14:12:07'),
(32, 'Cho thuê phòng trọ khu vực Ninh Kiều. Trong khu dân cư Hàng Bàng', 'Vị trí: trong KDC Hàng Bàng ( đường Nguyễn Văn Linh)- Phường An Khánh, Quận Ninh Kiều, TP Cần Thơ\n\nNội thất bao gồm:\n\nMáy lạnh,quạt ,kệ bếp,gác lững, có máy nước nóng lạnh.... chỗ đậu xe riêng,có khóa vân tay an toàn.....rất yên tĩnh,...giờ giấc tự do,tự quản,....Gần ĐHYD,FPT,...\n\nGẦN\n\n-Chợ,siêu thị\n\n-Bệnh viện Đại học y dược,\n\n-bệnh viện đa khoa trung ương\n\n-BV phương châu\n\nCHO NUÔI THÚ CƯNG\n\nCọc 1 tháng\n\nGiá : 2.200.000 VND', 2200000, 16, 'Phường An Khánh, Quận Ninh Kiều, Thành phố Cần Thơ', 2, 'Thành phố Cần Thơ', 2, 3, 1, 'SHOW', 'ALL', '2023-04-30 14:31:23', '2023-04-30 15:07:46'),
(33, 'Cần tìm từ 1 đến 2 người ở ghép tại Tân Bình', 'Cần tìm 1 đến 2 người ở ghép tại 25/26 Lê Duy Nhuận Phường 12 Tân Bình\n\nPhòng rộng thoáng mát, có gác, ở 3 người.\n\nCó nhà xe rộng, có thang máy, có máy giặt, có dịch vụ dọn vệ sinh, bảo vệ, giờ giấc tự do ra vào bằng vân tay.\n\nƯu tiên người ít đồ vì phòng đã đầy đủ tiện nghi.', 1500000, 30, 'Phường 12, Quận Tân Bình, Thành phố Hồ Chí Minh', 3, 'Thành phố Hồ Chí Minh', 2, 2, 3, 'SHOW', 'MALE', '2023-04-30 14:59:59', '2023-04-30 15:07:36'),
(34, 'Phòng trọ cho thuê mới, sạch sẽ, hiện đại, giá rẻ tại cuối đường Phan Khoang, Hoà An,Cẩm Lệ', 'Phòng mới xây mặt tiền đường 5.5m, ô tô vào tới cửa, điện tích rộng, có gác lửng, thoáng mát, mỗi phòng có 3 cửa sổ, wc hiện đại dạng khách sạn, có vòi sen cây, có bồn rửa mặt, gương soi, có chỗ phơi quần áo riêng, ra vào độc lập không giới hạn thời gian, không ở chung với chủ, mở cửa bằng vân tay, có chỗ để xe rộng an toàn tuyệt đối, có nhiều camera chống trộm, wifi miễn phí. Điện 2.000₫/chữ. Có 1 phòng trống ngày 1/5/2023', 1900000, 22, 'Phường Hòa An, Quận Cẩm Lệ, Thành phố Đà Nẵng', 2, 'Thành phố Đà Nẵng', 2, 2, 2, 'SHOW', 'ALL', '2023-04-30 15:02:26', '2023-04-30 15:07:39'),
(35, 'Mình cần tìm 1 bạn nam ở ghép để giảm chi phí sinh hoạt', 'Mình cần 1 bạn nam ở ghép cho bớt chi phí. Phòng 30m2 khép kín .sạch sẽ thoáng mát. Đồ đạc mình đã sắm đầy đủ chủ việc đến ở. Giá thuê phòng là 1tr/6 tháng. ( có thể chia 2 hoặc 3n. Cả điện nước rơi vào tầm hơn 8 trăm/ người).\n\n- Có ban công chill, có thể tập thể dục, phơi đồ,...\n\n- trọ phòng yên tĩnh\n\n- Điện 3.500, nước 20k/tháng\n\n- Chỗ để xe, wifi\n\n- GIỜ GIẤC TỰ DO\n\n- Gần chợ (300m), đại học Cần thơ (500m), bách hoá xanh, satra food, quán ăn.\n\nYÊU CẦU: vì chị là người sạch sẽ nên cũng muốn bạn vào ở sạch sẽ chút và trung thực nữa nhé\n\nBạn nào có nhu cầu lh 0375990759', 800000, 30, 'Phường Hưng Lợi, Quận Ninh Kiều, Thành phố Cần Thơ', 3, 'Thành phố Cần Thơ', 1, 1, 3, 'SHOW', 'FEMALE', '2023-04-30 15:31:08', '2023-04-30 15:31:17'),
(36, 'Trọ mới xây tinh tưới giá chỉ 3,5 triệu nội thất máy lạnh, tủ', 'Trọ mới xây tinh tưới giá chỉ 3,5 triệu\n\nBầu Cát, Tân Bình, vị trí thuận tiện đi các quận trung tâm.\n\nNội thất : Máy lạnh, tủ lạnh, tủ đồ, kệ bếp\n\nGác cao, hành lang rộng, máy giặt chung, sân phơi đồ sân thượng rộng rãi, bãi xe lớn.\n\n/-thanks Giờ giấc tự do, cửa vân tay an ninh 24/24\n\n️0792352046️', 3500000, 32, 'Phường 14, Quận Tân Bình, Thành phố Hồ Chí Minh', 2, 'Thành phố Hồ Chí Minh', 1, 4, 3, 'SHOW', 'ALL', '2023-04-30 15:56:19', '2023-04-30 16:08:06');

-- --------------------------------------------------------

--
-- Table structure for table `priceranges`
--

CREATE TABLE `priceranges` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `from` int(11) DEFAULT NULL,
  `to` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `priceranges`
--

INSERT INTO `priceranges` (`id`, `title`, `from`, `to`, `createdAt`, `updatedAt`) VALUES
(1, 'Dưới 1 triệu', 0, 1000000, '2023-03-28 19:55:16', '2023-04-29 10:07:40'),
(2, 'Từ 1 - 2 triệu', 1000000, 2000000, '2023-03-30 14:50:58', '2023-03-30 14:50:58'),
(3, 'Từ 2 - 3 triệu', 2000000, 3000000, '2023-03-30 14:51:20', '2023-03-30 14:51:20'),
(4, 'Từ 3 đến 5 triệu', 3000000, 5000000, '2023-03-30 14:52:03', '2023-04-27 22:16:27'),
(5, 'Từ 5 - 7 triệu', 5000000, 7000000, '2023-03-30 14:52:23', '2023-03-30 14:52:23'),
(6, 'Từ 7 - 10 triệu', 7000000, 10000000, '2023-03-30 14:52:47', '2023-03-30 14:52:47'),
(7, 'Từ 10 - 15 triệu', 10000000, 15000000, '2023-03-30 14:53:21', '2023-04-28 21:04:46'),
(8, 'Trên 15 triệu', 15000000, 999999999, '2023-03-30 14:54:04', '2023-04-27 23:13:49');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230323163709-create-category.js'),
('20230323165028-create-price-range.js'),
('20230323165147-create-area-range.js'),
('20230323170050-create-user.js'),
('20230323170430-create-post.js'),
('20230323171735-create-image.js'),
('20230323171736-create-favorite.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('admin','user') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fileNameAvatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `password`, `phone`, `email`, `role`, `avatar`, `fileNameAvatar`, `createdAt`, `updatedAt`) VALUES
(1, 'Quản trị viên', '$2a$12$sVlb3n7Hjfn9qxMfwoKSluWiwonZmSgGqEY9ey7FOaWKEdeM54Dee', '0945115260', 'nhanchidanh@gmail.com', 'admin', 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682844128/phongtro123/ftauevtshzujsnq5jtol.jpg', NULL, '2023-03-28 19:52:52', '2023-04-30 15:42:13'),
(2, 'Thao Suong', '$2a$12$ex0m44ngVbYfOYi9gmvMoOcV9Pu7aDja7Zlf.8SiLCoeaRI0gAdM.', '0932876480', 'suong@gmail.com', 'user', 'https://res.cloudinary.com/dy3lnh5kz/image/upload/v1682846273/phongtro123/flyxgrc7schbowsmlzjr.jpg', NULL, '2023-03-30 09:54:23', '2023-04-30 16:18:54'),
(5, 'Phan Van Cuong', '$2a$12$gLXP9Dz1xSSbP0th2S7/dOViI9Ji6UtecAHqJpw/6srbR.EcM2G8m', '0947353547', 'cuong@gmail.com', 'user', NULL, NULL, '2023-04-29 16:00:03', '2023-04-29 16:00:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `arearanges`
--
ALTER TABLE `arearanges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favorites_ibfk_1` (`postId`),
  ADD KEY `favorites_ibfk_2` (`userId`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `images_ibfk_1` (`postId`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_ibfk_1` (`categoryId`),
  ADD KEY `posts_ibfk_2` (`userId`),
  ADD KEY `posts_ibfk_3` (`priceRangeId`),
  ADD KEY `posts_ibfk_4` (`areaRangeId`);

--
-- Indexes for table `priceranges`
--
ALTER TABLE `priceranges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `arearanges`
--
ALTER TABLE `arearanges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=196;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `priceranges`
--
ALTER TABLE `priceranges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_3` FOREIGN KEY (`priceRangeId`) REFERENCES `priceranges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_4` FOREIGN KEY (`areaRangeId`) REFERENCES `arearanges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
