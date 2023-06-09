import { faker } from "@faker-js/faker";
import { OkPacket } from "mysql2";
import { DBQuery } from "../config";

const amenitiesList = [
  "Air Conditioner",
  "High speed WiFi",
  "Breakfast",
  "Kitchen",
  "Cleaning",
  "Single Bed",
  "Shower",
  "Grocery",
  "Shop near",
  "Towels",
];

const photos = {
  Suite:
    "https://i.imgur.com/wRHoim3.jpg, https://i.imgur.com/TbyGZM3.jpg, https://i.imgur.com/ojDojnx.png",
  "Double Superior":
    "https://i.imgur.com/1zVmQkU.jpg, https://i.imgur.com/YdvJYpY.png, https://i.imgur.com/y7VB7is.jpg",
  "Double Bed":
    "https://i.imgur.com/jhYMa8y.jpg, https://i.imgur.com/6z7zec2.png, https://i.imgur.com/US4oVWs.png",
  "Single Bed":
    "https://i.imgur.com/gaQXf7t.png, https://i.imgur.com/GuXoiOX.png, https://i.imgur.com/JfDFjih.jpg",
};

function generateRoom() {
  let isOffer = faker.helpers.maybe(() => true, { probability: 0.3 }) || false;
  let randomLength = Math.round(Math.random() * 5) + 5;
  let roomType: keyof typeof photos = faker.helpers.arrayElement([
    "Suite",
    "Double Superior",
    "Double Bed",
    "Single Bed",
  ]);
  return {
    photos: photos[roomType],
    roomType: roomType,
    description: faker.lorem.paragraph(),
    roomNumber: faker.datatype.number(999),
    offer: isOffer ? 1 : 0,
    price: faker.commerce.price(250, 1250, 0),
    discount: isOffer ? faker.helpers.arrayElement([5, 10, 15]) : 0,
    cancellation: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(["Available", "Booked"]),
    amenities: faker.helpers
      .arrayElements(amenitiesList, randomLength)
      .join(","),
  };
}

export async function populateRooms(total: number) {
  for (let i = 0; i < total; i++) {
    const room = generateRoom();
    await DBQuery<OkPacket>(
      "INSERT INTO rooms (photos, roomType, description, roomNumber, offer, price, discount, cancellation, status, amenities) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        room.photos,
        room.roomType,
        room.description,
        room.roomNumber,
        room.offer,
        room.price,
        room.discount,
        room.cancellation,
        room.status,
        room.amenities,
      ]
    );
    // room.photos.forEach(async (item) => {
    //   await DBQuery("INSERT INTO room_photos (roomId,url) VALUES (?,?)", [
    //     resp.insertId,
    //     item,
    //   ]);
    // });
    // room.amenities.forEach(async (item) => {
    //   const i = amenitiesList.indexOf(item);
    //   await DBQuery(
    //     "INSERT INTO rooms_amenities (roomId,amenityId) VALUES (?,?)",
    //     [resp.insertId, i + 1]
    //   );
    // });
  }
}
