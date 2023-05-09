import { IUser } from "@src/types/users";
import Joi from "joi";

export const userSchema = Joi.object<IUser>({
  id: Joi.alternatives().try(Joi.string(), Joi.number()),
  photo: Joi.string().uri().required(),
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  startDate: Joi.alternatives()
    .try(Joi.date().iso(), Joi.date().timestamp())
    .required(),
  description: Joi.string().required(),
  contact: Joi.string()
    .regex(/^[0-9]{10}$/)
    .min(10)
    .max(12)
    .required(),
  status: Joi.string().valid("ACTIVE", "INACTIVE").required(),
  role: Joi.string()
    .valid("Room Services", "Manager", "Receptionist")
    .required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{30,50}$/),
});
