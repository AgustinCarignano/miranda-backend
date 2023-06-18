import bookingsModel from "../../Mongo/models/bookings.model";
import { IBookingsDAO, IBookings } from "../../../types/bookings";
import { CustomError } from "../../../utils/error/customError";
import { HttpCode } from "../../../utils/error/errorEnums";

export default class BookingsMongo implements IBookingsDAO {
  model = bookingsModel;
  async getAllBookings() {
    const bookingsDB = await this.model.find<IBookings>();
    const bookings = bookingsDB.map((item) => this.#sanitizateBooking(item));
    return bookings;
  }
  async getBookingDetail(id: string) {
    const bookingDB = await this.model.findById<IBookings>(id);
    if (!bookingDB)
      throw new CustomError({
        httpCode: HttpCode.NOT_FOUND,
        description: "Booking not found",
      });
    const booking = this.#sanitizateBooking(bookingDB);
    return booking;
  }
  async updateBooking(id: string, obj: IBookings) {
    const newBooking = await this.model.findByIdAndUpdate<IBookings>(
      id,
      { ...obj, id },
      { new: true }
    );
    if (!newBooking)
      throw new CustomError({
        httpCode: HttpCode.NOT_FOUND,
        description: "Booking not found",
      });
    const booking = this.#sanitizateBooking(newBooking);
    return booking;
  }
  async createBooking(obj: IBookings) {
    const newBooking = await this.model.create<IBookings>(obj);
    const booking = this.#sanitizateBooking(newBooking);
    return booking;
  }
  async deleteBooking(id: string) {
    const resp = await this.model.findByIdAndDelete<IBookings>(id);
    if (!resp)
      throw new CustomError({
        httpCode: HttpCode.NOT_FOUND,
        description: "Booking not found",
      });
    return id;
  }
  #sanitizateBooking(booking: IBookings) {
    return {
      _id: booking._id,
      guest: booking.guest,
      specialRequest: booking.specialRequest,
      orderDate: booking.orderDate,
      roomType: booking.roomType,
      status: booking.status,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      roomId: booking.roomId,
      roomNumber: booking.roomNumber,
      roomImg: booking.roomImg,
    };
  }
}
