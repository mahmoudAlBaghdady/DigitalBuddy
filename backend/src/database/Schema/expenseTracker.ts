import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const expenseTrackerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    type: {
      type: String,
      required: true,
      default: "investment",
    },
    date: {
      type: String,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("ExpenseTracker", expenseTrackerSchema);
