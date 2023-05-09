import { faker } from "@faker-js/faker";
import utils from "../../../utils/bcryptUtils";
import { OkPacket } from "mysql2";
import { DBQuery } from "../config";

function generateUser() {
  return {
    photo: faker.image.avatar(),
    fullName: faker.name.fullName(),
    email: faker.internet.email(),
    startDate: faker.date.between(
      "2022-06-01T00:00:00.000Z",
      "2023-06-01T00:00:00.000Z"
    ),
    description: faker.name.jobDescriptor(),
    contact: faker.phone.number("##### ######"),
    status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
    role: faker.helpers.arrayElement([
      "Manager",
      "Room Services",
      "Receptionist",
    ]),
    password: utils.getHashSync(faker.internet.password()),
  };
}

export async function populateUsers(total: number) {
  for (let i = 0; i < total; i++) {
    const user = generateUser();
    await DBQuery<OkPacket>(
      "INSERT INTO users (photo, fullName, email, startDate, description, contact, status, role, password) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        user.photo,
        user.fullName,
        user.email,
        user.startDate.toISOString().replace("T", " ").replace("Z", ""),
        user.description,
        user.contact,
        user.status,
        user.role,
        user.password,
      ]
    );
  }
}
