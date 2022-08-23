import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const diarySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    events: {
      type: Array,
      required: false,
      id: {
        type: Number,
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
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

export default model("diary", diarySchema);
