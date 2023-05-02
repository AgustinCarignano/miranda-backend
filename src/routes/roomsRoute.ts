import { Router } from "express";
import roomsController from "@src/controllers/roomsController";

const router = Router();

router.get("/all", roomsController.getAllRooms);
router.get("/:id", roomsController.getRoomDetail);
router.post("/add", roomsController.createRoom);
router.put("/:id", roomsController.updateRoom);
router.delete("/:id", roomsController.deleteRoom);

export default router;
