import { RequestHandler } from "express";
import axios from "axios";
import config from "../../config";
import MovieSeries from "../../database/Schema/movieSeries";
import { Request, Response } from "express";

export const getSearchedMovies: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  const movieSearch = req.query.s;
  console.log(movieSearch);
  try {
    const response = await axios.get(
      `${config.MOVIES_API}&type=movie&s=${movieSearch}`
    );
    res.json(response.data);
  } catch (err) {
    res.json(err);
  }
};
export const getSearchedSeries: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  const movieSearch = req.query.s;
  console.log(movieSearch);
  try {
    const response = await axios.get(
      `${config.MOVIES_API}&type=series&s=${movieSearch}`
    );
    res.json(response.data);
  } catch (err) {
    res.json(err);
  }
};

export const getMovieDetail: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const imdbID = req.params.id;
    const response = await axios.get(`${config.MOVIES_API}&i=${imdbID}`);
    res.json(response.data);
  } catch (e) {
    res.json(e);
  }
};

export const addFavoriteMovie: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const movieSeriesFound = await MovieSeries.findOne({
      imdbID: req.body.imdbID,
      author: req.userId,
    });
    if (movieSeriesFound) {
      return res
        .status(301)
        .json({ message: "this movie or series Already Exists" });
    }

    const { Title, Poster, Year, Type, imdbID, isFavorite } = req.body;
    const movieSeries = new MovieSeries({
      Title,
      Poster,
      Year,
      Type,
      imdbID,
      isFavorite:true,
      author: req.userId,
    });
    const savedMovieSeries = await movieSeries.save();
    res.json(savedMovieSeries);
  } catch (error) {
    res.json(error);
  }
};
export const getFavorites: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const favorites = await MovieSeries.find({ author: req.userId });
    res.json(favorites);
  } catch (error) {
    res.json(error);
  }
};
export const deleteFavorite: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const id = req.params.id;

    const deleteFavorite = await MovieSeries.findOneAndDelete({ imdbID: id });

    res.json(`${deleteFavorite} is deleted`);
  } catch (error) {
    res.json(error);
  }
};
