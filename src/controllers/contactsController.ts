import DAOs from "../DAL/DAOs/factory";
import { IContact } from "../types/contacts";
import { IReq, IRes } from "../types/request";
import { validateUtils } from "../utils/validate";
import { CustomError } from "../utils/error/customError";
import { HttpCode } from "../utils/error/errorEnums";

class ContactsController {
  async getAllContacts(_req: IReq<IContact>, res: IRes<IContact[]>) {
    const contacts = await DAOs.ContactsDAO.getAllContacts();
    res.json({ message: "Success getting all Contacts", payload: contacts });
  }
  async updateContact(req: IReq<IContact>, res: IRes<IContact>) {
    const { id } = req.params;
    const obj = req.body;
    try {
      const validatedContact = await validateUtils.contactSchema.validateAsync(
        obj,
        { abortEarly: false }
      );
      const newContact = await DAOs.ContactsDAO.updateContact(
        id,
        validatedContact
      );
      res.json({
        message: "Success updating the contact",
        payload: newContact,
      });
    } catch (error) {
      throw new CustomError({
        httpCode: HttpCode.BAD_REQUEST,
        description: error.message,
      });
    }
  }
}

export default new ContactsController();
