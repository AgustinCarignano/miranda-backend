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

function generateRoom() {
  let isOffer = faker.helpers.maybe(() => true, { probability: 0.3 }) || false;
  let randomLength = Math.round(Math.random() * 7) + 3;
  return {
    photos: [
      faker.image.imageUrl(),
      faker.image.imageUrl(),
      faker.image.imageUrl(),
    ],
    roomType: faker.helpers.arrayElement([
      "Suite",
      "Double Superior",
      "Double Bed",
      "Single Bed",
    ]),
    description: faker.lorem.sentence(),
    roomNumber: faker.datatype.number(999),
    offer: isOffer ? 1 : 0,
    price: faker.commerce.price(250, 1250, 0),
    discount: isOffer ? faker.helpers.arrayElement([5, 10, 15]) : 0,
    cancellation: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(["Available", "Booked"]),
    amenities: faker.helpers.arrayElements(amenitiesList, randomLength),
  };
}

export async function populateRooms(total: number) {
  for (let i = 0; i < total; i++) {
    const room = generateRoom();
    const resp = await DBQuery<OkPacket>(
      "INSERT INTO rooms (roomType, description, roomNumber, offer, price, discount, cancellation, status) VALUES (?,?,?,?,?,?,?,?)",
      [
        room.roomType,
        room.description,
        room.roomNumber,
        room.offer,
        room.price,
        room.discount,
        room.cancellation,
        room.status,
      ]
    );
    room.photos.forEach(async (item) => {
      await DBQuery("INSERT INTO room_photos (roomId,url) VALUES (?,?)", [
        resp.insertId,
        item,
      ]);
    });
    room.amenities.forEach(async (item) => {
      const i = amenitiesList.indexOf(item);
      await DBQuery(
        "INSERT INTO rooms_amenities (roomId,amenityId) VALUES (?,?)",
        [resp.insertId, i + 1]
      );
    });
  }
}
