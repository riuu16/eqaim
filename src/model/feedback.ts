import mongoose, { Document, Schema, Types } from "mongoose";
import { IComment } from "./comment";

export interface IFeedback extends Document {
  title: string;
  category: "ui" | "ux" | "enhanced" | "bug" | "feature"; // Specific allowed values for category
  detail: string;
  updateStatus?: "Planned" | "In Progress" | "Live" | null;
  comments: Types.DocumentArray<IComment["_id"]>;
}

const feedbackSchema: Schema<IFeedback> = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ["ui", "ux", "enhanced", "bug", "feature"], // Limit category to specific allowed values
    required: true,
  },
  detail: { type: String, required: true },
  updateStatus: {
    type: String,
    enum: ["Planned", "In Progress", "Live", null],
    default: null, 
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const FeedbackModel = mongoose.model<IFeedback>("Feedback", feedbackSchema);

export default FeedbackModel;
