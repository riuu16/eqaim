import express from "express";
const router = express.Router();
import {
  create,
  get,
  update,
  getAllUpdateStatus,
  getFeedbackByCategory,
} from "../controller/feedbackController";

router.post("/", create);
router.get("/", get);
router.put("/:id", update); // Route to update specific feedback by ID
router.get("/status-data", getAllUpdateStatus);
router.get("/category/:category", getFeedbackByCategory);

export default router;
