import React, { FormEvent, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAsyncAllDiaries,
  fetchAsyncCreateDiary,
} from "../../../store/Diary/DiarySlice";
import { AppDispatch } from "../../../store/store";
import DiaryFormValidation from "../../Helpers/FormValidation/DiaryFormValidation";
import { succesToast } from "../../Helpers/Utilities/Toast";
import CUEvents from "./CUEvents";

type Form = FormEvent<HTMLFormElement>;

const DiaryCreate = () => {
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

  const dispatch = useDispatch<AppDispatch>();

  const addEventHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const emptyEvent = { id: Math.random(), title: "", description: "" };
    const currentEvents = diary.events ? diary.events : [];
    setDiary({ ...diary, events: [...currentEvents, emptyEvent] });
  };

  const formSubmitHandler = async (e: Form) => {
    e.preventDefault();
    await dispatch(fetchAsyncCreateDiary(diary));
    await dispatch(fetchAsyncAllDiaries());
    reset();
  };
  const { title, description } = diary;
  return (
    <div className="row justify-content-center">
      <div className="col-md-10 col-sm-10 my-3 ">
        <div className="card border-dark mb-3">
          <div className="card-header fw-bolder fs-4">Create New Diary</div>
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

              {diary.events.map((e, index: number) => {
                return (
                  <CUEvents
                    index={index}
                    key={e.id}
                    diary={diary}
                    setDiary={setDiary}
                    event={e}
                  />
                );
              })}
              <div className="row justify-content-end">
                <div className="col-md-6">
                  <button className={`${btnClassname} mt-2 px-4`} type="submit">
                    Create Diary{" "}
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
  );
};

export default DiaryCreate;
