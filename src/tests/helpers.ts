import { agent as _request } from "supertest";
import dotenv from "dotenv";
import server from "@src/server";

dotenv.config();

export const testEnvVars = {
  user: process.env.TEST_USER ?? "",
  password: process.env.TEST_PASS ?? "",
};

export const request = _request(server);

export const bookingObjTest = {
  id: "048905635-0",
  guest: "Jere Waldera",
  specialRequest:
    "semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus",
  orderDate: 1676064790000,
  roomType: "Suite",
  status: "Check Out",
  checkIn: 1648880925000,
  checkOut: 1649057875000,
  roomId: "777811272-8",
  roomNumber: "679",
  roomImg: "https://i.imgur.com/wRHoim3.jpg",
};

export const newBookingTest = {
  id: "test-04753050015-9",
  guest: "Test",
  specialRequest: "",
  orderDate: 1676064790000,
  roomType: "",
  status: "",
  checkIn: 1648880925000,
  checkOut: 1649057875000,
  roomId: "",
  roomNumber: "",
  roomImg: "",
};

export const roomObjTest = {
  photos: [
    "https://i.imgur.com/wRHoim3.jpg",
    "https://i.imgur.com/JfDFjih.jpg",
    "https://i.imgur.com/1zVmQkU.jpg",
  ],
  roomType: "Double Superior",
  description:
    "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
  roomNumber: 746,
  id: "772247758-5",
  offer: true,
  price: 780,
  discount: "25%",
  cancellation:
    "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
  status: "Booked",
  amenities: [
    "Air Conditioner",
    "High speed WiFi",
    "Breakfast",
    "Cleaning",
    "Shower",
    "Shop near",
    "Towels",
  ],
};

export const newRoomTest = {
  photos: ["", "", ""],
  roomType: "Double Superior",
  description: "",
  roomNumber: 746,
  id: "7727637048-02",
  offer: true,
  price: 780,
  discount: "25%",
  cancellation: "",
  status: "Booked",
  amenities: ["Air Conditioner"],
};
