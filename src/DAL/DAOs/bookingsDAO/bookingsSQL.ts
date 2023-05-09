import { OkPacket } from "mysql2";
import { DBQuery } from "@src/DAL/MySQL/config";
import { IBookings, IBookingsDAO, IBookingsSQL } from "@src/types/bookings";
// import { IBookings, IBookingsDAO, IBookingsNew } from "@src/types/bookings";
// import { CustomError } from "@src/utils/error/customError";
// import { HttpCode } from "@src/utils/error/errorEnums";

export default class BookingsSQL implements IBookingsDAO {
  async getAllBookings() {
    const bookings = await DBQuery<IBookingsSQL[]>("SELECT * FROM bookings");
    return bookings;
  }
  async getBookingDetail(id: string | number) {
    if (typeof id === "string") id = Number(id);
    const bookings = await DBQuery<IBookingsSQL[]>(
      "SELECT * FROM bookings INNER JOIN rooms ON rooms.id=bookings.roomId WHERE bookings.id = ?",
      [id]
    );
    return bookings[0];
  }
  async createBooking(obj: IBookings) {
    const resp = await DBQuery<OkPacket>(
      "INSERT INTO bookings (guest, specialRequest, orderDate, roomType, status, checkIn, checkOut, roomId, roomNumber, roomImg) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        obj.guest,
        obj.specialRequest,
        obj.orderDate,
        obj.roomType,
        obj.status,
        obj.checkIn,
        obj.checkOut,
        obj.roomId,
        obj.roomNumber,
        obj.roomImg,
      ]
    );
    if (!resp.insertId) throw new Error();
    return this.getBookingDetail(resp.insertId);
  }
  async updateBooking(id: string | number, obj: IBookings) {
    if (typeof id === "string") id = Number(id);
    const resp = await DBQuery<OkPacket>(
      "UPDATE bookings SET guest = ?, specialRequest = ?, orderDate = ?, roomType = ?, status = ?, checkIn = ?, checkOut = ?, roomId = ?, roomNumber = ?, roomImg = ? WHERE id = ?",
      [
        obj.guest,
        obj.specialRequest,
        obj.orderDate,
        obj.roomType,
        obj.status,
        obj.checkIn,
        obj.checkOut,
        obj.roomId,
        obj.roomNumber,
        obj.roomImg,
        id,
      ]
    );
    if (!resp) throw new Error();
    return this.getBookingDetail(id);
  }
  async deleteBooking(id: string | number) {
    if (typeof id === "string") id = Number(id);
    const resp = await DBQuery<OkPacket>("DELETE FROM bookings WHERE id= ?", [
      id,
    ]);
    if (!resp) throw new Error();
    return id.toString();
  }
}
