import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
    message: {
        type: String,
        required: true,
        minlength: [10, "Message must contain at least 10 characters"]
    },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
