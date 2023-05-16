import contactsModel from "@src/DAL/Mongo/models/contacts.model";
import { IContact, IContactDAO } from "@src/types/contacts";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

export default class ContactsMongo implements IContactDAO {
  model = contactsModel;
  async getAllContacts() {
    const contacts = await this.model.find<IContact>();
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
    return newContact;
  }
}
