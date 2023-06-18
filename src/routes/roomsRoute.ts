import { Router } from "express";
import roomsController from "../controllers/roomsController";

const router = Router();

router.get("/", roomsController.getAllRooms);
router.get("/:id", roomsController.getRoomDetail);
router.post("/", roomsController.createRoom);
router.put("/:id", roomsController.updateRoom);
router.delete("/:id", roomsController.deleteRoom);

export default router;
