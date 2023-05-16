import { IRoom } from "@src/types/rooms";
import roomsModel from "../models/rooms.model";
import { faker } from "@faker-js/faker";

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
    offer: isOffer,
    price: faker.commerce.price(250, 1250, 0),
    discount: isOffer ? faker.helpers.arrayElement([5, 10, 15]) : 0,
    cancellation: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(["Available", "Booked"]),
    amenities: faker.helpers.arrayElements(amenitiesList, randomLength),
  };
}

export async function seedRooms(q: number) {
  const rooms: IRoom[] = [];
  for (let i = 0; i < q; i++) {
    const room = generateRoom();
    const newRoom = await roomsModel.create(room);
    rooms.push(newRoom);
  }
  return rooms;
}
