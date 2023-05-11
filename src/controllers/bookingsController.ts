import DAOs from "@src/DAL/DAOs/factory";
import { IBookings } from "@src/types/bookings";
import { IReq, IRes } from "@src/types/request";
//import checkProperties from "@src/utils/checkPropertiesUtils";
import { validateUtils } from "@src/utils/validate";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

class BookingsController {
  async getAllBookings(_req: IReq<IBookings>, res: IRes<IBookings[]>) {
    const bookings = await DAOs.BookingsDAO.getAllBookings();
    res.json({ message: "Success getting all booking", payload: bookings });
  }

  async getBookingDetail(req: IReq<IBookings>, res: IRes<IBookings>) {
    const { id } = req.params;
    const query = req.query;
    let booking;
    if (
      query.populate === "true" &&
      DAOs.BookingsDAO.getBookingDetailPopulated
    ) {
      booking = await DAOs.BookingsDAO.getBookingDetailPopulated(id);
    } else {
      booking = await DAOs.BookingsDAO.getBookingDetail(id);
    }
    res.json({ message: "Success getting the booking", payload: booking });
  }

  async updateBooking(req: IReq<IBookings>, res: IRes<IBookings>) {
    const { id } = req.params;
    const obj = req.body;
    try {
      const validatedBooking = await validateUtils.bookingSchema.validateAsync(
        obj,
        { abortEarly: false }
      );
      const newBooking = await DAOs.BookingsDAO.updateBooking(
        id,
        validatedBooking
      );
      res.json({
        message: "Success updating the booking",
        payload: newBooking,
      });
    } catch (error) {
      throw new CustomError({
        httpCode: HttpCode.BAD_REQUEST,
        description: error.message,
      });
    }
  }

  async createBooking(req: IReq<IBookings>, res: IRes<IBookings>) {
    const obj = req.body;
    try {
      const validatedBooking = await validateUtils.bookingSchema.validateAsync(
        obj,
        { abortEarly: false }
      );
      const newBooking = await DAOs.BookingsDAO.createBooking(validatedBooking);
      res.json({
        message: "Success creating the booking",
        payload: newBooking,
      });
    } catch (error) {
      throw new CustomError({
        httpCode: HttpCode.BAD_REQUEST,
        description: error.message,
      });
    }
  }

  async deleteBooking(req: IReq<IBookings>, res: IRes<string | number>) {
    const { id } = req.params;
    const resId = await DAOs.BookingsDAO.deleteBooking(id);
    res.json({ message: "Success deleting the booking", payload: resId });
  }
}

export default new BookingsController();
