import ContatcsFS from "./contactsFS";
import ContactsSQL from "./contactsSQL";
import ContactsMongo from "./contactsMDB";

const ContactDAOs = {
  FS: ContatcsFS,
  SQL: ContactsSQL,
  MONGO: ContactsMongo,
};

export default ContactDAOs;
