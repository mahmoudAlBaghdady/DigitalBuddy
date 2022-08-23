import React, { FormEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchAsyncCreateGoal,
  fetchAsyncGetAllGoals,
  fetchAsyncGetGoal,
  fetchAsyncUpdateGoal,
  getSingleGoal,
} from "../../store/Goals/GoalsSlice";
import { AppDispatch } from "../../store/store";
import GoalFormValidation from "../Helpers/FormValidation/GoalFormValidation";
import { succesToast } from "../Helpers/Utilities/Toast";

type Form = FormEvent<HTMLFormElement>;
interface Params {
  id: string;
}
interface Props {
  setModalShow?: (value: boolean) => void;
  setUpdateModal?: (value: boolean) => void;
  _id?: string;
}
const GoalForm = ({ setUpdateModal, setModalShow, _id }: Props) => {
  const {
    setGoal,
    goal,
    onChangeHandler,
    titleFocus,
    descriptionFocus,
    textClassnameHandler,
    descriptionClassnameHandler,
    btnClassname,
    reset,
  } = GoalFormValidation();

  const dispatch = useDispatch<AppDispatch>();
  const singleGoal = useSelector(getSingleGoal);
  useEffect(() => {
    _id && dispatch(fetchAsyncGetGoal(_id));
    _id &&
      setGoal({
        title: singleGoal.title || "",
        description: singleGoal.description || "",
        finished: singleGoal.finished || false,
      });
  }, [dispatch, _id]);

  let btnText = _id ? "Update Goal" : "Create Goal";

  const formSubmitHandler = async (event: Form) => {
    event.preventDefault();
    if (!_id) {
      await dispatch(fetchAsyncCreateGoal(goal));
      await dispatch(fetchAsyncGetAllGoals());
    } else if (_id) {
      const updatedGoal = {
        title: goal.title,
        description: goal.description,
        finished: goal.finished,
        _id: singleGoal._id,
      };
      await dispatch(fetchAsyncUpdateGoal(updatedGoal));
      await dispatch(fetchAsyncGetAllGoals());
      succesToast("Goal Updated Successfully");
    }
    reset();
    _id ? setUpdateModal!(false) : setModalShow!(false);
  };

  return (
    <>
      <div className="card-body">
        <form onSubmit={formSubmitHandler}>
          <div className="mb-2">
            <label htmlFor="title" className="form-label text-dark fw-bold">
              Goal Title
            </label>
            <input
              type="title"
              className={textClassnameHandler()}
              id="title"
              value={goal.title}
              aria-describedby="title"
              onChange={onChangeHandler}
              onBlur={titleFocus}
              name="title"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="description"
              className="form-label text-dark fw-bold"
            >
              Goal Description
            </label>
            <textarea
              className={descriptionClassnameHandler()}
              id="description"
              name="description"
              placeholder="describe your goal"
              required
              value={goal.description}
              onBlur={descriptionFocus}
              onChange={onChangeHandler}
            />
          </div>

          <button className={btnClassname}>{btnText}</button>
        </form>
      </div>
    </>
  );
};

export default GoalForm;
