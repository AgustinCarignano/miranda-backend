import envVars from "@src/envVars";
import BookingsFS from "./bookingsDAO/bookingsFS";
import RoomsFS from "./roomsDAO/roomsFS";
import UsersFS from "./usersDAO/usersFS";
import { IBookingsDAO } from "@src/types/bookings";
import { IRoomsDAO } from "@src/types/rooms";
import { IUsersDAO } from "@src/types/users";
import { IContactDAO } from "@src/types/contacts";
import ContatcsFS from "./contactsDAO/contactsFS";

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

  default:
    BookingsDAO = new BookingsFS();
    RoomsDAO = new RoomsFS();
    UsersDAO = new UsersFS();
    ContactsDAO = new ContatcsFS();
    break;
}

export default { BookingsDAO, RoomsDAO, UsersDAO, ContactsDAO };
