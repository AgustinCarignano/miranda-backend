import { OkPacket } from "mysql2";
import { DBQuery } from "@src/DAL/MySQL/config";
import { IBookings, IBookingsDAO, IBookingsSQL } from "@src/types/bookings";
import { IRoom, IRoomSQL } from "@src/types/rooms";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

export default class BookingsSQL implements IBookingsDAO {
  async getAllBookings() {
    try {
      const bookings = await DBQuery<IBookingsSQL[]>("SELECT * FROM bookings");
      return bookings;
    } catch (error) {
      throw new CustomError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: error.message,
      });
    }
  }
  async getBookingDetail(id: string | number) {
    if (typeof id === "string") id = Number(id);
    try {
      const bookings = await DBQuery<IBookingsSQL[]>(
        "SELECT * FROM bookings WHERE bookings.id = ?",
        [id]
      );
      if (bookings.length > 0) return bookings[0];
      else
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Booking not found",
        });
    } catch (error) {
      if (error instanceof CustomError) throw error;
      else
        throw new CustomError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          description: error.message,
        });
    }
  }
  async createBooking(obj: IBookings) {
    try {
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
    } catch (error) {
      throw new CustomError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: error.message,
      });
    }
  }
  async updateBooking(id: string | number, obj: IBookings) {
    if (typeof id === "string") id = Number(id);
    try {
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
      if (!resp)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Booking not found",
        });
      return this.getBookingDetail(id);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      else
        throw new CustomError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          description: error.message,
        });
    }
  }
  async deleteBooking(id: string | number) {
    if (typeof id === "string") id = Number(id);
    try {
      const resp = await DBQuery<OkPacket>("DELETE FROM bookings WHERE id= ?", [
        id,
      ]);
      if (!resp)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Booking not found",
        });
      return id;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      else
        throw new CustomError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          description: error.message,
        });
    }
  }
  async getBookingDetailPopulated(id: string | number) {
    if (typeof id === "string") id = Number(id);
    try {
      const bookingArr = await DBQuery<(IBookingsSQL & IRoomSQL)[]>(
        "SELECT * FROM bookings INNER JOIN rooms ON rooms.id=bookings.roomId WHERE bookings.id = ?",
        [id]
      );
      if (bookingArr.length === 0)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Booking not found",
        });
      const booking = bookingArr[0];
      const formatBooking: IBookings & IRoom = {
        ...booking,
        id,
        offer: booking.offer === 1 ? true : false,
        photos: booking.photos.split(","),
        amenities: booking.amenities.split(","),
      };
      return formatBooking;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      else
        throw new CustomError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          description: error.message,
        });
    }
  }
}
