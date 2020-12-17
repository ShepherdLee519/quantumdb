-- 新建文献表
CREATE TABLE IF NOT EXISTS `paper`(
	`paperid`	INT(8)			NOT NULL	AUTO_INCREMENT,

	`title` 	VARCHAR(255)	NOT NULL,
	`authors`	TEXT					,
	`abstract`	TEXT					,
	`year`		YEAR(4)					,

	PRIMARY KEY(`paperid`)

)ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- 新建作者表
CREATE TABLE IF NOT EXISTS `author`(
	`authorid`	INT(8)			NOT NULL	AUTO_INCREMENT,
	`name`		VARCHAR(50)		NOT NULL	UNIQUE KEY,

	PRIMARY KEY(`authorid`)

)ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- 新建文献-作者的关系表
CREATE TABLE IF NOT EXISTS `paperauthor`(
	`paperid`	INT(8)			NOT NULL,
	`authorid`	INT(8)			NOT NULL,
	`number`	INT(2)			NOT NULL,

	PRIMARY KEY(`paperid`, `authorid`)	,
	FOREIGN KEY(`paperid`)		REFERENCES paper(`paperid`),
	FOREIGN KEY(`authorid`)		REFERENCES author(`authorid`)

)ENGINE = InnoDB DEFAULT CHARSET = utf8;