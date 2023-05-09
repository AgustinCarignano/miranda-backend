#CREATE DATABASE mirandahoteldb;
use mirandahoteldb;
CREATE TABLE bookings(
id INT AUTO_INCREMENT PRIMARY KEY,
guest TEXT NOT NULL,
specialRequest TEXT,
orderDate DATETIME NOT NULL,
roomType VARCHAR(255) NOT NULL,
`status` VARCHAR(255) NOT NULL,
checkIn DATETIME NOT NULL,
checkOut DATETIME NOT NULL,
roomId INT NOT NULL,
roomNumber INT NOT NULL,
roomImg TEXT NOT NULL);
