import { IUser } from "@src/types/users";

const isUserType = (input: any): input is IUser => {
  if (
    "email" in input &&
    "_id" in input &&
    "photo" in input &&
    "fullName" in input &&
    "startDate" in input &&
    "description" in input &&
    "contact" in input &&
    "status" in input &&
    "role" in input &&
    "password" in input
  )
    return true;
  else return false;
};

export default {
  isUserType,
} as const;
