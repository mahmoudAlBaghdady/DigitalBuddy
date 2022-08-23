import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const movieSeriesSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Poster: {
    type: String,
    required: true,
  },
  Year: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  imdbID: {
    type: String,
    required: true,
  },
  isFavorite: {
    type: Boolean,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default model("MovieSeries", movieSeriesSchema);
