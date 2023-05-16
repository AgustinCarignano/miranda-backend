import { IRoom } from "@src/types/rooms";
import bookingsModel from "../models/bookings.model";
import { faker } from "@faker-js/faker";

function generateBooking(rooms: IRoom[]) {
  const length = rooms.length;
  const randomIndex = Math.floor(Math.random() * length);
  return {
    guest: faker.name.fullName(),
    specialRequest: faker.lorem.text(),
    orderDate: faker.date.between(
      "2022-06-01T00:00:00.000Z",
      "2023-06-01T00:00:00.000Z"
    ),
    status: faker.helpers.arrayElement([
      "Check In",
      "Check Out",
      "In Progress",
    ]),
    checkIn: faker.date.between(
      "2022-06-01T00:00:00.000Z",
      "2023-06-01T00:00:00.000Z"
    ),
    checkOut: faker.date.between(
      "2022-06-01T00:00:00.000Z",
      "2023-06-01T00:00:00.000Z"
    ),
    roomId: rooms[randomIndex]._id,
    roomType: rooms[randomIndex].roomType,
    roomNumber: rooms[randomIndex].roomNumber,
    roomImg: rooms[randomIndex].photos[0],
  };
}

export async function seedBookings(q: number, rooms: IRoom[]) {
  for (let i = 0; i < q; i++) {
    const booking = generateBooking(rooms);
    await bookingsModel.create(booking);
  }
}
