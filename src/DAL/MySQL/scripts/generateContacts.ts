import { faker } from "@faker-js/faker";
import { OkPacket } from "mysql2";
import { DBQuery } from "../config";

function generateContact() {
  return {
    fullName: faker.name.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number("##### ######"),
    subject: faker.lorem.sentence(),
    message: faker.lorem.paragraph(),
    date: faker.date.between(
      "2022-06-01T00:00:00.000Z",
      "2023-06-01T00:00:00.000Z"
    ),
    read: faker.datatype.boolean(),
    archived: faker.datatype.boolean(),
  };
}

export async function populateContacts(total: number) {
  for (let i = 0; i < total; i++) {
    const contact = generateContact();
    await DBQuery<OkPacket>(
      "INSERT INTO contacts (fullName, email, phone, subject, message, date, _read, archived) VALUES (?,?,?,?,?,?,?,?)",
      [
        contact.fullName,
        contact.email,
        contact.phone,
        contact.subject,
        contact.message,
        contact.date.toISOString().replace("T", " ").replace("Z", ""),
        contact.read ? 1 : 0,
        contact.archived ? 1 : 0,
      ]
    );
  }
}

populateContacts(10);
