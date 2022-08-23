import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAsyncFavorites,
  fetchAsyncMovies,
  fetchAsyncSeries,
  getSearchtext,
} from "../../store/MovieSeries/MovieSeriesSlice";
import { AppDispatch } from "../../store/store";
import Search from "../UI/Search/Search";
import Movies from "./Movies";
import Series from "./Series";
const MoviesSeries = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchText = useSelector(getSearchtext);
  console.log(searchText);
  useEffect(() => {
    dispatch(fetchAsyncMovies(searchText));
    dispatch(fetchAsyncSeries(searchText));
    dispatch(fetchAsyncFavorites());
  }, [searchText, dispatch]);
  return (
    <>
      <div className="container-fluid">
        <div className="row my-1">
          <ul className="nav nav-pills justify-content-center">
            <li className="nav-item mx-1">
              <Link className="nav-link bg-primary" to={"/moviesSeries"}>
                Search
              </Link>
            </li>
            <li className="nav-item mx-1">
              <Link
                className="nav-link bg-warning"
                to={"/moviesSeries/favorites"}
              >
                Favorites
              </Link>
            </li>
          </ul>
        </div>
        <div className="row justify-content-center mt-3">
          <div className="col-lg-6 col-md-8 col-11 ">
          <Search />
          </div>
        </div>
        <div className="row">
          <Movies />
        </div>

        <div className="row">
          <Series />
        </div>
      </div>
    </>
  );
};

export default MoviesSeries;
