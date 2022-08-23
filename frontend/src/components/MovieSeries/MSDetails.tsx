import React, { MutableRefObject, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  detailStatus,
  fetchAsyncDetail,
  getAllDetails,
} from "../../store/MovieSeries/MovieSeriesSlice";
import { AppDispatch } from "../../store/store";
import { faFilm, faStar, faVoteYea } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MSDetails = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAsyncDetail(params.ImdbId!));
  }, [dispatch, params.ImdbId]);

  const detail = useSelector(getAllDetails);

  const {
    Poster,
    Title,
    imdbID,
    Type,
    imdbRating,
    imdbVotes,
    Runtime,
    Year,
    Plot,
    Director,
    Actors,
    Genre,
    Language,
    Awards,
    Country,
    Metascore,
    Rated,
    Ratings,
    Released,
    Writer,
  } = detail;
  console.log("details in ms", detail);

  const stringWithoutChar =
    Title !== "" ? Title.replace(/[^A-Za-z0-9\s!?]/g, "") : "";
  const stringWithoutSpaces =
    Title !== "" && stringWithoutChar.replace(/\s+/g, "-").toLowerCase();
  const scrollDownHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const myRef = useRef() as MutableRefObject<HTMLDivElement>;

  const executeScroll = () => myRef.current.scrollIntoView();
  const status = useSelector(detailStatus);
  return (
    <>
      <div className="container-fluid">
        {status === "success" && (
          <>
            <div className="row justify-content-between my-2">
              <Link
                to={"/moviesSeries"}
                className="btn btn-primary rounded text-decoration-none"
              >
                <i className="fa fa-arrow-left" aria-hidden="true">
                  &nbsp;
                </i>
                Back To Movies
              </Link>
            </div>
            <div className="row my-2">
              <div className="col-11 mx-auto ">
                <div className="alert alert-light">
                  <div className="row">
                    <div className="col-md-12 col-lg-9 text-center">
                      <h3 className="alert-heading fw-bolder fs-2">{Title}</h3>
                      <div className="my-md-3">
                        <p className="d-md-inline d-sm-block d-lg-inline d-block me-md-1 me-lg-2 text-dark">
                          IMDB Rating &nbsp;
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-warning"
                          />
                          &nbsp; : {imdbRating}
                        </p>
                        <p className="d-md-inline d-sm-block d-lg-inline d-block mx-md-1 mx-lg-2 text-dark">
                          IMDB Votes &nbsp;
                          <FontAwesomeIcon icon={faVoteYea} />
                          &nbsp;
                          {imdbVotes}
                        </p>

                        <p className="d-md-inline d-sm-block d-lg-inline d-block mx-md-1 mx-lg-2 text-dark">
                          Released Year : {Year}
                        </p>
                        <p className="d-md-inline-block d-sm-block d-lg-inline d-block my-md-1 me-md-1 mx-lg-2 text-dark">
                          Runtime &nbsp;
                          <FontAwesomeIcon icon={faFilm} />
                          &nbsp;
                          {Runtime}
                        </p>
                        {Type === "series" && (
                          <>
                            <p className="d-md-inline d-sm-block d-lg-inline d-block mx-md-1 mx-lg-2 text-dark">
                              Seasons : {detail.totalSeasons}
                            </p>
                          </>
                        )}
                      </div>
                      <p className="text-center">{Plot}</p>
                      {detail.Type === "movie" && (
                        <button className="btn btn-primary my-2 mx-2">
                          <a
                            className="text-decoration-none"
                            href={` https://ww.egy.best/movie/${stringWithoutSpaces}-${detail.Year}#download`}
                            target="_blank"
                          >
                            {" "}
                            watch on egybest
                          </a>
                        </button>
                      )}
                      {detail.Type === "series" && (
                        <button className="btn btn-primary my-2 mx-2 ">
                          <a
                            className="text-decoration-none"
                            href={`https://ww.egy.best/episode/${stringWithoutSpaces}-season-1-ep-1#download `}
                            target="_blank"
                          >
                            watch on egybest
                          </a>
                        </button>
                      )}
                      <button
                        className="btn btn-primary my-2 mx-2"
                        onClick={executeScroll}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        {" "}
                        watch trailer
                      </button>
                    </div>
                    <div className="col-md-10 col-lg-3 mx-md-auto">
                      <img
                        src={Poster}
                        className="img-fluid rounded w-100 h-100"
                        alt="..."
                      />
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="my-2 ">
                      <dt className=" d-inline fs-5">
                        Director &nbsp;&nbsp;&nbsp;
                        <p className="text-dark d-inline">{Director}</p>
                      </dt>
                    </div>
                    <div className="my-2  ">
                      <dt className=" d-inline fs-5">
                        Actors &nbsp;&nbsp;&nbsp;
                        <p className="text-dark d-inline">{Actors}</p>
                      </dt>
                    </div>
                    <div className="my-2  ">
                      <dt className=" d-inline fs-5">
                        Genre &nbsp;&nbsp;&nbsp;
                        <p className="text-dark d-inline">{Genre}</p>
                      </dt>
                    </div>
                    <div className="my-2  ">
                      <dt className=" d-inline fs-5">
                        Rated &nbsp;&nbsp;&nbsp;
                        <p className="text-dark d-inline">{Rated}</p>
                      </dt>
                    </div>
                    <div className="my-2  ">
                      <dt className=" d-inline fs-5">
                        Language &nbsp;&nbsp;&nbsp;
                        <p className="text-dark d-inline">{Language}</p>
                      </dt>
                    </div>
                    <div className="my-2  ">
                      <dt className=" d-inline fs-5">
                        Awards &nbsp;&nbsp;&nbsp;
                        <p className="text-dark d-inline">{Awards}</p>
                      </dt>
                    </div>
                    <div className="my-2  ">
                      <dt className=" d-inline fs-5">
                        Country &nbsp;&nbsp;&nbsp;
                        <p className="text-dark d-inline">{Country}</p>
                      </dt>
                    </div>
                    <div className="my-2  ">
                      <dt className=" d-inline fs-5">
                        Writer &nbsp;&nbsp;&nbsp;
                        <p className="text-dark d-inline">{Writer}</p>
                      </dt>
                    </div>
                    <div className="my-2  ">
                      <dt className=" d-inline fs-5">
                        Released &nbsp;&nbsp;&nbsp;
                        <p className="text-dark d-inline">{Released}</p>
                      </dt>
                    </div>
                    {Type === "movie" && (
                      <div className="my-2  ">
                        <dt className=" d-inline fs-5">
                          Box Office &nbsp;&nbsp;&nbsp;
                          <p className="text-dark d-inline">
                            {detail.BoxOffice}
                          </p>
                        </dt>
                      </div>
                    )}
                    <div className="my-2  ">
                      <dt className=" d-inline fs-5">
                        Metascore &nbsp;&nbsp;&nbsp;
                        <p className="text-dark d-inline">{Metascore}</p>
                      </dt>
                    </div>
                    <>
                      <div className="my-2  ">
                        <dt className=" d-inline fs-5 text-primary">
                          Other Ratings :
                        </dt>
                      </div>
                      {Ratings.map((e: any) => {
                        return (
                          <div className="my-2  ">
                            <dt className=" d-inline fs-5">
                              {e.Source} &nbsp;&nbsp;&nbsp;
                              <p className="text-dark d-inline">{e.Value}</p>
                            </dt>
                          </div>
                        );
                      })}
                    </>
                  </div>
                </div>
              </div>
              <div
                className="modal bg-primary bg-opacity-50 mt-4"
                id="exampleModal"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">{Title}</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true" />
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="ratio ratio-16x9 ">
                        <ReactPlayer
                          url={"https://www.youtube.com/watch?v=2TAOizOnNPo"}
                          width="100%"
                          height="100%"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {status === "pending" && (
          <div className="row  my-5">
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
        {status === "fail" && (
          <div className="row my-5 ">
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
      </div>
    </>
  );
};

export default MSDetails;
