"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const feedbackController_1 = require("../controller/feedbackController");
router.post("/", feedbackController_1.create);
router.get("/", feedbackController_1.get);
router.put("/:id", feedbackController_1.update); // Route to update specific feedback by ID
router.get("/status-data", feedbackController_1.getAllUpdateStatus);
router.get("/category/:category", feedbackController_1.getFeedbackByCategory);
exports.default = router;
