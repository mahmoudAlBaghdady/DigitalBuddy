import { configureStore } from "@reduxjs/toolkit";
import VideoReducer from "./Video/VideoSlice";
import AuthReducer from "./Auth/AuthSlice";
import GoalReducer from "./Goals/GoalsSlice";
import DiaryReducer from "./Diary/DiarySlice";
import MovieSeriesReducer from "./MovieSeries/MovieSeriesSlice";
import ExpenseTrackerReducer from "./ExpenseTracker/ExpenseTrackerSlice";
const store = configureStore({
  reducer: {
    Video: VideoReducer,
    Auth: AuthReducer,
    Goal: GoalReducer,
    Diary: DiaryReducer,
    MovieSeries: MovieSeriesReducer,
    ExpenseTracker: ExpenseTrackerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
