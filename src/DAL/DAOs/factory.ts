import { IBookingsDAO } from "@src/types/bookings";
import { IRoomsDAO } from "@src/types/rooms";
import { IUsersDAO } from "@src/types/users";
import { IContactDAO } from "@src/types/contacts";
import BookingDAOs from "./bookingsDAO/bookingIndex";
import RoomDAOs from "./roomsDAO/roomIndex";
import UserDAOs from "./usersDAO/userIndex";
import ContactDAOs from "./contactsDAO/contactIndex";

let BookingsDAO: IBookingsDAO;
let RoomsDAO: IRoomsDAO;
let UsersDAO: IUsersDAO;
let ContactsDAO: IContactDAO;

import("../Mongo/config");
BookingsDAO = new BookingDAOs.MONGO();
RoomsDAO = new RoomDAOs.MONGO();
UsersDAO = new UserDAOs.MONGO();
ContactsDAO = new ContactDAOs.MONGO();
console.log("Successfully connected to database");

export default { BookingsDAO, RoomsDAO, UsersDAO, ContactsDAO };
