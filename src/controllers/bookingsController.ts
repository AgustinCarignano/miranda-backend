import bookingsService from "@src/services/bookingsService";
import { IBookings } from "@src/types/bookings";
import { IReq, IRes } from "@src/types/request";

class BookingsController {
  async getAllBookings(_req: IReq<IBookings>, res: IRes<IBookings[]>) {
    const bookings = await bookingsService.getAllBookings();
    res.json({ message: "Success getting all booking", payload: bookings });
  }
  async getBookingDetail(req: IReq<IBookings>, res: IRes<IBookings>) {
    const { id } = req.params;
    const booking = await bookingsService.getBookingDetail(id);
    res.json({ message: "Success getting the booking", payload: booking });
  }
  async updateBooking(req: IReq<IBookings>, res: IRes<IBookings>) {
    const { id } = req.params;
    const obj = req.body;
    const newBooking = await bookingsService.updateBooking(id, obj);
    res.json({ message: "Success updating the booking", payload: newBooking });
  }
  async createBooking(req: IReq<IBookings>, res: IRes<IBookings>) {
    const obj = req.body;
    const newBooking = await bookingsService.createBooking(obj);
    res.json({ message: "Success creating the booking", payload: newBooking });
  }
  async deleteBooking(req: IReq<IBookings>, res: IRes<string>) {
    const { id } = req.params;
    const resId = await bookingsService.deleteBooking(id);
    res.json({ message: "Success deleting the booking", payload: resId });
  }
}

export default new BookingsController();
