import express from "express";
const router = express.Router();

import {
  create,
  get,
  countComment,
  replyComment,
  mostComment,
  leastComment,
} from "../controller/commentController";

router.post("/feedback/:feedbackId", create);
router.get("/feedback/:feedbackId", get);
router.get("/feedbacks-with-comment-count", countComment);
router.get("/:commentId/reply", replyComment);
router.get("/feedback/most-comment", mostComment);
router.get("/feedback/least-comment", leastComment);

export default router;
