import BookingsFS from "./bookingsFS";
import BookingsSQL from "./bookingsSQL";
import BookingsMongo from "./bookingsMDB";

const BookingDAOs = {
  FS: BookingsFS,
  SQL: BookingsSQL,
  MONGO: BookingsMongo,
};

export default BookingDAOs;
