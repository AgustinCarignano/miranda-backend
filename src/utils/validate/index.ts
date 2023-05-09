import { bookingSchema } from "./checkBooking";
import { userSchema } from "./checkUsers";
import { roomSchema } from "./checkRooms";
import { contactSchema } from "./checkContacts";

export const validateUtils = {
  bookingSchema,
  userSchema,
  roomSchema,
  contactSchema,
};
