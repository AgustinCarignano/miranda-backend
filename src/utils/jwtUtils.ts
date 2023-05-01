import jwt from "jsonwebtoken";
import envVars from "@src/envVars";
import { IUser } from "@src/types/users";

async function generateToken(obj: IUser) {
  return jwt.sign({ user: obj }, envVars.jwt.Secret, {
    expiresIn: envVars.jwt.Exp,
  });
}

function verifyToken(token: string) {
  return jwt.verify(token, envVars.jwt.Secret);
}

export default {
  generateToken,
  verifyToken,
} as const;
