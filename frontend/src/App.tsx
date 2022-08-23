import React from "react";
import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Videos from "./components/Videos/Videos";
import Login from "./components/Auth/Login";
import "bootswatch/dist/quartz/bootstrap.min.css";
import SignUp from "./components/Auth/SignUp";
import Navbar from "./components/UI/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Goals from "./components/Goals/Goals";
import Diary from "./components/Diary/Diary";
import Details from "./components/Diary/DiaryDetails/Details";
import DiaryUpdate from "./components/Diary/DiaryForms/DiaryUpdate";
import MoviesSeries from "./components/MovieSeries/MovieSeries";
import MSDetails from "./components/MovieSeries/MSDetails";
import MSFavorites from "./components/MovieSeries/Favorites/MSFavorites";
import ExpenseTracker from "./components/ExpenseTracker/ExpenseTracker";
import ETHistory from "./components/ExpenseTracker/History/ETHistory";

function App() {
  const location = useLocation();
  console.log(location.pathname);
  console.log(!localStorage.getItem("token"));
  return (
    <>
      <Toaster />
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Navbar />
      )}

      <Routes>
        {/* Landing Route */}
        {!localStorage.getItem("token") && (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
        {/* Auth Routes */}
        {!localStorage.getItem("token") && (
          <Route path="/login" element={<Login />} />
        )}
        {!localStorage.getItem("token") && (
          <Route path="/register" element={<SignUp />} />
        )}
        {localStorage.getItem("token") && (
          <>
            {/* video Routes */}
            <Route path="/videos" element={<Videos />} />
            {/* Goal Routes */}
            <Route path="/goals" element={<Goals />} />
            {/* Diary Routes */}
            <Route path="/diary" element={<Diary />} />
            <Route path="/diary/:id" element={<Details />} />
            <Route path="/diary/update/:id" element={<DiaryUpdate />} />
            {/* MovieSeries Routes */}
            <Route path="/moviesSeries" element={<MoviesSeries />} />
            <Route
              path="/moviesSeries/MovieSeriesDetails/:ImdbId"
              element={<MSDetails />}
            />
            <Route path="/moviesSeries/favorites" element={<MSFavorites />} />
            {/* Expense Tracker Routes */}
            <Route path="/expenseTracker" element={<ExpenseTracker />} />
            <Route path="/expenseTracker/history" element={<ETHistory />} />
          </>
        )}
        {!localStorage.getItem("token") && (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
        {localStorage.getItem("token") && (
          <Route path="*" element={<Navigate to="/videos" />} />
        )}
      </Routes>
    </>
  );
}

export default App;
