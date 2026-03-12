import mongoose, { Schema, Document } from "mongoose";

export interface IDoctor extends Document {
    user: mongoose.Types.ObjectId
    bio: string
    clinicAddress: string
    consultationFee: number
    specialization: mongoose.Types.ObjectId
}

const DoctorSchema = new Schema<IDoctor>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bio: String,
    clinicAddress: String,
    consultationFee: Number,
    specialization: { type: Schema.Types.ObjectId, ref: "Specialization" }
})

export default mongoose.model<IDoctor>("Doctor", DoctorSchema)