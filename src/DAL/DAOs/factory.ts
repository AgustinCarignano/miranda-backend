import { IBookingsDAO } from "../../types/bookings";
import { IRoomsDAO } from "../../types/rooms";
import { IUsersDAO } from "../../types/users";
import { IContactDAO } from "../../types/contacts";
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

export default { BookingsDAO, RoomsDAO, UsersDAO, ContactsDAO };
