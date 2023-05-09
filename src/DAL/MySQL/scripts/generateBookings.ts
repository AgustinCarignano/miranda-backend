import { faker } from "@faker-js/faker";
import { OkPacket } from "mysql2";
import { DBQuery } from "../config";

function generateBooking() {
  return {
    guest: faker.name.fullName(),
    specialRequest: faker.lorem.text(),
    orderDate: faker.date.between(
      "2022-06-01T00:00:00.000Z",
      "2023-06-01T00:00:00.000Z"
    ),
    roomType: faker.helpers.arrayElement([
      "Suite",
      "Double Superior",
      "Double Bed",
      "Single Bed",
    ]),
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
    roomId: faker.datatype.number(50),
    roomNumber: faker.datatype.number(999),
    roomImg: faker.image.imageUrl(),
  };
}

export async function populateBookings(total: number) {
  for (let i = 0; i < total; i++) {
    const booking = generateBooking();
    DBQuery<OkPacket>(
      "INSERT INTO bookings (guest, specialRequest, orderDate, roomType, status, checkIn, checkOut, roomId, roomNumber, roomImg) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        booking.guest,
        booking.specialRequest,
        booking.orderDate.toISOString().replace("T", " ").replace("Z", ""),
        booking.roomType,
        booking.status,
        booking.checkIn.toISOString().replace("T", " ").replace("Z", ""),
        booking.checkOut.toISOString().replace("T", " ").replace("Z", ""),
        booking.roomId,
        booking.roomNumber,
        booking.roomImg,
      ]
    );
  }
}
