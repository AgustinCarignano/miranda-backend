use mirandahoteldb;
CREATE TABLE users(
    _id INT AUTO_INCREMENT PRIMARY KEY,
    photo TEXT NOT NULL,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    startDate DATETIME NOT NULL,
    `description` TEXT NOT NULL,
    contact VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL,
    `password` TEXT NOT NULL);