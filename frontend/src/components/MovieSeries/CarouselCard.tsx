import React from "react";
import { useSelector } from "react-redux";
import {
  getAllMovies,
  getAllSeries,
} from "../../store/MovieSeries/MovieSeriesSlice";
import { MoviesSeriesType } from "../Helpers/Interface/MovieSeries";
import Card from "./Card";

interface Props {
  type: string;
}
const CarouselCard = ({ type }: Props) => {
  const series: MoviesSeriesType[] = useSelector(getAllSeries);
  const movies: MoviesSeriesType[] = useSelector(getAllMovies);
  let item1: MoviesSeriesType[] = [];
  let item2: MoviesSeriesType[] = [];
  let item3: MoviesSeriesType[] = [];
  if (type === "series") {
    item1 = series.slice(0, 4);
    item2 = series.slice(4, 8);
    item3 = series.slice(8, 10);
  } else if (type === "movies") {
    item1 = movies.slice(0, 4);
    item2 = movies.slice(4, 8);
    item3 = movies.slice(8, 10);
  }

  return (
    <>
      <div className="carousel-item active">
        <div className="row">
          {item1.map((m: any) => {
            return <Card item={m} key={m.imdbID} />;
          })}
        </div>
      </div>
      <div className="carousel-item ">
        <div className="row">
          {item2.map((m: any) => {
            return <Card item={m} key={m.imdbID} />;
          })}
        </div>
      </div>
      <div className="carousel-item ">
        <div className="row">
          {item3.map((m: any) => {
            return <Card item={m} key={m.imdbID} />;
          })}
        </div>
      </div>
    </>
  );
};

export default CarouselCard;
