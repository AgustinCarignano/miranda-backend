import { faker } from "@faker-js/faker";
import usersModel from "../models/users.model";
import bcryptUtils from "../../../utils/bcryptUtils";

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
    password: bcryptUtils.getHashSync(faker.internet.password()),
  };
}

export async function seedUsers(q: number) {
  for (let i = 0; i < q; i++) {
    const user = generateUser();
    await usersModel.create(user);
  }
}
