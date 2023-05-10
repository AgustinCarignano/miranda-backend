use mirandahoteldb;
CREATE TABLE rooms(
    id INT AUTO_INCREMENT PRIMARY KEY,
    photos TEXT NOT NULL,
    roomType VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    roomNumber INT NOT NULL,
    offer BOOLEAN NOT NULL,
    price INT NOT NULL,
    discount INT,
    cancellation TEXT NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    amenities TEXT NOT NULL
)