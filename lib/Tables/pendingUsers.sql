CREATE TABLE pendingUsers (
    userId INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME(6) DEFAULT(NOW())
);