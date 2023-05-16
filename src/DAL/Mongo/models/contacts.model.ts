import { IContact } from "@src/types/contacts";
import { Schema, model } from "mongoose";

const contactSchema = new Schema<IContact>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  _read: {
    type: Boolean,
    required: true,
  },
  archived: {
    type: Boolean,
    required: true,
  },
});

const contactsModel = model<IContact>("contact", contactSchema);

export default contactsModel;
