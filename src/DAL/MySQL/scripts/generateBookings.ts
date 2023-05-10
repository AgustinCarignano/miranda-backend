import { faker } from "@faker-js/faker";
import { OkPacket } from "mysql2";
import { DBQuery } from "../config";
import { IRoomSQL } from "../../../../src/types/rooms";

function generateBooking() {
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
    roomId: faker.datatype.number({ min: 1, max: 30 }),
  };
}

export async function populateBookings(total: number, roomsArr: IRoomSQL[]) {
  for (let i = 0; i < total; i++) {
    const booking = generateBooking();
    const room = roomsArr.find((item: IRoomSQL) => item.id === booking.roomId);
    if (room) {
      DBQuery<OkPacket>(
        "INSERT INTO bookings (guest, specialRequest, orderDate, roomType, status, checkIn, checkOut, roomId, roomNumber, roomImg) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [
          booking.guest,
          booking.specialRequest,
          booking.orderDate.toISOString().replace("T", " ").replace("Z", ""),
          room.roomType,
          booking.status,
          booking.checkIn.toISOString().replace("T", " ").replace("Z", ""),
          booking.checkOut.toISOString().replace("T", " ").replace("Z", ""),
          booking.roomId,
          room.roomNumber,
          room.photos.split(",")[0],
        ]
      );
    }
  }
}

// roomType: faker.helpers.arrayElement([
//   "Suite",
//   "Double Superior",
//   "Double Bed",
//   "Single Bed",
// ]),
//roomNumber: faker.datatype.number(999),
//roomImg: faker.image.imageUrl(),
