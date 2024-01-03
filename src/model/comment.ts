import mongoose, { Document, Schema, Types } from "mongoose";

export interface IComment extends Document {
  description: string;
  name: string;
  feedbackID: Schema.Types.ObjectId;
  replies?: Types.DocumentArray<IReply["_id"]>;
}

const replySchema: Schema<IReply> = new mongoose.Schema({
  description: { type: String, required: true },
  name: { type: String, required: true },
});

export interface IReply extends Document {
  description: string;
  name: string;
}

const commentSchema: Schema<IComment> = new mongoose.Schema({
  description: { type: String, required: true },
  name: { type: String, required: true },
  feedbackID: { type: Schema.Types.ObjectId, ref: "Feedback" },
  replies: [replySchema], // Embedding replies within comments
});

const CommentModel = mongoose.model<IComment>("Comment", commentSchema);

export default CommentModel;
