import React from "react";
import { useSelector } from "react-redux";
import {
  movieResponse,
  movieStatus,
} from "../../store/MovieSeries/MovieSeriesSlice";
import CarouselCard from "./CarouselCard";

const Movies = () => {
  const status = useSelector(movieStatus);
  const response = useSelector(movieResponse);
  console.log("movieStatus ", status);
  return (
    <>
      <section className="pt-2 pb-2">
        <div className="container">
          <div className="row">
            <div className="col-5">
              <h3 className="mb-3">Movies </h3>
            </div>

            {status === "success" && (
              <>
                <div className="col-12">
                  <div
                    id="carouselExampleIndicators2"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <CarouselCard type="movies" />
                    </div>
                  </div>
                </div>
                <div className="col-6 mx-auto ms-md-5 text-right">
                  <a
                    className="btn btn-light mb-3 mr-1"
                    href="#carouselExampleIndicators2"
                    role="button"
                    data-slide="prev"
                  >
                    <i className="fa fa-arrow-left" />
                  </a>
                  <a
                    className="btn btn-light mb-3 "
                    href="#carouselExampleIndicators2"
                    role="button"
                    data-slide="next"
                  >
                    <i className="fa fa-arrow-right" />
                  </a>
                </div>
              </>
            )}
          </div>

          {status === "pending" && (
            <div className="row ">
              <div className="col-12 mt-2 text-center ">
                <div
                  className="spinner-border"
                  style={{ width: "10rem", height: "10rem" }}
                  role="status"
                ></div>
              </div>
              <div className="col-12 text-center mt-2">
                <h3>Loading ...</h3>
              </div>
            </div>
          )}
          {status === "fail" && response === "False" && (
            <div className="row ">
              <div className="col-12 mt-2 text-center ">
                <div className="alert alert-danger">
                  <h4 className="alert-heading">ERROR!</h4>
                  <p className="mb-0">
                    status:500 (Server Error) try again later
                  </p>
                </div>
              </div>
            </div>
          )}
          {status === "fail" && response === "True" && (
            <div className="row ">
              <div className="col-12 mt-2 text-center ">
                <div className="alert alert-danger">
                  <h4 className="alert-heading">ERROR!</h4>
                  <p className="mb-0">check your internet connection</p>
                </div>
              </div>
            </div>
          )}
          {status === "noMovies" && (
            <div className="row ">
              <div className="col-12 mt-2 text-center ">
                <div className="alert alert-danger">
                  <h4 className="alert-heading">Too Many Results</h4>
                  <p className="mb-0">Search Again </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Movies;
