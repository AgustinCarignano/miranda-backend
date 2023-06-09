use mirandahoteldb;
CREATE TABLE rooms(
    _id INT AUTO_INCREMENT PRIMARY KEY,
    photos TEXT NOT NULL,
    roomType enum(
      "Suite",
      "Double Superior",
      "Double Bed",
      "Single Bed"
    ) NOT NULL,
    description TEXT NOT NULL,
    roomNumber INT NOT NULL,
    offer BOOLEAN NOT NULL,
    price INT NOT NULL,
    discount INT NOT NULL,
    cancellation TEXT NOT NULL,
    `status` enum(
      "Available",
      "Booked"
    ) NOT NULL,
    amenities TEXT NOT NULL
)

-- photos TEXT NOT NULL,
-- amenities TEXT NOT NULL