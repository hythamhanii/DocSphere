import mongoose, { Schema, Document } from "mongoose";

export interface IRating extends Document {
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  rate: number;
  comment: string;
  date: Date;
}

const RatingSchema = new Schema<IRating>({
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
  rate: { type: Number, min: 1, max: 5 },
  comment: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IRating>("Rating", RatingSchema);
