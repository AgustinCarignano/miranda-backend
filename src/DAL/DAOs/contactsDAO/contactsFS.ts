import fs from "fs-extra";
import { __rootDir } from "@src/utils/pathUtils";
import { IContact, IContactDAO } from "@src/types/contacts";

export default class ContatcsFS implements IContactDAO {
  path = `${__rootDir}/src/jsonData/contactsData.json`;

  async getAllContacts() {
    const jsonData = await fs.promises.readFile(this.path, "utf-8");
    const data: IContact[] = JSON.parse(jsonData);
    return data;
  }
  async updateContact(id: string, obj: IContact) {
    const allContacts = await this.getAllContacts();
    const contact = allContacts.find((item) => item.id === id);
    const newContact = { ...contact, ...obj };
    const newArray = allContacts.map((item) => {
      if (item.id === id) return newContact;
      else return item;
    });
    await this.#writeFile(newArray);
    return newContact;
  }
  async #writeFile(data: IContact[]) {
    await fs.promises.writeFile(this.path, JSON.stringify(data));
  }
}
