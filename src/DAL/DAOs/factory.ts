import envVars from "@src/envVars";
import RoomsFS from "./roomsDAO/roomsFS";
import UsersFS from "./usersDAO/usersFS";
import RoomSQL from "./roomsDAO/roomsSQL";
import UsersSQL from "./usersDAO/usersSQL";
import { IBookingsDAO } from "@src/types/bookings";
import { IRoomsDAO } from "@src/types/rooms";
import { IUsersDAO } from "@src/types/users";
import { IContactDAO } from "@src/types/contacts";
import BookingDAOs from "./bookingsDAO/bookingIndex";
import RoomDAOs from "./roomsDAO/roomIndex";
import UserDAOs from "./usersDAO/userIndex";
import ContactDAOs from "./contactsDAO/contactIndex";
import { testDB } from "../MySQL/config";

let BookingsDAO: IBookingsDAO;
let RoomsDAO: IRoomsDAO;
let UsersDAO: IUsersDAO;
let ContactsDAO: IContactDAO;

switch (envVars.Dao) {
  case "FileSystem":
    BookingsDAO = new BookingDAOs.FS();
    RoomsDAO = new RoomDAOs.FS();
    UsersDAO = new UserDAOs.FS();
    ContactsDAO = new ContactDAOs.FS();
    console.log("Using FileSystem for persistence");
    break;
  case "MySQL":
    testDB();
    BookingsDAO = new BookingDAOs.SQL();
    RoomsDAO = new RoomDAOs.SQL();
    UsersDAO = new UserDAOs.SQL();
    ContactsDAO = new ContactDAOs.SQL();
    console.log("Using MySQL for persistence");
    break;
  case "MONGO":
    import("../Mongo/config");
    BookingsDAO = new BookingDAOs.MONGO();
    RoomsDAO = new RoomDAOs.MONGO();
    UsersDAO = new UserDAOs.MONGO();
    ContactsDAO = new ContactDAOs.MONGO();
    console.log("Using Mongo for persistence");
    break;
  default:
    BookingsDAO = new BookingDAOs.FS();
    RoomsDAO = new RoomDAOs.FS();
    UsersDAO = new UserDAOs.FS();
    ContactsDAO = new ContactDAOs.FS();
    break;
}

export default { BookingsDAO, RoomsDAO, UsersDAO, ContactsDAO };
