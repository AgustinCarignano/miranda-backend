import { faker } from "@faker-js/faker";
import { OkPacket } from "mysql2";
import { DBQuery } from "../config";

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
    //amenities: faker.lorem.slug(randomLength).split("-"),
    amenities: faker.helpers.arrayElements(
      [
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
      ],
      randomLength
    ),
  };
}

export async function populateRooms(total: number) {
  for (let i = 0; i < total; i++) {
    const room = generateRoom();
    await DBQuery<OkPacket>(
      "INSERT INTO rooms (photos, roomType, description, roomNumber, offer, price, discount, cancellation, status, amenities) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        room.photos.join(","),
        room.roomType,
        room.description,
        room.roomNumber,
        room.offer,
        room.price,
        room.discount,
        room.cancellation,
        room.status,
        room.amenities.join(","),
      ]
    );
  }
}
