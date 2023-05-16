import { faker } from "@faker-js/faker";
import contactsModel from "../models/contacts.model";

function generateContact() {
  const fullName = faker.name.fullName();
  return {
    fullName: fullName,
    email: faker.internet.email(fullName),
    phone: faker.phone.number("##### ######"),
    subject: faker.lorem.sentence(),
    message: faker.lorem.paragraph(),
    date: faker.date.between(
      "2022-06-01T00:00:00.000Z",
      "2023-06-01T00:00:00.000Z"
    ),
    _read: faker.datatype.boolean(),
    archived: faker.datatype.boolean(),
  };
}

export async function seedContacts(q: number) {
  for (let i = 0; i < q; i++) {
    const contact = generateContact();
    await contactsModel.create(contact);
  }
}
