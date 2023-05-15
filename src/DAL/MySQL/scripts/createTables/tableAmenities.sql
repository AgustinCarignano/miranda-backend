use mirandahoteldb;
CREATE TABLE amenities(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    item enum(
        "Air Conditioner",
        "High speed WiFi",
        "Breakfast",
        "Kitchen",
        "Cleaning",
        "Single Bed",
        "Shower",
        "Grocery",
        "Shop near",
        "Towels"
        )
);
CREATE TABLE rooms_amenities(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    roomId TINYINT NOT NULL,
    amenityId TINYINT NOT NULL
);
INSERT INTO amenities (ITEM ) VALUES ("Air Conditioner");
INSERT INTO amenities (ITEM ) VALUES ("High speed WiFi");
INSERT INTO amenities (ITEM ) VALUES ("Breakfast");
INSERT INTO amenities (ITEM ) VALUES ("Kitchen");
INSERT INTO amenities (ITEM ) VALUES ("Cleaning");
INSERT INTO amenities (ITEM ) VALUES ("Single Bed");
INSERT INTO amenities (ITEM ) VALUES ("Shower");
INSERT INTO amenities (ITEM ) VALUES ("Grocery");
INSERT INTO amenities (ITEM ) VALUES ("Shop near");
INSERT INTO amenities (ITEM ) VALUES ("Towels");