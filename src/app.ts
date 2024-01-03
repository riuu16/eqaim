// src/index.ts
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import feedbackRoutes from "./routes/feedbackRoutes";
import commentRoutes from "./routes/commentRoutes";
const app = express();
const PORT = process.env.PORT || 3000;

mongoose
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes

app.use("/api/feedback", feedbackRoutes);
app.use("/api/comment", commentRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
