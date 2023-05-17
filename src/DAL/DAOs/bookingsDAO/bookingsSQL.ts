import { OkPacket } from "mysql2";
import { DBQuery } from "@src/DAL/MySQL/config";
import { IBookings, IBookingsDAO, IBookingsSQL } from "@src/types/bookings";
import { IPhotos, IRoom, IRoomSQL } from "@src/types/rooms";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

export default class BookingsSQL implements IBookingsDAO {
  async getAllBookings() {
    try {
      const bookings = await DBQuery<IBookingsSQL[]>(
        `select bookings.*, rooms.roomType, rooms.roomNumber from bookings
        inner join rooms on rooms._id=bookings.roomId;`
      );
      const photos = await this.#getBookingsPhoto();
      const completeBookings = bookings.map((booking) => {
        const photoObj = photos.find((item) => item.id === booking.roomId);
        return {
          ...booking,
          roomImg: photoObj?.photo ?? "",
        };
      });
      return completeBookings;
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
        `select bookings.*, rooms.roomType, rooms.roomNumber from bookings
        inner join rooms on rooms._id=bookings.roomId
        where bookings._id = ?`,
        [id]
      );
      const photos = await this.#getBookingsPhoto();
      if (bookings.length > 0) {
        const photo = photos.find((item) => item.id === bookings[0].roomId);
        bookings[0].roomImg = photo?.photo ?? "";
        return bookings[0];
      } else
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
          typeof obj.roomId !== "string" ? obj.roomId.toString() : obj.roomId,
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
        "UPDATE bookings SET guest = ?, specialRequest = ?, orderDate = ?, roomType = ?, status = ?, checkIn = ?, checkOut = ?, roomId = ?, roomNumber = ?, roomImg = ? WHERE _id = ?",
        [
          obj.guest,
          obj.specialRequest,
          obj.orderDate,
          obj.roomType,
          obj.status,
          obj.checkIn,
          obj.checkOut,
          typeof obj.roomId !== "string" ? obj.roomId.toString() : obj.roomId,
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
  async #getBookingsPhoto() {
    try {
      const resp = await DBQuery<IPhotos[]>(
        `select rooms._id, GROUP_CONCAT(room_photos.url) as photos from rooms
            inner join room_photos on rooms._id=room_photos.roomId
            group by rooms._id`
      );
      const photos = resp.map((img) => {
        return {
          id: img._id,
          photo: img.photos.split(",")[0],
        };
      });
      return photos;
    } catch (error) {
      throw new CustomError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: error.message,
      });
    }
  }
}
