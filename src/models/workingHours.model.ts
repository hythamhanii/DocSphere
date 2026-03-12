import mongoose, { Schema, Document } from "mongoose";

export interface IWorkingHours extends Document {
    doctor: mongoose.Types.ObjectId
    day: string
    startDate: Date
    endDate: Date
}

const WorkingHoursSchema = new Schema<IWorkingHours>({
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
    day: String,
    startDate: Date,
    endDate: Date
})

export default mongoose.model<IWorkingHours>("WorkingHours", WorkingHoursSchema)