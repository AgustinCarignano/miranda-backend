import { OkPacket } from "mysql2";
import { IContact, IContactSQL, IContactDAO } from "@src/types/contacts";
import { DBQuery } from "@src/DAL/MySQL/config";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

export default class ContactsSQL implements IContactDAO {
  async getAllContacts() {
    try {
      const contacts = await DBQuery<IContactSQL[]>("SELECT * FROM contacts");
      const formatContacts = this.#formatContacts(contacts);
      return formatContacts;
    } catch (error) {
      throw new CustomError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: error.mesagge,
      });
    }
  }

  async updateContact(id: string | number, obj: IContact) {
    if (typeof id === "string") id = Number(id);
    try {
      const resp = await DBQuery<OkPacket>(
        "UPDATE contacts SET fullName=?, email=?, phone=?, subject=?, message=?, date=?, _read=?, archived=? WHERE _id=?",
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
      if (!resp)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Contact not found",
        });
      return this.#getContact(id);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      else
        throw new CustomError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          description: error.mesagge,
        });
    }
  }

  async #getContact(id: string | number) {
    if (typeof id === "string") id = Number(id);
    const contacts = await DBQuery<IContactSQL[]>(
      "SELECT * FROM contacts WHERE _id=?",
      [id]
    );
    const formatContacts = this.#formatContacts(contacts);
    return formatContacts[0];
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
