import { Router } from "express";
import contactsController from "../controllers/contactsController";

const router = Router();

router.get("/", contactsController.getAllContacts);
router.put("/:id", contactsController.updateContact);

export default router;
