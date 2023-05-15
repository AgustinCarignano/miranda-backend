use mirandahoteldb;
CREATE TABLE room_photos(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    roomId TINYINT NOT NULL,
    url TEXT NOT NULL
);