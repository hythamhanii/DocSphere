import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
    name: string
    doctor: mongoose.Types.ObjectId
    price: number
    time: string
}

const ServiceSchema = new Schema<IService>({
    name: { type: String, required: true },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
    price: Number,
    time: String
})

export default mongoose.model<IService>("Service", ServiceSchema)