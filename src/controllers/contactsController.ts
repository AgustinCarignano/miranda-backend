import contactsService from "@src/services/contactsService";
import { IContact } from "@src/types/contacts";
import { IReq, IRes } from "@src/types/request";

class ContactsController {
  async getAllContacts(_req: IReq<IContact>, res: IRes<IContact[]>) {
    const contacts = await contactsService.getAllContacts();
    res.json({ message: "Success getting all Contacts", payload: contacts });
  }
  async updateContact(req: IReq<IContact>, res: IRes<IContact>) {
    const { id } = req.params;
    const obj = req.body;
    const newContact = await contactsService.updateContact(id, obj);
    res.json({ message: "Success updating the contact", payload: newContact });
  }
}

export default new ContactsController();
