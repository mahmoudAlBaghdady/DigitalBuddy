import React, { ChangeEvent, FocusEvent, useState } from "react";
import { Diary } from "../Interface/Diary";
const DiaryFormValidation = () => {
  const initialState = {
    title: "",
    description: "",
    events: [],
  };
  const [diary, setDiary] = useState<Diary>(initialState);
  type inputChange =
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLTextAreaElement>;

  type textFocus = FocusEvent<HTMLInputElement>;

  type textAreaFocus = FocusEvent<HTMLTextAreaElement>;

  const [titleIsTouched, setTitleIsTouched] = useState(false);

  const [descriptionIsTouched, setDescriptionIsTouched] = useState(false);

  const onChangeHandler = (event: inputChange) =>
    setDiary({ ...diary, [event.target.name]: event.target.value });

  const titleFocus = (event: textFocus) => {
    setTitleIsTouched(true);
  };

  const descriptionFocus = (event: textAreaFocus) => {
    setDescriptionIsTouched(true);
  };
  const { title, description } = diary;
  let titleIsValid: boolean = title?.trim() !== "";
  let descriptionIsValid: boolean = description?.trim() !== "";

  let diaryIsValid: boolean = titleIsValid && descriptionIsValid;

  const titleError: boolean = !titleIsValid && titleIsTouched;
  const descriptionError: boolean = !descriptionIsValid && descriptionIsTouched;

  const reset = () => {
    setDiary(initialState);
    setTitleIsTouched(false);
    setDescriptionIsTouched(false);
  };

  const textClassnameHandler = () => {
    let textClassname: string;
    if (!titleError && !titleIsTouched) {
      return (textClassname = "form-control ");
    } else if (!titleError) {
      return (textClassname = "form-control is-valid");
    } else if (titleError) {
      return (textClassname = "form-control is-invalid");
    }
  };

  const descriptionClassnameHandler = () => {
    let descriptionClassname: string;
    if (!descriptionError && !descriptionIsTouched) {
      return (descriptionClassname = "form-control ");
    } else if (!descriptionError) {
      return (descriptionClassname = "form-control is-valid");
    } else if (descriptionError) {
      return (descriptionClassname = "form-control is-invalid");
    }
  };

  const btnClassname: string = diaryIsValid
    ? "btn btn-light  fw-bold"
    : "btn btn-light disabled fw-bold";

  return {
    setDiary,
    diary,
    onChangeHandler,
    titleFocus,
    descriptionFocus,
    textClassnameHandler,
    descriptionClassnameHandler,
    btnClassname,
    reset,
  };
};

export default DiaryFormValidation;
