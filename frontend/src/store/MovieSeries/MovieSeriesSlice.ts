import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  alertToast,
  removedToast,
  succesToast,
} from "../../components/Helpers/Utilities/Toast";

const API = "http://localhost:4000";

export const fetchAsyncMovies = createAsyncThunk(
  "MS/fetchAsyncMovies",
  async (MovieText: String = "fast") => {
    try {
      const { data } = await axios.get(
        `${API}/movieSeries/movie/?s=${MovieText}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const fetchAsyncSeries = createAsyncThunk(
  "MS/fetchAsyncSeries",
  async (SeriesText: String = "rick") => {
    try {
      const { data } = await axios.get(
        `${API}/movieSeries/series/?s=${SeriesText}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const fetchAsyncDetail = createAsyncThunk(
  "MS/fetchAsyncDetail",
  async (imdbID: string) => {
    console.log("in req");

    try {
      const { data } = await axios.get(`${API}/movieSeries/details/${imdbID}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const fetchAsyncFavorites = createAsyncThunk(
  "MS/fetchAsyncFavorites",
  async () => {
    try {
      const { data } = await axios.get(`${API}/movieSeries/favorites`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const fetchAsyncAddToFavorites = createAsyncThunk(
  "MS/fetchAsyncAddToFavorites",
  async (item: any) => {
    try {
      const res = await axios.post(`${API}/movieSeries/favorites`, item, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const fetchAsyncRemoveFromFavorites = createAsyncThunk(
  "MS/fetchAsyncRemoveFromFavorites",
  async (imdbID: any) => {
    try {
      const { data } = await axios.delete(
        `${API}/movieSeries/favorites/${imdbID!}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

const initialState = {
  details: {
    Poster: "",
    Title: "Movie",
    imdbID: "",
    imdbRating: "",
    imdbVotes: "",
    Runtime: "",
    Year: "",
    Plot: "",
    Director: "",
    Actors: "",
    Genre: "",
    Language: "",
    Awards: "",
    BoxOffice: "",
    Country: "",
    Metascore: "",
    Rated: "",
    Ratings: [
      {
        Source: "",
        Value: "",
      },
    ],
    Released: "",
    Writer: "",
    totalSeasons: "",
    Type: "",
  },
  movies: [],
  MovieResponse: false,
  series: [],
  searchText: "friends",
  seriesResponse: false,
  seriesStatus: "pending",
  movieStatus: "pending",
  detailStatus: "pending",
  FavoritesStatus: "pending",
  favorites: [],
};
const MovieSeriesSlice = createSlice({
  name: "MovieSeries",
  initialState,
  reducers: {
    removeDetails: (state) => {
      state.details = initialState.details;
    },
    searchText: (state, { payload }: any) => {
      state.searchText = payload;
    },
  },
  extraReducers: (builder) => {
    //*fetching data for movies

    builder.addCase(fetchAsyncMovies.pending, (state) => {
      console.log("MOVIE PENDING!!");
      return {
        ...state,
        movieStatus: "pending",
      };
    });
    builder.addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
      console.log("MOVIE FETCH SUCCESSFULLY!!");
      console.log("movies", payload);
      if (payload.Response === "True") {
        const movie = payload.Search;
        const newMovie = movie.map((m: any) => ({ ...m, isFavorite: false }));
        state.favorites.forEach((b: any) => {
          newMovie.forEach((a: any) => {
            if (b.imdbID == a.imdbID) {
              return (a.isFavorite = true);
            }
          });
        });
        return {
          ...state,
          movies: newMovie,
          movieResponse: payload.Response,
          movieStatus: "success",
        };
      }
      return {
        ...state,
        movies: [payload.Error],
        movieResponse: payload.Response,
        movieStatus: "noMovie",
      };
    });
    builder.addCase(fetchAsyncMovies.rejected, (state) => {
      console.log("MOVIE REJECTED!!");

      alert(
        "invalid search or couldnt find movie try entering the correct name"
      );
      return {
        ...state,
        searchText: "fast",
        movieStatus: "fail",
      };
    });

    //*fetching data for series

    builder.addCase(fetchAsyncSeries.pending, (state) => {
      console.log("SERIES PENDING!!");
      return {
        ...state,
        seriesStatus: "pending",
      };
    });
    builder.addCase(fetchAsyncSeries.fulfilled, (state, { payload }) => {
      console.log("SERIES FETCH SUCCESSFULLY!!");
      console.log("series", payload);

      if (payload.Response === "True") {
        const series = payload.Search;
        const newSeries = series.map((m: any) => ({ ...m, isFavorite: false }));

        state.favorites.forEach((b: any) => {
          newSeries.forEach((a: any) => {
            if (b.imdbID == a.imdbID) {
              return (a.isFavorite = true);
            }
          });
        });
        return {
          ...state,
          series: newSeries,
          seriesResponse: payload.Response,
          seriesStatus: "success",
        };
      }

      return {
        ...state,
        series: [payload.Error],
        seriesResponse: payload.Response,
        seriesStatus: "noSeries",
      };
    });
    builder.addCase(fetchAsyncSeries.rejected, (state) => {
      console.log("SERIES REJECTED!!");
      alertToast(
        "invalid search or couldnt find movie try entering the correct name"
      );
      return {
        ...state,
        seriesStatus: "fail",
        searchText: "rick",
      };
    });

    //*fetching data for details of a movie or a series

    builder.addCase(fetchAsyncDetail.pending, (state) => {
      console.log("DETAILS PENDING!!");
      return {
        ...state,
        detailStatus: "pending",
      };
    });
    builder.addCase(fetchAsyncDetail.fulfilled, (state, { payload }) => {
      console.log("DETAILS FETCH SUCCESSFULLY!!");
      console.log("redux details", payload);
      return {
        ...state,
        details: payload,
        detailStatus: "success",
      };
    });
    builder.addCase(fetchAsyncDetail.rejected, (state) => {
      console.log("DETAILS REJECTED!!");
      return {
        ...state,
        detailStatus: "fail",
      };
    });

    //*fetching data for favorite movies and series
    builder.addCase(fetchAsyncFavorites.pending, (state) => {
      console.log("FAVORITES PENDING");
      return {
        ...state,
        FavoritesStatus: "pending",
      };
    });
    builder.addCase(fetchAsyncFavorites.fulfilled, (state, { payload }) => {
      console.log("FAVORITES FETCH SUCCESSFULLY");
      const newFavorites = payload.map((m: any) => ({
        ...m,
        isFavorite: true,
      }));

      return {
        ...state,
        favorites: newFavorites,
        FavoritesStatus: "success",
      };
    });
    builder.addCase(fetchAsyncFavorites.rejected, (state) => {
      console.log("FAVORITES FAIL");
      return {
        ...state,
        FavoritesStatus: "fail",
      };
    });
    //*adding a new movie or series to the favorites
    builder.addCase(fetchAsyncAddToFavorites.pending, () => {
      console.log("ADDING TO FAVORITES PENDING");
    });
    builder.addCase(fetchAsyncAddToFavorites.fulfilled, () => {
      console.log("ADDED TO FAVORITES SUCCESSFULLY");
      succesToast("Successfully Added To Favorites");
    });
    builder.addCase(fetchAsyncAddToFavorites.rejected, () => {
      console.log("ADDED TO FAVORITES FAIL");
      alertToast("movie already exist");
    });
    //*removing movie or series from favorites
    builder.addCase(fetchAsyncRemoveFromFavorites.pending, () => {
      console.log("FAVORITES Removes PENDING");
    });
    builder.addCase(fetchAsyncRemoveFromFavorites.fulfilled, () => {
      console.log("FAVORITE Removed SUCCESSFULLY");
      removedToast("Successfully Removed From Favorites");
    });
    builder.addCase(fetchAsyncRemoveFromFavorites.rejected, () => {
      console.log("FAVORITES remove FAIL");
    });
  },
});

export const { searchText } = MovieSeriesSlice.actions;
export const getSearchtext = (state: { MovieSeries: { searchText: any } }) =>
  state.MovieSeries.searchText;
export const getAllMovies = (state: { MovieSeries: { movies: any } }) =>
  state.MovieSeries.movies;
export const getAllSeries = (state: { MovieSeries: { series: any } }) =>
  state.MovieSeries.series;
export const getAllDetails = (state: { MovieSeries: { details: any } }) =>
  state.MovieSeries.details;
export const getAllFavorites = (state: { MovieSeries: { favorites: any } }) =>
  state.MovieSeries.favorites;
export const movieStatus = (state: { MovieSeries: { movieStatus: any } }) =>
  state.MovieSeries.movieStatus;
export const movieResponse = (state: { MovieSeries: { MovieResponse: any } }) =>
  state.MovieSeries.MovieResponse;
export const seriesStatus = (state: { MovieSeries: { seriesStatus: any } }) =>
  state.MovieSeries.seriesStatus;
export const seriesResponse = (state: {
  MovieSeries: { seriesResponse: any };
}) => state.MovieSeries.seriesResponse;
export const detailStatus = (state: { MovieSeries: { detailStatus: any } }) =>
  state.MovieSeries.detailStatus;
export default MovieSeriesSlice.reducer;
