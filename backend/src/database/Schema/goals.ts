import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const goalsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    finished: {
      type: Boolean,
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

export default model("goals", goalsSchema);
