import app from "./app";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import diaryRoutes from "./routes/diary/diary.routes";
import videoRoutes from "./routes/videos/videos.routes";
import goalRoutes from "./routes/goals/goals.routes";
import movieRoutes from "./routes/movieSeries/movieSeries.routes";
import expenseRoute from "./routes/expenseTracker/expenseTracker.routes";
import userRoute from "./routes/users/user.routes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import authMiddleware from "./middleware/authMiddleware";
import connectDatabase from "./database/database";
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
connectDatabase();
app.use(authMiddleware)
app.use(express.urlencoded({ extended: false }));
app.use(videoRoutes);
app.use(goalRoutes);
app.use(diaryRoutes);
app.use(movieRoutes);
app.use(expenseRoute);
app.use(userRoute);
app.use(notFound);
app.use(errorHandler);

app.listen(app.get("port"), () => {
  console.log("server on port ", app.get("port"));
});
