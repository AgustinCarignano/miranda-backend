import { IRoom } from "@src/types/rooms";
import { Schema, model } from "mongoose";

const roomSchema = new Schema<IRoom>({
  photos: {
    type: [String],
  },
  roomType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  offer: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  cancellation: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  amenities: {
    type: [String],
    required: true,
  },
});

const roomsModel = model<IRoom>("rooms", roomSchema);

export default roomsModel;
