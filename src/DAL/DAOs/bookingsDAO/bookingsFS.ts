import { IBookings, IBookingsDAO } from "@src/types/bookings";
import fs from "fs-extra";
import { __rootDir } from "@src/utils/pathUtils";

export default class BookingsFS implements IBookingsDAO {
  path: string;
  constructor() {
    this.path = `${__rootDir}/src/jsonData/bookingsData.json`;
  }
  async getAllBookings() {
    const jsonData = await fs.promises.readFile(this.path, "utf-8");
    const data: IBookings[] = JSON.parse(jsonData);
    return data;
  }
  async getBookingDetail(id: string) {
    const allBookings = await this.getAllBookings();
    const booking = allBookings.find((item) => item.id === id);
    if (booking) return booking;
    else throw new Error("Booking not found");
  }
  async updateBooking(id: string, obj: IBookings) {
    const allBookings = await this.getAllBookings();
    const booking = allBookings.find((item) => item.id === id);
    const newBooking = { ...booking, ...obj };
    const newArray = allBookings.map((item) => {
      if (item.id === id) return newBooking;
      else return item;
    });
    await this.#writeFile(newArray);
    return newBooking;
  }
  async createBooking(obj: IBookings) {
    const allBookings = await this.getAllBookings();
    allBookings.push(obj);
    await this.#writeFile(allBookings);
    return obj;
  }
  async deleteBooking(id: string) {
    const allBookings = await this.getAllBookings();
    const newArray = allBookings.filter((item) => item.id !== id);
    await this.#writeFile(newArray);
    return id;
  }
  async #writeFile(data: IBookings[]) {
    await fs.promises.writeFile(this.path, JSON.stringify(data));
  }
}
