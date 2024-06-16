import express from "express";
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus } from "../controller/appointmentController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";
import { get } from "mongoose";


const router = express.Router();

router.post("/post",isPatientAuthenticated, postAppointment );
router.get("/getall",isAdminAuthenticated,getAllAppointments)
router.put("/update/:id",isAdminAuthenticated,updateAppointmentStatus)
router.delete("/delete/:id",isAdminAuthenticated,deleteAppointment)


export default router;
