"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const feedbackRoutes_1 = __importDefault(require("./routes/feedbackRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
mongoose_1.default
    .connect("mongodb://localhost:27017/feedbackDb")
    .then(() => {
    console.log("connect Sucessfully");
})
    .catch((err) => {
    console.log("something went wrong", err);
});
// mongoose
//   .connect("mongodb+srv://riyamantala:Riya1601@c.pul5zlq.mongodb.net/feedback?retryWrites=true&w=majority")
//   .then(() => {
//     console.log("connected sucessfull");
//   })
//   .catch((err) => {
//     console.log("something went wrong", err);
//   });
// Middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Routes
app.use("/api/feedback", feedbackRoutes_1.default);
app.use("/api/comment", commentRoutes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
