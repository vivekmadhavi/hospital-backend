import express from "express";
import { getAllMessages, sendMessage } from "../controller/Messagecontroller.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getAll",isAdminAuthenticated, getAllMessages);

export default router;
