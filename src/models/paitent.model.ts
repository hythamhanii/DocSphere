import mongoose, { Schema, Document } from "mongoose";

export interface IPatient extends Document {
    user: mongoose.Types.ObjectId
    bloodType: string
}

const PatientSchema = new Schema<IPatient>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bloodType: String
})

export default mongoose.model<IPatient>("Patient", PatientSchema)