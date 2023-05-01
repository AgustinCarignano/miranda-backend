export interface IBookings {
  id: string;
  guest: string;
  specialRequest: string;
  orderDate: number;
  roomType: string;
  status: string;
  checkIn: number;
  checkOut: number;
  roomId: string;
  roomNumber: string;
  roomImg: string;
}

export interface IBookingsDAO {
  path?: srting;
  getAllBookings: () => Promise<IBookings[]>;
  getBookingDetail: (id: string) => Promise<IBookings>;
  updateBooking: (id: string, obj: IBookings) => Promise<IBookings>;
  createBooking: (obj: IBookings) => Promise<IBookings>;
  deleteBooking: (id: string) => Promise<string>;
}
