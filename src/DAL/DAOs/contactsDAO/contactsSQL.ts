import { OkPacket } from "mysql2";
import { IContact, IContactSQL, IContactDAO } from "@src/types/contacts";
import { DBQuery } from "@src/DAL/MySQL/config";

export default class ContactsSQL implements IContactDAO {
  async getAllContacts() {
    const contacts = await DBQuery<IContactSQL[]>("SELECT * FROM contacts");
    const formatContacts = this.#formatContacts(contacts);
    return formatContacts;
  }

  async getContact(id: string | number) {
    if (typeof id === "string") id = Number(id);
    const contacts = await DBQuery<IContactSQL[]>(
      "SELECT * FROM contacts WHERE id=?",
      [id]
    );
    const formatContacts = this.#formatContacts(contacts);
    return formatContacts[0];
  }

  async updateContact(id: string | number, obj: IContact) {
    if (typeof id === "string") id = Number(id);
    const resp = await DBQuery<OkPacket>(
      "UPDATE contacts SET fullName=?, email=?, phone=?, subject=?, message=?, date=?, _read=?, archived=? WHERE id=?",
      [
        obj.fullName,
        obj.email,
        obj.phone,
        obj.subject,
        obj.message,
        obj.date,
        obj._read ? 1 : 0,
        obj.archived ? 1 : 0,
        id,
      ]
    );
    if (!resp) throw new Error();
    return this.getContact(id);
  }
  #formatContacts(obj: IContactSQL[]) {
    const contacts: IContact[] = obj.map((contact) => {
      return {
        ...contact,
        _read: contact._read === 1 ? true : false,
        archived: contact.archived === 1 ? true : false,
      };
    });
    return contacts;
  }
}
