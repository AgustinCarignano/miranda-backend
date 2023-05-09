import envVars from "@src/envVars";
import BookingsFS from "./bookingsDAO/bookingsFS";
import RoomsFS from "./roomsDAO/roomsFS";
import UsersFS from "./usersDAO/usersFS";
import ContatcsFS from "./contactsDAO/contactsFS";
import BookingsSQL from "./bookingsDAO/bookingsSQL";
import RoomSQL from "./roomsDAO/roomsSQL";
import UsersSQL from "./usersDAO/usersSQL";
import ContactsSQL from "./contactsDAO/contactsSQL";
import { IBookingsDAO } from "@src/types/bookings";
import { IRoomsDAO } from "@src/types/rooms";
import { IUsersDAO } from "@src/types/users";
import { IContactDAO } from "@src/types/contacts";

let BookingsDAO: IBookingsDAO;
let RoomsDAO: IRoomsDAO;
let UsersDAO: IUsersDAO;
let ContactsDAO: IContactDAO;

switch (envVars.Dao) {
  case "FileSystem":
    BookingsDAO = new BookingsFS();
    RoomsDAO = new RoomsFS();
    UsersDAO = new UsersFS();
    ContactsDAO = new ContatcsFS();
    break;
  case "MySQL":
    BookingsDAO = new BookingsSQL();
    RoomsDAO = new RoomSQL();
    UsersDAO = new UsersSQL();
    ContactsDAO = new ContactsSQL();
    break;
  default:
    BookingsDAO = new BookingsFS();
    RoomsDAO = new RoomsFS();
    UsersDAO = new UsersFS();
    ContactsDAO = new ContatcsFS();
    break;
}

export default { BookingsDAO, RoomsDAO, UsersDAO, ContactsDAO };
