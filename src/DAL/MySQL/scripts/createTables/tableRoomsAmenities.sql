use mirandahoteldb;
create table rooms_amenities(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    roomId INT NOT NULL,
    amenityId INT NOT NULL
);