import { IUser } from "@src/types/users";
import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>({
  photo: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  startDate: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// userSchema.method('response',()=>{
//   if (this.toObject()) let obj = this.toObject();

//   obj.id=obj._id;
//   delete obj._id;
//   return obj
// })

const usersModel = model<IUser>("user", userSchema);

export default usersModel;
