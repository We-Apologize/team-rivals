CREATE TABLE orders (
     orderId integer NOT NULL PRIMARY KEY AUTO_INCREMENT,
     email varchar(255) NOT NULL,
     amount varchar(255) NOT NULL,
     billing varchar(255) NOT NULL,
     deliveryAddress varchar(255) NOT NULL
);