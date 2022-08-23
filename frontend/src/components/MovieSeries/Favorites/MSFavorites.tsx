import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAsyncFavorites,
  getAllFavorites,
} from "../../../store/MovieSeries/MovieSeriesSlice";
import { AppDispatch } from "../../../store/store";
import Card from "../Card";

const MSFavorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAsyncFavorites());
  }, [dispatch]);
  const favorites = useSelector(getAllFavorites);
  console.log(favorites);

  return (
    <>
      <div className="container-fluid">
        <div className="row mb-2 mt-1">
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
        <div className="row justify-content-center my-2">
          {favorites.map((i: any) => {
            return <Card item={i} />;
          })}
        </div>
      </div>
    </>
  );
};

export default MSFavorites;
