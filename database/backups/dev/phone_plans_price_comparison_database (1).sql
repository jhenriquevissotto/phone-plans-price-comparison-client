/*
 Navicat Premium Data Transfer

 Source Server         : Localhost MS
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : phone_plans_price_comparison_database

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 31/05/2022 22:18:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for td_plan
-- ----------------------------
DROP TABLE IF EXISTS `td_plan`;
CREATE TABLE `td_plan`  (
  `sort` int NULL DEFAULT NULL,
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `slug_en` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `slug_pt` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name_en` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name_pt` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `freeMinutes` int NULL DEFAULT NULL,
  `premium` decimal(10, 2) NULL DEFAULT NULL,
  `subscriptionFee` decimal(10, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of td_plan
-- ----------------------------
INSERT INTO `td_plan` VALUES (3, 'talk-more-120', 'talk-more-120', 'fale-mais-120', 'Talk More 120', 'Fale Mais 120', 120, 0.10, 152.00);
INSERT INTO `td_plan` VALUES (1, 'talk-more-30', 'talk-more-30', 'fale-mais-30', 'Talk More 30', 'Fale Mais 30', 30, 0.10, 0.00);
INSERT INTO `td_plan` VALUES (2, 'talk-more-60', 'talk-more-60', 'fale-mais-60', 'Talk More 60', 'Fale Mais 60', 60, 0.10, 34.00);

-- ----------------------------
-- Table structure for td_region
-- ----------------------------
DROP TABLE IF EXISTS `td_region`;
CREATE TABLE `td_region`  (
  `id_code` int NOT NULL,
  `area` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_code`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of td_region
-- ----------------------------
INSERT INTO `td_region` VALUES (11, 'São Paulo');
INSERT INTO `td_region` VALUES (16, 'Ribeirão Preto e Região');
INSERT INTO `td_region` VALUES (17, 'São José do Rio Preto');
INSERT INTO `td_region` VALUES (18, 'Outras Regiões');

-- ----------------------------
-- Table structure for tr_price
-- ----------------------------
DROP TABLE IF EXISTS `tr_price`;
CREATE TABLE `tr_price`  (
  `fk_from` int NULL DEFAULT NULL,
  `fk_to` int NULL DEFAULT NULL,
  `feePerMin` decimal(10, 2) NULL DEFAULT NULL,
  INDEX `fk_from`(`fk_from`) USING BTREE,
  INDEX `fk_to`(`fk_to`) USING BTREE,
  CONSTRAINT `tr_price_ibfk_1` FOREIGN KEY (`fk_from`) REFERENCES `td_region` (`id_code`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `tr_price_ibfk_2` FOREIGN KEY (`fk_to`) REFERENCES `td_region` (`id_code`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tr_price
-- ----------------------------
INSERT INTO `tr_price` VALUES (11, 16, 1.90);
INSERT INTO `tr_price` VALUES (16, 11, 2.90);
INSERT INTO `tr_price` VALUES (11, 17, 1.70);
INSERT INTO `tr_price` VALUES (17, 11, 2.70);
INSERT INTO `tr_price` VALUES (11, 18, 0.90);
INSERT INTO `tr_price` VALUES (18, 11, 1.90);

SET FOREIGN_KEY_CHECKS = 1;
