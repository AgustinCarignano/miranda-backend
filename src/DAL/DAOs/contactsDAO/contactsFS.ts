import fs from "fs-extra";
import { __rootDir } from "@src/utils/pathUtils";
import { IContact, IContactDAO } from "@src/types/contacts";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

export default class ContatcsFS implements IContactDAO {
  path = `${__rootDir}/src/jsonData/contactsData.json`;

  async getAllContacts() {
    try {
      const jsonData = await fs.promises.readFile(this.path, "utf-8");
      const data: IContact[] = JSON.parse(jsonData);
      return data;
    } catch (error) {
      throw new CustomError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: error.mesagge,
      });
    }
  }

  async updateContact(id: string, obj: IContact) {
    try {
      const allContacts = await this.getAllContacts();
      const contact = allContacts.find((item) => item.id === id);
      if (!contact)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Contact not found",
        });
      const newContact = { ...contact, ...obj, id };
      const newArray = allContacts.map((item) => {
        if (item.id === id) return newContact;
        else return item;
      });
      await this.#writeFile(newArray);
      return newContact;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      else
        throw new CustomError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          description: error.mesagge,
        });
    }
  }
  async #writeFile(data: IContact[]) {
    await fs.promises.writeFile(this.path, JSON.stringify(data));
  }
}
