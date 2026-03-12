import mongoose, { Schema, Document } from "mongoose";

export interface ISpecialization extends Document {
    name: string
    description: string
}

const SpecializationSchema = new Schema<ISpecialization>({
    name: { type: String, required: true },
    description: String
})

export default mongoose.model<ISpecialization>("Specialization", SpecializationSchema)