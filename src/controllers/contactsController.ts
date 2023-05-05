import DAOs from "@src/DAL/DAOs/factory";
import { IContact } from "@src/types/contacts";
import { IReq, IRes } from "@src/types/request";
import checkProperties from "@src/utils/checkPropertiesUtils";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

class ContactsController {
  async getAllContacts(_req: IReq<IContact>, res: IRes<IContact[]>) {
    const contacts = await DAOs.ContactsDAO.getAllContacts();
    res.json({ message: "Success getting all Contacts", payload: contacts });
  }
  async updateContact(req: IReq<IContact>, res: IRes<IContact>) {
    const { id } = req.params;
    const obj = req.body;
    const isValidContactObj = checkProperties.isValidContact(obj);
    if (!isValidContactObj)
      throw new CustomError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Contact object has a wrong format",
      });
    const newContact = await DAOs.ContactsDAO.updateContact(id, obj);
    res.json({ message: "Success updating the contact", payload: newContact });
  }
}

export default new ContactsController();
