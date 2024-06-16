import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [3, "First name must contain at least 3 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [3, "Last name must contain at least 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        minlength: [10, "Phone number must contain 11 digits"],
        maxlength: [10, "Phone number must contain 11 digits"]
    },
    nic: {
        type: String,
        required: [true, "NIC is required"],
        minlength: [13, "NIC must contain exactly 13 digits"],
        maxlength: [13, "NIC must contain exactly 13 digits"]
    },
    dob: {
        type: Date,
        required: [true, "Date of birth is required"]
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ["Male", "Female"]
    },
    password: {
        type: String,
        minlength: [8, "Password must contain at least 8 characters"],
        required: [true, "Password is required"],
        select: false
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: ["Admin", "Patient", "Doctor"]
    },
    doctorDepartment: {
        type: String,
        validate: {
            validator: function(v) {
                return this.role !== "Doctor" || (this.role === "Doctor" && v);
            },
            message: "Doctor department is required for doctors"
        }
    },
    docAvatar: {
        public_id: String,
        url: String
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES });
}

const User = mongoose.model("User", userSchema);

export default User;
