import moment from "moment";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  fetchAsyncDeleteGoal,
  fetchAsyncGetAllGoals,
  fetchAsyncGetGoal,
  fetchAsyncUpdateGoal,
} from "../../store/Goals/GoalsSlice";
import { AppDispatch } from "../../store/store";
import { Goal } from "../Helpers/Interface/Goal";
import {
  greenToast,
  removedToast,
  succesToast,
} from "../Helpers/Utilities/Toast";
import GoalUpdate from "./Modal/GoalUpdate";
interface Props {
  index: number;
  goal: Goal;
}
const GoalsItem = ({ goal, index }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { title, description, createdAt, _id, updatedAt, finished } = goal;
  const deleteHandler = async (e: MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    await dispatch(fetchAsyncDeleteGoal(_id!));
    await dispatch(fetchAsyncGetAllGoals());
  };
  const finishHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(!finished);
    const updatedGoal = {
      title,
      description,
      finished: goal.finished === true ? false : true,
      _id,
    };
    await dispatch(fetchAsyncUpdateGoal(updatedGoal));
    await dispatch(fetchAsyncGetAllGoals());
    finished === true
      ? greenToast("Dont Give Up I Believe In You")
      : greenToast("Congrats Keep Going");
  };
  const onUpdate = async () => {
    await dispatch(fetchAsyncGetGoal(_id!));
    setUpdateModal(true);
  };
  const cardColor =
    finished === true
      ? "success bg-success fw-bold"
      : index % 2 === 1
      ? "dark"
      : "light";
  const checkText = finished === true ? "Congrats" : "Done?";
  const date =
    finished === true
      ? moment(updatedAt).format("YYYY-MM-DD HH:mm ")
      : moment(createdAt).format("YYYY-MM-DD HH:mm ");
  const dateColor = finished === true ? "bg-success" : "";
  const [updateModal, setUpdateModal] = useState(false);

  return (
    <>
      <div className="col-md-8 col-sm-8 my-3">
        <div className={`card border-${cardColor} mb-3 `}>
          <div className="card-header ">
            <div className="d-flex ">
              <div className="me-auto p-2 fw-bold text-capitalize">{title}</div>
              <div className="p-2">
                <FontAwesomeIcon icon={faEdit} onClick={onUpdate} />
              </div>
              <div className="p-2">
                <FontAwesomeIcon
                  icon={faTrash}
                  role={"button"}
                  onClick={deleteHandler}
                />
              </div>
            </div>
          </div>
          <div className="card-body">
            <p className="card-text">{description}</p>
          </div>
          <div>
            <div className="card-footer text-muted">
              <div className="row">
                <div className="col-md-9 col-8 fw-bold">{date}</div>
                <div className="col-md-3 col-4 ">
                  <div className="form-check ">
                    <input
                      className={`form-check-input  shadow-none border-dark bg-dark`}
                      type="checkbox"
                      id="flexCheckDefault"
                      onChange={finishHandler}
                      checked={goal.finished}
                    />
                    <label htmlFor="flexCheckDefault" className="fw-bold">
                      {checkText}{" "}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GoalUpdate
        setUpdateModal={setUpdateModal}
        updateModal={updateModal}
        _id={_id}
      />
    </>
  );
};

export default GoalsItem;
