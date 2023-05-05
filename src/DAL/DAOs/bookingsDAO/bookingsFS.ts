import { IBookings, IBookingsDAO } from "@src/types/bookings";
import fs from "fs-extra";
import { __rootDir } from "@src/utils/pathUtils";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

export default class BookingsFS implements IBookingsDAO {
  path = `${__rootDir}/src/jsonData/bookingsData.json`;

  async getAllBookings() {
    try {
      const jsonData = await fs.promises.readFile(this.path, "utf-8");
      const data: IBookings[] = JSON.parse(jsonData);
      return data;
    } catch (error) {
      throw new CustomError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: "An error has occurred",
      });
    }
  }

  async getBookingDetail(id: string) {
    try {
      const allBookings = await this.getAllBookings();
      const booking = allBookings.find((item) => item.id === id);
      if (!booking)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Booking not found",
        });
      else return booking;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      else
        throw new CustomError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          description: error.message,
        });
    }
  }

  async updateBooking(id: string, obj: IBookings) {
    try {
      const allBookings = await this.getAllBookings();
      const booking = allBookings.find((item) => item.id === id);
      if (!booking)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Booking not found",
        });
      const newBooking = { ...booking, ...obj, id };
      const newArray = allBookings.map((item) => {
        if (item.id === id) return newBooking;
        else return item;
      });
      await this.#writeFile(newArray);
      return newBooking;
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
      const allBookings = await this.getAllBookings();
      if (allBookings.some((item) => item.id === obj.id))
        throw new CustomError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Duplicate booking id",
        });
      allBookings.push(obj);
      await this.#writeFile(allBookings);
      return obj;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: error.message,
      });
    }
  }

  async deleteBooking(id: string) {
    try {
      const allBookings = await this.getAllBookings();
      if (!allBookings.some((item) => item.id === id))
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Booking not found",
        });
      const newArray = allBookings.filter((item) => item.id !== id);
      await this.#writeFile(newArray);
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

  async #writeFile(data: IBookings[]) {
    await fs.promises.writeFile(this.path, JSON.stringify(data));
  }
}
