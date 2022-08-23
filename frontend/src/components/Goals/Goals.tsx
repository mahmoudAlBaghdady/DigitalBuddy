import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchAsyncGetAllGoals,
  filterGoals,
  getGoalsFilter,
} from "../../store/Goals/GoalsSlice";
import { AppDispatch } from "../../store/store";
import Search from "../UI/Search/Search";
import GoalList from "./GoalList";
import GoalCreate from "./Modal/GoalCreate";
const Goals = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAsyncGetAllGoals());
  }, [dispatch]);
  const [modalShow, setModalShow] = useState(false);
  const filterChange = async (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterGoals(e.target.value));
  };
  const filter = useSelector(getGoalsFilter);
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center mt-2">
          <button
            className="btn btn-dark col-lg-3 col-md-5 col-8 rounded-pill text-center"
            onClick={() => setModalShow(true)}
          >
            <i className="fa fa-plus " aria-hidden="true"></i>
          </button>
        </div>
        <div className="row my-2 offset-lg-1    ">
          <div className="col-md-6 offset-lg-2   col-10 mx-auto my-md-auto my-2">
            <Search />
          </div>
          <div className="col-md-4 col-10 mx-auto ">
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="filter"
                id="btnradio1"
                autoComplete="off"
                onChange={filterChange}
                checked={filter === "All"}
                value="All"
              />
              <label className="btn btn-outline-light" htmlFor="btnradio1">
                All
              </label>
              <input
                type="radio"
                className="btn-check"
                name="filter"
                id="btnradio2"
                autoComplete="off"
                onChange={filterChange}
                checked={filter === "Progress"}
                value="Progress"
              />
              <label className="btn btn-outline-dark" htmlFor="btnradio2">
                Progress
              </label>
              <input
                type="radio"
                className="btn-check"
                name="filter"
                id="btnradio3"
                autoComplete="off"
                onChange={filterChange}
                checked={filter === "Finished"}
                value="Finished"
              />
              <label className="btn btn-outline-success" htmlFor="btnradio3">
                Finished
              </label>
            </div>
          </div>
        </div>
        <GoalList />
        <GoalCreate modalShow={modalShow} setModalShow={setModalShow} />
      </div>
    </>
  );
};

export default Goals;
