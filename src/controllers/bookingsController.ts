import DAOs from "@src/DAL/DAOs/factory";
import { IBookings } from "@src/types/bookings";
import { IReq, IRes } from "@src/types/request";
import checkProperties from "@src/utils/checkPropertiesUtils";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

class BookingsController {
  async getAllBookings(_req: IReq<IBookings>, res: IRes<IBookings[]>) {
    const bookings = await DAOs.BookingsDAO.getAllBookings();
    res.json({ message: "Success getting all booking", payload: bookings });
  }

  async getBookingDetail(req: IReq<IBookings>, res: IRes<IBookings>) {
    const { id } = req.params;
    const booking = await DAOs.BookingsDAO.getBookingDetail(id);
    res.json({ message: "Success getting the booking", payload: booking });
  }

  async updateBooking(req: IReq<IBookings>, res: IRes<IBookings>) {
    const { id } = req.params;
    const obj = req.body;
    const isValidObj = checkProperties.isValidBooking(obj);
    if (!isValidObj)
      throw new CustomError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Bookings object has a wrong format",
      });
    const newBooking = await DAOs.BookingsDAO.updateBooking(id, obj);
    res.json({ message: "Success updating the booking", payload: newBooking });
  }

  async createBooking(req: IReq<IBookings>, res: IRes<IBookings>) {
    const obj = req.body;
    const isValidObj = checkProperties.isValidBooking(obj);
    if (!isValidObj)
      throw new CustomError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Bookings object has a wrong format",
      });
    const newBooking = await DAOs.BookingsDAO.createBooking(obj);
    res.json({ message: "Success creating the booking", payload: newBooking });
  }

  async deleteBooking(req: IReq<IBookings>, res: IRes<string>) {
    const { id } = req.params;
    const resId = await DAOs.BookingsDAO.deleteBooking(id);
    res.json({ message: "Success deleting the booking", payload: resId });
  }
}

export default new BookingsController();
