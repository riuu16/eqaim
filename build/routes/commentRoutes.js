"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const commentController_1 = require("../controller/commentController");
router.post("/feedback/:feedbackId", commentController_1.create);
router.get("/feedback/:feedbackId", commentController_1.get);
router.get("feedbacks-with-comment-count", commentController_1.countComment);
router.get("/:commentId/reply", commentController_1.replyComment);
router.get("/feedback/most-comment", commentController_1.mostComment);
router.get("/feedback/least-comment", commentController_1.leastComment);
exports.default = router;
