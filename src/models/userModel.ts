import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    forgotPasswordToken: { type: String, required: false },
    forgotPasswordTokenExpiry: { type: Date, required: false },
    verifyToken: { type: String, required: false },
    verifyTokenExpiry: { type: Date, required: false },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
