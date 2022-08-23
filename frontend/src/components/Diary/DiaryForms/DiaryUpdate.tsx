import React, { FormEvent, useEffect, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAsyncAllDiaries,
  fetchAsyncSingleDiary,
  fetchAsyncUpdateDiary,
  getDiaryDetails,
} from "../../../store/Diary/DiarySlice";
import { AppDispatch } from "../../../store/store";
import DiaryFormValidation from "../../Helpers/FormValidation/DiaryFormValidation";
import { succesToast } from "../../Helpers/Utilities/Toast";
import CUEvents from "./CUEvents";

type Form = FormEvent<HTMLFormElement>;

const DiaryUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    setDiary,
    diary,
    onChangeHandler,
    titleFocus,
    descriptionFocus,
    textClassnameHandler,
    descriptionClassnameHandler,
    btnClassname,
    reset,
  } = DiaryFormValidation();

  const singleDiary = useSelector(getDiaryDetails);

  useEffect(() => {
    dispatch(fetchAsyncSingleDiary(params.id!));
    setDiary(singleDiary);
  }, [dispatch, params.id]);

  const addEventHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const emptyEvent = { id: Math.random(), title: "", description: "" };
    const currentEvents = diary.events ? diary.events : [];
    setDiary({ ...diary, events: [...currentEvents, emptyEvent] });
  };

  const formSubmitHandler = async (e: Form) => {
    e.preventDefault();
    const args = {
      diary,
      singleDiary,
    };
    await dispatch(fetchAsyncUpdateDiary(args));
    await dispatch(fetchAsyncAllDiaries());

    reset();
    navigate(`/diary/${singleDiary._id}`);
  };
  const { title, description } = diary;
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10 col-sm-10 my-3 ">
          <div className="card border-dark mb-3">
            <div className="card-header fw-bolder fs-4">Update Diary</div>
            <div className="card-body">
              <form onSubmit={formSubmitHandler}>
                <div className="mb-2">
                  <label htmlFor="title" className="form-label">
                    Diary Title
                  </label>
                  <input
                    type="title"
                    className={textClassnameHandler()}
                    id="title"
                    value={title}
                    aria-describedby="title"
                    onChange={onChangeHandler}
                    onBlur={titleFocus}
                    name="title"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="description" className="form-label">
                    Diary Description
                  </label>
                  <textarea
                    className={descriptionClassnameHandler()}
                    id="description"
                    name="description"
                    placeholder="tell us what happened today"
                    required
                    value={description}
                    onBlur={descriptionFocus}
                    onChange={onChangeHandler}
                  />
                </div>

                {diary.events.map((e, index) => {
                  return (
                    <CUEvents
                      index={index}
                      key={e.id}
                      event={e}
                      diary={diary}
                      setDiary={setDiary}
                    />
                  );
                })}
                <div className="row justify-content-end">
                  <div className="col-md-6">
                    <button className={`${btnClassname} mt-2 px-4`}>
                      Update Diary
                    </button>
                  </div>
                  <div className="col-md-5 ">
                    <button
                      className={`btn btn-dark ms-2  mt-2 fw-bold`}
                      onClick={addEventHandler}
                    >
                      Add More Events
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryUpdate;
