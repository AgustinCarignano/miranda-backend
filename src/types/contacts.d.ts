export interface IContact {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: number;
  read: boolean;
  archived: boolean;
}

export interface IContactDAO {
  path?: string;
  getAllContacts: () => Promise<IContact[]>;
  updateContact: (id: string, obj: IContact) => Promise<IContact>;
}
