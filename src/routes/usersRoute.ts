import { Router } from "express";
import usersController from "@src/controllers/usersController";

const router = Router();

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserDetail);
router.post("/", usersController.createUser);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

export default router;
