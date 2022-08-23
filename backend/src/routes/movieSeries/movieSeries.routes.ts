import { Router } from "express";
import * as movieSeriesCtrl from "./movie.Series.controller";
import isLogged from "../../middleware/authMiddleware";

const router = Router();
router.get("/movieSeries/movie",isLogged,movieSeriesCtrl.getSearchedMovies);
router.get("/movieSeries/series",isLogged,movieSeriesCtrl.getSearchedSeries);
router.get("/movieSeries/details/:id",isLogged, movieSeriesCtrl.getMovieDetail);
router.get("/movieSeries/favorites",isLogged,movieSeriesCtrl.getFavorites);
router.post("/movieSeries/favorites",isLogged,movieSeriesCtrl.addFavoriteMovie);
router.delete("/movieSeries/favorites/:id",isLogged,movieSeriesCtrl.deleteFavorite);

export default router;
