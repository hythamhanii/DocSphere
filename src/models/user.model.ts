import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    firstName: string
    lastName: string
    phone: string
    email: string
    dateOfBirth: Date
    password: string
    gender: string
    role: "admin" | "doctor" | "patient"
    isActive: boolean
    createdAt: Date
    picture?: string
}

const UserSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: Date,
    password: { type: String, required: true },
    gender: String,
    role: { type: String, enum: ["admin", "doctor", "patient"], required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    picture: String
})

export default mongoose.model<IUser>("User", UserSchema)