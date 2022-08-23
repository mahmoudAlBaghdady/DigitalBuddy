import React, { ChangeEvent, useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { searchDiaries } from "../../../store/Diary/DiarySlice";
import { searchTransactions } from "../../../store/ExpenseTracker/ExpenseTrackerSlice";
import { searchGoals } from "../../../store/Goals/GoalsSlice";
import { searchText } from "../../../store/MovieSeries/MovieSeriesSlice";
import { AppDispatch } from "../../../store/store";
import { searchVideos } from "../../../store/Video/VideoSlice";

const Search = () => {
  const [search, setSearch] = useState("");
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  location.pathname === "/goals" && dispatch(searchGoals(search));
  location.pathname === "/videos" && dispatch(searchVideos(search));
  location.pathname === "/diary" && dispatch(searchDiaries(search));
  location.pathname === "/expenseTracker/history" &&
    dispatch(searchTransactions(search));

  const searchButtonHandler = () => {
    search.length > 3 &&
      location.pathname === "/moviesSeries" &&
      dispatch(searchText(search));
    setSearch("");
  };
  return (
    <div className="col-4 w-100">
      <div className="input-group md-form form-sm form-2 pl-0 ">
        <input
          className="form-control my-0 py-1 amber-border "
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={changeHandler}
        />
        <div className="input-group-append">
          <span className="input-group-text amber lighten-3" id="basic-text1">
            <FontAwesomeIcon
              icon={faSearch}
              className=" text-info"
              role="button"
              aria-hidden="true"
              onClick={searchButtonHandler}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Search;
