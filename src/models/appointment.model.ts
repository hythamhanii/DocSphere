import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
    patient: mongoose.Types.ObjectId
    doctor: mongoose.Types.ObjectId
    date: Date
    state: "pending" | "confirmed" | "cancelled" | "completed"
}

const AppointmentSchema = new Schema<IAppointment>({
    patient: { type: Schema.Types.ObjectId, ref: "Patient" },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
    date: Date,
    state: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "completed"],
        default: "pending"
    }
})

export default mongoose.model<IAppointment>("Appointment", AppointmentSchema)