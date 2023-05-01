import bookingsController from "@src/controllers/bookingsController";
import { Router } from "express";

const router = Router();

router.get("/", bookingsController.getAllBookings);
router.get("/:id", bookingsController.getBookingDetail);
router.post("/", bookingsController.createBooking);
router.put("/:id", bookingsController.updateBooking);
router.delete("/:id", bookingsController.deleteBooking);

export default router;
