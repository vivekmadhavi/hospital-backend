import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, "First name must contain at least 3 characters"]
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, "Last name must contain at least 3 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone: {
        type: String,
        required: true,
        minlength: [10, "Phone number must contain 11 digits"],
        maxlength: [10, "Phone number must contain 11 digits"]
    },
    nic: {
        type: String,
        required: true,
        minlength: [13, "NIC must contain Exact 13 Digits!"],
        maxlength: [13, "NIC must contain Exact 13 Digits!"]
    },
    dob: {
        type: Date,
        required: [true,"Dob is required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    appointment_date:{
        type:String,
        required:true
    },
    department: {
        type: String,
        required: [true, "Department Name Is Required!"],
      },
    doctor:{
        firstName:{
            type:String,
            required: true,
        },
        lastName:{
            type:String,
            required : true,
        },
    },
    hasVisited:{
        type:Boolean,
        default:false,
    },
    doctorID:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    PatientID:{
        type: mongoose.Schema.ObjectId,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    }
});

export const Appointment = mongoose.model("Appointment",appointmentSchema)