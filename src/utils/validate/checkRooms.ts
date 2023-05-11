import { IRoom } from "@src/types/rooms";
import Joi from "joi";

export const roomSchema = Joi.object<IRoom>({
  id: Joi.alternatives().try(Joi.string(), Joi.number()),
  photos: Joi.array().max(5).min(3).items(Joi.string().uri()).required(),
  roomType: Joi.string()
    .valid("Suite", "Double Superior", "Double Bed", "Single Bed")
    .required(),
  description: Joi.string().required(),
  roomNumber: Joi.number().required(),
  offer: Joi.boolean().required(),
  price: Joi.number().required(),
  discount: Joi.number().max(1).min(0).required(),
  cancellation: Joi.string().required(),
  status: Joi.string().valid("Available", "Booked").required(),
  amenities: Joi.array()
    .min(3)
    .items(
      Joi.string().valid(
        "Air Conditioner",
        "High speed WiFi",
        "Breakfast",
        "Kitchen",
        "Cleaning",
        "Single Bed",
        "Shower",
        "Grocery",
        "Shop near",
        "Towels"
      )
    )
    .required(),
});
