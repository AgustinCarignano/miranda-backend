import { IBookings } from "@src/types/bookings";
import { Schema, model } from "mongoose";

const bookingSchema = new Schema<IBookings>({
  guest: {
    type: String,
    required: true,
  },
  specialRequest: {
    type: String,
    default: " ",
  },
  orderDate: {
    type: Number,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  checkIn: {
    type: Number,
    required: true,
  },
  checkOut: {
    type: Number,
    required: true,
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "rooms",
    required: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  roomImg: {
    type: String,
    required: true,
  },
});

const bookingsModel = model<IBookings>("booking", bookingSchema);

export default bookingsModel;
