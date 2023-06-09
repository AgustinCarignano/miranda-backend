USE mirandahoteldb;
CREATE TABLE contacts(
    _id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    date DATETIME NOT NULL default current_timestamp,
    _read BOOLEAN NOT NULL default false,
    archived BOOLEAN NOT NULL default false
);