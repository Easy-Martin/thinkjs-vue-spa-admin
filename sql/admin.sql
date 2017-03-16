/*
Navicat MySQL Data Transfer

Source Server         : MySQL
Source Server Version : 50625
Source Host           : localhost:3306
Source Database       : admin

Target Server Type    : MYSQL
Target Server Version : 50625
File Encoding         : 65001

Date: 2017-03-16 14:42:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for history
-- ----------------------------
DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `id` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '主键',
  `year` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '年份',
  `month` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '月份',
  `info` varchar(500) CHARACTER SET utf8 DEFAULT NULL COMMENT '记录信息',
  `date` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '发生完整日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of history
-- ----------------------------
INSERT INTO `history` VALUES ('1', '2006', '02', '团队开始进行禅机-佛教手机的研发，励志将手工艺与人类智慧推至前所未有的高峰。', '2006-02-01');
INSERT INTO `history` VALUES ('2', '2008', '6', '上海天禧嘉福信息科技发展有限公司正式注册成立，以3C品类产品销售为主，公司定\r位致力于中国电子商务市场的新型销售额渠道。', '2008-06-01');
INSERT INTO `history` VALUES ('3', '2008', '7', '天禧商城（B2C）上线，以销售各类3C产品为主，公司已成功推出自主品牌产品天禧-禅\r机佛教手机、天禧-爱时尚手机和天禧-声色 声纳音响，并逐步确立的企业发展路线。', '2008-01-01');
INSERT INTO `history` VALUES ('4', '2009', '1', '天禧商城线上销售额破千万，公司自主品牌被全国各大寺庙高僧及居士追捧，一度掀\r起禅机热潮。', '2009-01-01');
INSERT INTO `history` VALUES ('5', '2013', '6', '天禧嘉福成功获得法国乐慕情趣奢侈品品牌中国区唯一总代理授权，成为中国唯一总经销商。', '2013-06-01');
INSERT INTO `history` VALUES ('6', '2015', '12', '天禧嘉福成功获得英国情趣品牌PROJOY中国区唯一总经销权，成为中国唯一总经销商。', '2015-12-01');
INSERT INTO `history` VALUES ('7', '2016', '8', '法国乐慕天猫旗舰店正式上线。', '2016-08-01');
INSERT INTO `history` VALUES ('8', '2016', '9', '天禧嘉福签下权志龙个人品牌PEACEMINUSONE耳机中国线上唯一代理商。', '2016-09-01');

-- ----------------------------
-- Table structure for menu_sys
-- ----------------------------
DROP TABLE IF EXISTS `menu_sys`;
CREATE TABLE `menu_sys` (
  `menu_id` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '名称',
  `mark` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT 'vue-router标记',
  `allowed` varchar(1) CHARACTER SET utf8 DEFAULT NULL COMMENT '是否可用0可用1停用',
  `icon` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '图标',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of menu_sys
-- ----------------------------
INSERT INTO `menu_sys` VALUES ('5', '账户管理', 'account', '1', 'el-icon-more');
INSERT INTO `menu_sys` VALUES ('6', '个人设置', 'setting', '1', 'el-icon-setting');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `role_id` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '角色id',
  `type` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '类型',
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '类型名称',
  `parent_role_id` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '父级角色id'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('GI18NTs8h2fMwzv29SeN', '1', '管理员', null);
INSERT INTO `role` VALUES ('jucaLZ7cDCXDsCkMP5bd', '2', '运营人员', 'GI18NTs8h2fMwzv29SeN');

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu` (
  `role_id` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '角色id',
  `menu_id` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '菜单列表id'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
INSERT INTO `role_menu` VALUES ('GI18NTs8h2fMwzv29SeN', '1,2,3,4,5,6');
INSERT INTO `role_menu` VALUES ('jucaLZ7cDCXDsCkMP5bd', '1,2,3,4,6');

-- ----------------------------
-- Table structure for team
-- ----------------------------
DROP TABLE IF EXISTS `team`;
CREATE TABLE `team` (
  `id` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT 'ID主键',
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '名称',
  `office` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '职位',
  `description` varchar(500) CHARACTER SET utf8 DEFAULT NULL COMMENT '描述',
  `num` int(3) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of team
-- ----------------------------
INSERT INTO `team` VALUES ('1', 'TIGHER', 'CEO', '企业家&天使投资人，成功创立多个互联网科技公司，旗下手机研发项目在07年销售额超过4亿美金；目前拥有并运营包括360旗下O2O平台、韩国娱乐电商在内的多个成功项目。', '1');
INSERT INTO `team` VALUES ('2', 'COO JOY', '总经理', '香港大学 IMC硕士，10年电商行业经验曾是大旗集团、贵人鸟、茶马古道等多家知名公司电商负责人，阿里集团首批“淘品牌”运营顾问，曾服务于奔驰、宝马、飞利浦等国际品牌，15年曾负责汽车O2O项目整体商业规划和电商运营策略。', '2');
INSERT INTO `team` VALUES ('3', 'PAUL', '产品经理', '曾任职于上汽集团，负责门店管理和售后服务工作；后参加上汽“车享”项目，从事线下渠道管理，深入了解汽车行业在互联网时代的发展路径和方向略。', '3');
INSERT INTO `team` VALUES ('4', 'YANG', '设计主创', '清华大学， 博士学历，上海大学设计学院教授，曾任多家知名品牌设计顾问，从事互联网电商行业十几年，对用户需求和不同行业的特性了解深刻。', '4');
INSERT INTO `team` VALUES ('5', 'GIA', '设计主创', '曾就职于上汽集团，负责销售、门店运营、线下渠道等多种类工作，后从事于互联网汽车行业，深刻了解汽车和电商行业特性，拥有大量实践经验和行业资源略。', '5');
INSERT INTO `team` VALUES ('6', 'SIMBA', '市场总监', '英国萨塞克斯大学，国际管理硕士，曾任职于茶马古道和途虎养车网，负责电商运营和数据分析，善于通过数据分析整合提升用户体验，提升整体转化率。', '6');

-- ----------------------------
-- Table structure for user_sys
-- ----------------------------
DROP TABLE IF EXISTS `user_sys`;
CREATE TABLE `user_sys` (
  `uuid` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '主键',
  `role_id` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户角色ID',
  `update_time` varchar(30) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户更新时间',
  `create_time` varchar(30) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户创建时间',
  `username` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '登陆用户名',
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户昵称',
  `password` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '登录密码',
  `update_by` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '更新人员',
  `mobile` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '电话',
  `address` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '地址',
  `login_status` varchar(1) CHARACTER SET utf8 DEFAULT NULL COMMENT '登陆状态',
  `x_access_token` varchar(1000) CHARACTER SET utf8 DEFAULT NULL COMMENT '登陆token',
  `x_access_refresh_token` varchar(1000) CHARACTER SET utf8 DEFAULT NULL COMMENT '更新token',
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user_sys
-- ----------------------------
INSERT INTO `user_sys` VALUES ('FIsUzXrajrMAJz6RsVVAfsq6eZMIITND', 'GI18NTs8h2fMwzv29SeN', '2016-12-29 09:37:47', '2016-12-22 16:25:36', 'admin', '管理员', '868a78c039f9a776e459054e2a115445', 'admin', '18621775589', '上海市闵行区莲花路1000000000号', null, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiRklzVXpYcmFqck1BSno2UnNWVkFmc3E2ZVpNSUlUTkQiLCJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6IueuoeeQhuWRmCIsInJvbGVfaWQiOiJHSTE4TlRzOGgyZk13enYyOVNlTiIsImRlc2MiOiJ0b2tlbiIsImlhdCI6MTQ4OTYzODM2NiwiZXhwIjoxNDg5NjM4Mzg2fQ.Vgsa41s6RJA6_iidf8ghHPV1xVEL9dn4aYJ6PgOzXPk', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXNjIjoidXBkYXRlIHRva2VuIiwiaWF0IjoxNDg5NjMxNjQ5LCJleHAiOjE0OTAyMzY0NDl9.slhSHmbIoqBUxqEcL5mdHwRWAUvhzCOK55SGPOqIxLc');
