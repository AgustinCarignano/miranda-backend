import { IBookings } from "@src/types/bookings";
import Joi from "joi";

export const bookingSchema = Joi.object<IBookings>({
  id: Joi.alternatives().try(Joi.string(), Joi.number()),
  guest: Joi.string().required(),
  specialRequest: Joi.string(),
  orderDate: Joi.alternatives()
    .try(Joi.date().iso(), Joi.date().timestamp())
    .required(),
  roomType: Joi.string()
    .valid("Suite", "Double Superior", "Double Bed", "Single Bed")
    .required(),
  status: Joi.string().valid("Check In", "Check Out", "In Progress").required(),
  checkIn: Joi.alternatives()
    .try(Joi.date().iso(), Joi.date().timestamp())
    .required(),
  checkOut: Joi.alternatives()
    .try(Joi.date().iso(), Joi.date().timestamp())
    .required(),
  roomId: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  roomNumber: Joi.number().required(),
  roomImg: Joi.string().uri().required(),
});
