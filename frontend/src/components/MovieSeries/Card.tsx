import React, { MouseEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAsyncAddToFavorites,
  fetchAsyncDetail,
  fetchAsyncFavorites,
  fetchAsyncMovies,
  fetchAsyncRemoveFromFavorites,
  fetchAsyncSeries,
} from "../../store/MovieSeries/MovieSeriesSlice";
import { AppDispatch } from "../../store/store";
import { MoviesSeries } from "../Helpers/Interface/MovieSeries";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface Props {
  item: MoviesSeries;
}

const Card = ({ item }: Props) => {
  const [card, setCard] = useState(item);
  console.log(card);

  const { Title, Year, Poster, imdbID, isFavorite } = card;
  console.log(isFavorite);
  const dispatch = useDispatch<AppDispatch>();

  const favoritesHandler = (e: MouseEvent<HTMLButtonElement>) => {
    if (isFavorite === true) {
      dispatch(fetchAsyncRemoveFromFavorites(imdbID!));
      setCard({ ...card, isFavorite: false });
    } else if (isFavorite === false) {
      dispatch(fetchAsyncAddToFavorites(item));
      setCard({ ...card, isFavorite: true });
    }
  };

  const color = isFavorite === true ? "text-warning" : "";
  return (
    <>
      <div className="col-md-6 col-lg-3  mb-3">
        <div
          className="card card-animation shadow   rounded "
          style={{ height: "28.5rem" }}
        >
          <Link
            to={`/moviesSeries/MovieSeriesDetails/${imdbID}`}
            className="text-decoration-none"
            onClick={async () => await dispatch(fetchAsyncDetail(imdbID))}
          >
            <img
              className="img-fluid"
              alt={Title}
              src={Poster}
              style={{ height: "14.5rem", width: "100%" }}
            />
            <div className="card-body" style={{ height: "11rem" }}>
              <h4 className="card-title">{Title}</h4>
            </div>
          </Link>
          <div
            className="card-footer text-muted fw-bold d-flex justify-content-between"
            style={{ height: "3rem" }}
          >
            <div>{Year}</div>
            <div>
              <button
                type="button"
                onClick={favoritesHandler}
                className={`btn btn-sm btn-dark ${color} `}
                style={{ marginTop: "-0.5rem" }}
              >
                <span className="bi bi-star-fill">
                  <FontAwesomeIcon icon={faStar} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
