import { Request, Response } from "express";
import FeedbackModel, { IFeedback } from "../model/feedback";

export const create = async (req: Request, res: Response) => {
  try {
    const { title, category, detail } = req.body;
    const newFeedback = await FeedbackModel.create({ title, category, detail });
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const feedbackList: IFeedback[] = await FeedbackModel.find();
    res.json(feedbackList);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const feedbackId = req.params.id; // Assuming the feedback ID is passed in the URL params
    const { title, category, detail, updateStatus } = req.body;

    const updatedFields: Partial<IFeedback> = { title, category, detail };
    if (updateStatus !== undefined) {
      updatedFields.updateStatus = updateStatus;
    }

    const updatedFeedback = await FeedbackModel.findByIdAndUpdate(
      feedbackId,
      updatedFields,
      { new: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getAllUpdateStatus = async (req: Request, res: Response) => {
  try {
    const plannedFeedback = await FeedbackModel.find({
      updateStatus: "Planned",
    });
    const inProgressFeedback = await FeedbackModel.find({
      updateStatus: "In Progress",
    });
    const liveFeedback = await FeedbackModel.find({ updateStatus: "Live" });

    res.json({
      Planned: plannedFeedback,
      "In Progress": inProgressFeedback,
      Live: liveFeedback,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getFeedbackByCategory = async (req: Request, res: Response) => {
  try {
    try {
      const { category } = req.params;
      const feedbackByCategory: IFeedback[] = await FeedbackModel.find({
        category,
      });

      res.json(feedbackByCategory);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
