import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import User from '../models/useSchema.js';
import { Appointment } from "../models/appointmentSchema.js";


export const postAppointment = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, appointment_date, department, doctor_firstName, doctor_lastName, hasVisited, address } = req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !gender ||
        !dob ||
        !nic ||
        !appointment_date ||
        !department ||
        !doctor_firstName ||
        !doctor_lastName ||
        !address
    ) {
        return next(new ErrorHandler("Please fill out the entire form!", 400));
    }

    // Check if the user is authenticated
    if (!req.user || !req.user._id) {
        return next(new ErrorHandler("User not authenticated", 401));
    }

    console.log("Authenticated user:", req.user); // Debugging: Log the user object

    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department,
    });

    if (isConflict.length === 0) {
        return next(new ErrorHandler("Doctor not found!", 404));
    }

    if (isConflict.length > 1) {
        return next(new ErrorHandler("Doctor conflict! Please contact through email or phone!", 404));
    }

    const doctorID = isConflict[0]._id;
    const PatientID = req.user._id;
    console.log("Patient ID:", PatientID)
    console.log(doctorID)

    const appointment = await Appointment.create({
        firstName, lastName, email, phone, nic, dob, gender, appointment_date, department, doctor: { firstName: doctor_firstName, lastName: doctor_lastName }, hasVisited, address,doctorID, PatientID
    });

    res.status(200).json({
        success: true,
        message: "Appointment sent",
        appointment,
    });
});

export const getAllAppointments = catchAsyncError(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        appointments
    })
})

export const updateAppointmentStatus = catchAsyncError(async (req, res, nexr) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment not found", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Appointment Status Udpated!",
        appointment,
    })
})

export const deleteAppointment = catchAsyncError(async (req, res, nexr) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment not found", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({
        success: true,
        message: "Appointment Deleted!",
    });
})
