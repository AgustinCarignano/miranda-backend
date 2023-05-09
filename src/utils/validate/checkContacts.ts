import { IContact } from "@src/types/contacts";
import Joi from "joi";

export const contactSchema = Joi.object<IContact>({
  id: Joi.alternatives().try(Joi.string(), Joi.number()),
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .min(10)
    .max(12)
    .required(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
  date: Joi.alternatives()
    .try(Joi.date().iso(), Joi.date().timestamp())
    .required(),
  _read: Joi.boolean().required(),
  archived: Joi.boolean().required(),
});
