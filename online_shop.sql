/*
 Navicat Premium Data Transfer

 Source Server         : Local Mysql DB
 Source Server Type    : MySQL
 Source Server Version : 50733
 Source Host           : localhost:3306
 Source Schema         : online_shop

 Target Server Type    : MySQL
 Target Server Version : 50733
 File Encoding         : 65001

 Date: 24/05/2022 19:47:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for addresses
-- ----------------------------
DROP TABLE IF EXISTS `addresses`;
CREATE TABLE `addresses`  (
  `id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `title` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `address` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `primary` tinyint(1) NULL DEFAULT NULL,
  `userId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of addresses
-- ----------------------------
INSERT INTO `addresses` VALUES ('2ffcf708-dcf4-401c-b043-006597634f97', 'Alamat Kantor', 'Jl. Cendrawasih No. 61 Cengkareng Jakarta Barat', 0, '22b4841f-7d77-4b57-ab7e-146c6bb988ca', '2022-05-22 16:36:28', '2022-05-22 16:39:13');
INSERT INTO `addresses` VALUES ('ae1d5d7d-7019-41b7-a155-db23f4f3bc29', 'Alamat Rumah', 'Jl. Rawa Bengkel No. 113 D, Cengkareng Jakarta Barat', 0, '22b4841f-7d77-4b57-ab7e-146c6bb988ca', '2022-05-22 16:31:15', '2022-05-22 16:39:53');
INSERT INTO `addresses` VALUES ('b23db6cb-55c6-4181-ba1b-41f15cfca8cd', 'Alamat Rumah', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 1, 'c3d47c18-dbcc-4c5e-a789-b3567397da40', '2022-05-22 16:41:09', '2022-05-24 12:12:06');

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES ('0bec8a61-6803-4e9f-921c-8ec0e8cd060c', 'Sepatu', '2022-05-22 15:27:40', '2022-05-22 15:27:40');
INSERT INTO `categories` VALUES ('482bf6c7-a4ed-49fe-ba32-6f3be676cd32', 'Baju', '2022-05-22 15:27:25', '2022-05-22 15:27:25');
INSERT INTO `categories` VALUES ('895f4611-4a99-45a7-90be-46c780588898', 'Celana', '2022-05-22 15:27:32', '2022-05-22 15:27:32');
INSERT INTO `categories` VALUES ('e81d8dbe-d9ab-4791-8abe-f4e30257130d', 'Jaket', '2022-05-22 15:27:37', '2022-05-22 15:27:37');

-- ----------------------------
-- Table structure for detailorders
-- ----------------------------
DROP TABLE IF EXISTS `detailorders`;
CREATE TABLE `detailorders`  (
  `id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `price` double NULL DEFAULT NULL,
  `quantity` int(11) NULL DEFAULT NULL,
  `orderId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `productId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of detailorders
-- ----------------------------
INSERT INTO `detailorders` VALUES ('7e217d37-817a-40f2-9a9d-fa603c2ee308', 225000, 2, '4e57a11e-a714-423d-b5c4-8f63299ca604', '382f8db9-70c2-42dc-8a63-aa164030e007', '2022-05-23 18:55:36', '2022-05-23 18:55:36');
INSERT INTO `detailorders` VALUES ('f7351476-9e3f-45a5-994d-7310aafa3717', 125000, 2, '4e57a11e-a714-423d-b5c4-8f63299ca604', '565c1cc5-66e0-4ed1-832e-b65d55c2661f', '2022-05-23 18:55:36', '2022-05-23 18:55:36');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `status` enum('paid','unpaid') CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `buktiBayar` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `note` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `userId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `addressId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `paymentId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `shipmentId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('4e57a11e-a714-423d-b5c4-8f63299ca604', 'paid', '0d80c359-c35a-4fda-9841-dba55f2166f4miku1.jpg', NULL, 'c3d47c18-dbcc-4c5e-a789-b3567397da40', 'b23db6cb-55c6-4181-ba1b-41f15cfca8cd', 'adc98deb-a1c9-4331-b875-ad226f2a3aac', 'a41250a3-5131-4f61-b289-afb42b025c24', '2022-05-23 18:55:36', '2022-05-24 11:52:46');

-- ----------------------------
-- Table structure for payments
-- ----------------------------
DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments`  (
  `id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `bankName` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `accountName` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `accountNumber` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of payments
-- ----------------------------
INSERT INTO `payments` VALUES ('09e30ab6-914e-4a8b-9115-120a5cd53ffc', 'Mandiri', 'Satria Hanif', '1234-5678-9112-3323', '2022-05-23 12:41:52', '2022-05-23 12:42:50');
INSERT INTO `payments` VALUES ('adc98deb-a1c9-4331-b875-ad226f2a3aac', 'BCA', 'Satria Hanif', '1234-5678-9112-2232', '2022-05-22 15:34:00', '2022-05-22 15:34:00');
INSERT INTO `payments` VALUES ('e89770c7-7575-439b-8316-e48e240f3adb', 'BRI', 'Satria Hanif', '1234-5678-9112-2232', '2022-05-22 15:34:27', '2022-05-22 15:34:27');

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `price` double NULL DEFAULT NULL,
  `stock` int(11) NULL DEFAULT NULL,
  `size` enum('s','m','l','xl') CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `categoryId` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES ('382f8db9-70c2-42dc-8a63-aa164030e007', 'Nike Sport', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 225000, 0, 'm', 'https://www.sportsdirect.com/images/marketing/sd-new-mens-lp-new-arrivals-caro-2-360x360.jpg', '0bec8a61-6803-4e9f-921c-8ec0e8cd060c', '2022-05-22 15:56:53', '2022-05-23 18:55:36');
INSERT INTO `products` VALUES ('4501a298-f6de-4125-ac02-c906ba0d32ae', 'T-Shirt Handy', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 45000, 48, 's', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Blue_Tshirt.jpg/220px-Blue_Tshirt.jpg', '482bf6c7-a4ed-49fe-ba32-6f3be676cd32', '2022-05-22 15:50:06', '2022-05-22 17:14:57');
INSERT INTO `products` VALUES ('565c1cc5-66e0-4ed1-832e-b65d55c2661f', 'Hoodie Jacket', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 125000, 0, 'm', 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/912c54698016c03d4533f985af72ed356e5bd1ec_xxl-1.jpg', 'e81d8dbe-d9ab-4791-8abe-f4e30257130d', '2022-05-22 15:52:31', '2022-05-23 18:55:36');
INSERT INTO `products` VALUES ('5a6aac13-ea8a-402f-99fc-97847b3d374b', 'Hoodie Jacket 2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 145000, 45, 'l', 'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/10/7/25d2b9f7-f852-4611-bb25-9c137de92712.jpg', 'e81d8dbe-d9ab-4791-8abe-f4e30257130d', '2022-05-22 15:53:00', '2022-05-22 15:53:00');
INSERT INTO `products` VALUES ('68a07537-db24-4e3f-82a9-1f540d93d6c6', 'Trail Hiking Shoe', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 225000, 49, 'l', 'https://media.wired.com/photos/60149f34056378f4af9cf9f1/191:100/w_2580,c_limit/Gear-Topo-Athletic-Ultraventure-Pro.jpg', '0bec8a61-6803-4e9f-921c-8ec0e8cd060c', '2022-05-22 15:57:32', '2022-05-22 17:14:57');
INSERT INTO `products` VALUES ('6c8477fe-8d05-4525-920c-13955e9a39de', 'T-Shirt Handy 2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 45000, 50, 'm', 'https://3.imimg.com/data3/SU/HY/MY-11793958/blue-polo-tshirt-250x250.jpg', '482bf6c7-a4ed-49fe-ba32-6f3be676cd32', '2022-05-22 15:51:25', '2022-05-22 15:51:25');
INSERT INTO `products` VALUES ('a744527d-0805-4867-9aa8-8a203fff5465', 'Shock Jeans 2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 65000, 50, 'l', 'https://s3.bukalapak.com/img/87558465592/s-330-330/a2dc8a1a_ab83_4c8c_b998_7d3a048a226f.jpg.webp', '895f4611-4a99-45a7-90be-46c780588898', '2022-05-22 15:55:17', '2022-05-22 15:55:17');
INSERT INTO `products` VALUES ('da3562f4-4ea2-4b7f-94f1-a57afd006b0e', 'Shock Jeans', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 75000, 0, 'm', 'https://storage.sg.content-cdn.io/cdn-cgi/image/width=330,height=440,quality=75,format=auto,fit=cover,g=top/in-resources/ff5c6da1-2d74-4846-96c9-ccd65d766244/Images/ProductImages/Source/levis-mens-501-original-fit-jeans-005013186_01_Front.jpg', '895f4611-4a99-45a7-90be-46c780588898', '2022-05-22 15:54:20', '2022-05-23 18:49:45');

-- ----------------------------
-- Table structure for sequelizemeta
-- ----------------------------
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE `sequelizemeta`  (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sequelizemeta
-- ----------------------------
INSERT INTO `sequelizemeta` VALUES ('20220413145646-create-user.js');
INSERT INTO `sequelizemeta` VALUES ('20220413150859-create-category.js');
INSERT INTO `sequelizemeta` VALUES ('20220413151858-create-payment.js');
INSERT INTO `sequelizemeta` VALUES ('20220413153830-create-address.js');
INSERT INTO `sequelizemeta` VALUES ('20220415040533-create-products.js');
INSERT INTO `sequelizemeta` VALUES ('20220422064609-create-shipment.js');
INSERT INTO `sequelizemeta` VALUES ('20220422064955-create-detail-order.js');
INSERT INTO `sequelizemeta` VALUES ('20220429064755-create-order.js');

-- ----------------------------
-- Table structure for shipments
-- ----------------------------
DROP TABLE IF EXISTS `shipments`;
CREATE TABLE `shipments`  (
  `id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shipments
-- ----------------------------
INSERT INTO `shipments` VALUES ('a050eab2-d4ad-41fb-a52a-75b207f73826', 'J&T', '2022-05-22 15:42:44', '2022-05-22 15:42:44');
INSERT INTO `shipments` VALUES ('a41250a3-5131-4f61-b289-afb42b025c24', 'POS', '2022-05-22 15:42:48', '2022-05-22 15:42:48');
INSERT INTO `shipments` VALUES ('b12ddbf9-be32-463a-9c2a-cb86e0075858', 'JNE', '2022-05-22 15:42:38', '2022-05-22 15:42:38');
INSERT INTO `shipments` VALUES ('c3e14688-9ba0-47fd-adad-307a69ac7c5e', 'TiKi', '2022-05-22 15:42:53', '2022-05-22 15:42:53');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `fullname` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `role` enum('admin','customer') CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('22b4841f-7d77-4b57-ab7e-146c6bb988ca', 'angga', '$2b$12$PTEBpnLIKbgBKjLdKM8dC.afMgxPwmleQ54EwaaL5kPGlTDxSccZC', 'Angga Pratama', 'angganix@gmail.com', 'customer', '2022-05-22 16:08:07', '2022-05-22 16:08:07');
INSERT INTO `users` VALUES ('c3d47c18-dbcc-4c5e-a789-b3567397da40', 'satria', '$2b$12$xjFrBniJZeeAaHigHnkQpeqoF4lvOyNdnYOe5WaOxHDDwPlgB4YBi', 'Hanif Satria', 'satria@gmail.com', 'customer', '2022-05-22 15:20:04', '2022-05-22 15:20:04');
INSERT INTO `users` VALUES ('f94f779c-365e-4705-b896-1c9f50c2a245', 'admin', '$2b$12$tCWcXeYvFltSuxguG5TcNe1J0sazinJuBSEqG4.ulELipedd3ptpC', 'Administrator', 'admin@gmail.com', 'admin', '2022-05-22 15:20:25', '2022-05-22 15:20:25');

SET FOREIGN_KEY_CHECKS = 1;
