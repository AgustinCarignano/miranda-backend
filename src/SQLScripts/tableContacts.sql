USE mirandahoteldb;
CREATE TABLE contacts(
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    date DATETIME NOT NULL,
    _read BOOLEAN NOT NULL,
    archived BOOLEAN NOT NULL
);