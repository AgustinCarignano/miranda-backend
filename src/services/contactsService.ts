import DAOs from "@src/DAL/DAOs/factory";
import { IContact } from "@src/types/contacts";

class ContactsService {
  dao = DAOs.ContactsDAO;

  async getAllContacts() {
    const data = await this.dao.getAllContacts();
    return data;
  }
  async updateContact(id: string, ContactObj: IContact) {
    const newContact = await this.dao.updateContact(id, ContactObj);
    return newContact;
  }
}

export default new ContactsService();
