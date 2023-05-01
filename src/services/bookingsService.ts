import DAOs from "@src/DAL/DAOs/factory";
import { IBookings } from "@src/types/bookings";

class BookingsService {
  dao = DAOs.BookingsDAO;

  async getAllBookings() {
    const data = await this.dao.getAllBookings();
    return data;
  }
  async getBookingDetail(id: string) {
    const booking = await this.dao.getBookingDetail(id);
    return booking;
  }
  async updateBooking(id: string, bookingObj: IBookings) {
    const newBooking = await this.dao.updateBooking(id, bookingObj);
    return newBooking;
  }
  async createBooking(bookingObj: IBookings) {
    const newBooking = await this.dao.createBooking(bookingObj);
    return newBooking;
  }
  async deleteBooking(id: string) {
    const res = await this.dao.deleteBooking(id);
    return res;
  }
}

export default new BookingsService();
