import bookingsModel from "@src/DAL/Mongo/models/bookings.model";
import { IBookingsDAO, IBookings } from "@src/types/bookings";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

export default class BookingsMongo implements IBookingsDAO {
  model = bookingsModel;
  async getAllBookings() {
    const bookings = await this.model.find<IBookings>();
    return bookings;
  }
  async getBookingDetail(id: string) {
    const booking = await this.model.findById<IBookings>(id);
    if (!booking)
      throw new CustomError({
        httpCode: HttpCode.NOT_FOUND,
        description: "Booking not found",
      });
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
    return newBooking;
  }
  async createBooking(obj: IBookings) {
    const newBooking = await this.model.create<IBookings>(obj);
    return newBooking;
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
}
