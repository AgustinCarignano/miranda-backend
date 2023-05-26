import contactsModel from "@src/DAL/Mongo/models/contacts.model";
import { IContact, IContactDAO } from "@src/types/contacts";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

export default class ContactsMongo implements IContactDAO {
  model = contactsModel;
  async getAllContacts() {
    const contactsDB = await this.model.find<IContact>();
    const contacts = contactsDB.map((item) => this.#sanitizateContact(item));
    return contacts;
  }
  async updateContact(id: string, obj: IContact) {
    const newContact = await this.model.findByIdAndUpdate<IContact>(
      id,
      { ...obj, id },
      { new: true }
    );
    if (!newContact)
      throw new CustomError({
        httpCode: HttpCode.NOT_FOUND,
        description: "Contact not found",
      });
    const contact = this.#sanitizateContact(newContact);
    return contact;
  }
  #sanitizateContact(contact: IContact) {
    return {
      _id: contact._id,
      fullName: contact.fullName,
      email: contact.email,
      phone: contact.phone,
      subject: contact.subject,
      message: contact.message,
      date: contact.date,
      _read: contact._read,
      archived: contact.archived,
    };
  }
}
