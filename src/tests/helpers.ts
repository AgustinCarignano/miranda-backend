import { agent as _request } from "supertest";
import server from "@src/server";
import "@src/pre-start";
import envVars from "@src/envVars";

export const request = _request(server);

export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMCwiZW1haWwiOiJhZ3VzdGluLmNhcmlnbmFub0BnbWFpbC5jb20ifSwiaWF0IjoxNjg0MjI3NDcwLCJleHAiOjE2ODQzMTM4NzB9.mrJ0_W_efaarxGJA3mi42UVpy9oj6yLzDROTRTcXZns";

export const user = {
  email: envVars.test.user,
  password: envVars.test.password,
};

export const bookingObjTest = {
  _id: "64633e6340ebc8ffde3c4db6",
  guest: "Catherine McDermott PhD",
  specialRequest: "No special request at all",
  orderDate: 1660338411388,
  roomType: "Double Bed",
  status: "Check Out",
  checkIn: 1673917510897,
  checkOut: 1673478072554,
  roomId: "64633e6240ebc8ffde3c4da4",
  roomNumber: 471,
  roomImg: "https://loremflickr.com/640/480",
};

export const newBookingTest = {
  guest: "Test guest",
  specialRequest: "No special request at all",
  orderDate: 1660338411388,
  roomType: "Single Bed",
  status: "Check Out",
  checkIn: 1673917510897,
  checkOut: 1673478072554,
  roomId: "64633e6240ebc8ffde3c4da6",
  roomNumber: 704,
  roomImg: "https://loremflickr.com/640/480",
};

export const roomObjTest = {
  _id: "64633e6240ebc8ffde3c4da2",
  photos: [
    "https://loremflickr.com/640/480",
    "https://loremflickr.com/640/480",
    "https://loremflickr.com/640/480",
  ],
  roomType: "Double Superior",
  description: "Modi odit quis asperiores.",
  roomNumber: 568,
  offer: true,
  price: 981,
  discount: 5,
  cancellation:
    "Debitis maiores incidunt ipsum quaerat optio placeat delectus tempore delectus.",
  status: "Booked",
  amenities: [
    "Towels",
    "High speed WiFi",
    "Grocery",
    "Cleaning",
    "Air Conditioner",
    "Shop near",
    "Single Bed",
    "Breakfast",
    "Kitchen",
    "Shower",
  ],
};

export const newRoomTest = {
  photos: [
    "https://loremflickr.com/640/480",
    "https://loremflickr.com/640/480",
    "https://loremflickr.com/640/480",
  ],
  roomType: "Double Superior",
  description: "Modi odit quis asperiores.",
  roomNumber: 985,
  offer: true,
  price: 700,
  discount: 15,
  cancellation:
    "Debitis maiores incidunt ipsum quaerat optio placeat delectus tempore delectus.",
  status: "Booked",
  amenities: ["Towels", "High speed WiFi", "Grocery"],
};

export const userObjTest = {
  _id: "64633e6540ebc8ffde3c4ddc",
  photo:
    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/301.jpg",
  fullName: "Andrew Shields II",
  email: "Paige.Becker62@gmail.com",
  startDate: 1669980266400,
  description: "Corporate",
  contact: "24973 572849",
  status: "ACTIVE",
  role: "Receptionist",
  password: "$2b$12$fWoiDNb54HgW7i2elMaeXeoio/wYIqMNEJbOpenmYRXOhaf0VsHKC",
};

export const newUserTest = {
  photo:
    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/301.jpg",
  fullName: "Test Testing",
  email: "tests@gmail.com",
  startDate: 1669980266400,
  description: "Some description",
  contact: "24973 572849",
  status: "ACTIVE",
  role: "Receptionist",
  password: "$2b$12$fWoiDNb54HgW7i2elaDyuToio/wYIqMNEJbOpenmYRXOhaf0VsHKC",
};

export const contactObjTest = {
  _id: "64633ed4f212c8dde074075a",
  fullName: "Suzanne Jakubowski",
  email: "SuzanneJakubowski58@yahoo.com",
  phone: "90168 364776",
  subject:
    "Porro veritatis voluptas consectetur velit rem quam odit dolor consectetur.",
  message:
    "Autem numquam blanditiis minus. Nihil architecto unde non eius. Rerum eum corporis praesentium.",
  date: 1673124885322,
  _read: false,
  archived: true,
};
