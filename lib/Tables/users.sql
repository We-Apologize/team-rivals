CREATE TABLE users (
     userId integer NOT NULL PRIMARY KEY AUTO_INCREMENT,
     name varchar(255),
     email varchar(255) NOT NULL,
     password varchar(255) NOT NULL,
     role varchar(255),
     description varchar(255)
);