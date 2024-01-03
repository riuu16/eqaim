import { Request, Response } from "express";
import CommentModel, { IComment, IReply } from "../model/comment";
import FeedbackModel, { IFeedback } from "../model/feedback";

export const create = async (req: Request, res: Response) => {
  try {
    const { description, name } = req.body;

    const newComment = await CommentModel.create({
      description,
      name,
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const { feedbackId } = req.params;
    const comments: IComment[] = await CommentModel.find({
      feedbackID: feedbackId,
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const countComment = async (req: Request, res: Response) => {
  try {
    // Fetch all feedbacks
    const feedbacks: IFeedback[] = await FeedbackModel.find();

    // Fetch comment count for each feedback using aggregation
    const commentCounts = await CommentModel.aggregate([
      {
        $group: {
          _id: "$feedbackID",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          feedbackID: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    // Create a map to store comment counts indexed by feedbackID
    const commentCountMap = new Map<string, number>();
    commentCounts.forEach((item: { feedbackID: string; count: number }) => {
      commentCountMap.set(item.feedbackID.toString(), item.count);
    });

    // Associate comment count with each feedback
    const feedbacksWithCommentCount = feedbacks.map((feedback) => ({
      ...feedback.toJSON(),
      commentCount: commentCountMap.get(feedback._id.toString()) || 0,
    }));

    res.json(feedbacksWithCommentCount);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const replyComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { description, name } = req.body;
    if (!description || !name) {
      return res
        .status(400)
        .json({ error: "Description and name are required for a reply" });
    }

    const updatedComment: IComment | null =
      await CommentModel.findByIdAndUpdate(
        commentId,
        { $push: { replies: { description, name } } },
        { new: true }
      );

    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(201).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const mostComment = async (req: Request, res: Response) => {
  try {
    const feedbackCommentsCount = await CommentModel.aggregate([
      {
        $group: {
          _id: "$feedbackID",
          count: { $sum: 1 },
        },
      },
    ]);

    const sortedFeedbackComments = feedbackCommentsCount.sort(
      (a: any, b: any) => b.count - a.count
    );

    const mostCommentsFeedbackId = sortedFeedbackComments[0]?._id;

    const mostCommentsFeedback = await FeedbackModel.findById(
      mostCommentsFeedbackId
    );

    res.json(mostCommentsFeedback);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const leastComment = async (req: Request, res: Response) => {
  try {
    const feedbackCommentsCount = await CommentModel.aggregate([
      {
        $group: {
          _id: "$feedbackID",
          count: { $sum: 1 },
        },
      },
    ]);

    const sortedFeedbackComments = feedbackCommentsCount.sort(
      (a: any, b: any) => a.count - b.count
    );

    const leastCommentsFeedbackId = sortedFeedbackComments[0]?._id;

    const leastCommentsFeedback = await FeedbackModel.findById(
      leastCommentsFeedbackId
    );

    res.json(leastCommentsFeedback);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
