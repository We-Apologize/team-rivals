USE teamrivals;
CREATE TABLE `PRODUCT` (
	`productId` VARCHAR(50) NOT NULL,
	`name` VARCHAR(50) NOT NULL,
	`price` VARCHAR(50) NOT NULL,
	`category` VARCHAR(50) NOT NULL,
	`tag` VARCHAR(250),
	`image` VARCHAR(1000),
	PRIMARY KEY (`productId`)
);