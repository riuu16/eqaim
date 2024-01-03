"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leastComment = exports.mostComment = exports.replyComment = exports.countComment = exports.get = exports.create = void 0;
const comment_1 = __importDefault(require("../model/comment"));
const feedback_1 = __importDefault(require("../model/feedback"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, name } = req.body;
        const newComment = yield comment_1.default.create({
            description,
            name,
        });
        res.status(201).json(newComment);
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.create = create;
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { feedbackId } = req.params;
        const comments = yield comment_1.default.find({
            feedbackID: feedbackId,
        });
        res.json(comments);
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.get = get;
const countComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all feedbacks
        const feedbacks = yield feedback_1.default.find();
        // Fetch comment count for each feedback using aggregation
        const commentCounts = yield comment_1.default.aggregate([
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
        const commentCountMap = new Map();
        commentCounts.forEach((item) => {
            commentCountMap.set(item.feedbackID.toString(), item.count);
        });
        // Associate comment count with each feedback
        const feedbacksWithCommentCount = feedbacks.map((feedback) => (Object.assign(Object.assign({}, feedback.toJSON()), { commentCount: commentCountMap.get(feedback._id.toString()) || 0 })));
        res.json(feedbacksWithCommentCount);
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.countComment = countComment;
const replyComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const { description, name } = req.body;
        if (!description || !name) {
            return res
                .status(400)
                .json({ error: "Description and name are required for a reply" });
        }
        const updatedComment = yield comment_1.default.findByIdAndUpdate(commentId, { $push: { replies: { description, name } } }, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.status(201).json(updatedComment);
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.replyComment = replyComment;
const mostComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const feedbackCommentsCount = yield comment_1.default.aggregate([
            {
                $group: {
                    _id: "$feedbackID",
                    count: { $sum: 1 },
                },
            },
        ]);
        const sortedFeedbackComments = feedbackCommentsCount.sort((a, b) => b.count - a.count);
        const mostCommentsFeedbackId = (_a = sortedFeedbackComments[0]) === null || _a === void 0 ? void 0 : _a._id;
        const mostCommentsFeedback = yield feedback_1.default.findById(mostCommentsFeedbackId);
        res.json(mostCommentsFeedback);
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.mostComment = mostComment;
const leastComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const feedbackCommentsCount = yield comment_1.default.aggregate([
            {
                $group: {
                    _id: "$feedbackID",
                    count: { $sum: 1 },
                },
            },
        ]);
        const sortedFeedbackComments = feedbackCommentsCount.sort((a, b) => a.count - b.count);
        const leastCommentsFeedbackId = (_b = sortedFeedbackComments[0]) === null || _b === void 0 ? void 0 : _b._id;
        const leastCommentsFeedback = yield feedback_1.default.findById(leastCommentsFeedbackId);
        res.json(leastCommentsFeedback);
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.leastComment = leastComment;
