import mongoose, { Schema, Document } from "mongoose"

export interface IPayment extends Document {
  appointment: mongoose.Types.ObjectId
  amount: number
  method: "cash" | "card" | "online"
  tax: number
  status: "pending" | "paid" | "failed"
  createdAt: Date
}

const PaymentSchema = new Schema<IPayment>({
  appointment: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  method: {
    type: String,
    enum: ["cash", "card", "online"]
  },
  tax: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model<IPayment>("Payment", PaymentSchema)