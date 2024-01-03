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
exports.getFeedbackByCategory = exports.getAllUpdateStatus = exports.update = exports.get = exports.create = void 0;
const feedback_1 = __importDefault(require("../model/feedback"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, category, detail } = req.body;
        const newFeedback = yield feedback_1.default.create({ title, category, detail });
        res.status(201).json(newFeedback);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.create = create;
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedbackList = yield feedback_1.default.find();
        res.json(feedbackList);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.get = get;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedbackId = req.params.id; // Assuming the feedback ID is passed in the URL params
        const { title, category, detail, updateStatus } = req.body;
        const updatedFields = { title, category, detail };
        if (updateStatus !== undefined) {
            updatedFields.updateStatus = updateStatus;
        }
        const updatedFeedback = yield feedback_1.default.findByIdAndUpdate(feedbackId, updatedFields, { new: true });
        if (!updatedFeedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }
        res.json(updatedFeedback);
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.update = update;
const getAllUpdateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plannedFeedback = yield feedback_1.default.find({
            updateStatus: "Planned",
        });
        const inProgressFeedback = yield feedback_1.default.find({
            updateStatus: "In Progress",
        });
        const liveFeedback = yield feedback_1.default.find({ updateStatus: "Live" });
        res.json({
            Planned: plannedFeedback,
            "In Progress": inProgressFeedback,
            Live: liveFeedback,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.getAllUpdateStatus = getAllUpdateStatus;
const getFeedbackByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        try {
            const { category } = req.params;
            const feedbackByCategory = yield feedback_1.default.find({
                category,
            });
            res.json(feedbackByCategory);
        }
        catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.getFeedbackByCategory = getFeedbackByCategory;
