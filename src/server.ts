import "./pre-start";
import express from "express";
import cors from "cors";
import routes from "@src/routes/index";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/bookings", routes.bookingsRouter);
app.use("/api/rooms", routes.roomsRouter);
app.use("/api/users", routes.usersRouter);
app.use("/api/contacts", routes.contactsRouter);

export default app;
