import React, { ChangeEvent, FocusEvent, useState } from "react";
import { Goal } from "../Interface/Goal";

const GoalFormValidation = () => {
  const initialState = {
    title: "",
    description: "",
    finished: false,
  };
  const [goal, setGoal] = useState<Goal>(initialState);
  type inputChange =
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLTextAreaElement>;

  type textFocus = FocusEvent<HTMLInputElement>;

  type textAreaFocus = FocusEvent<HTMLTextAreaElement>;

  const [titleIsTouched, setTitleIsTouched] = useState(false);

  const [descriptionIsTouched, setDescriptionIsTouched] = useState(false);

  const onChangeHandler = (event: inputChange) =>
    setGoal({ ...goal, [event.target.name]: event.target.value });

  const titleFocus = (event: textFocus) => {
    setTitleIsTouched(true);
  };

  const descriptionFocus = (event: textAreaFocus) => {
    setDescriptionIsTouched(true);
  };
  const { title, description } = goal;
  let titleIsValid: boolean = title?.trim() !== "";
  let descriptionIsValid: boolean = description?.trim() !== "";

  let goalIsValid: boolean = titleIsValid && descriptionIsValid;

  const titleError: boolean = !titleIsValid && titleIsTouched;
  const descriptionError: boolean = !descriptionIsValid && descriptionIsTouched;

  const reset = () => {
    setGoal(initialState);
    setTitleIsTouched(false);
    setDescriptionIsTouched(false);
  };

  const textClassnameHandler = () => {
    let textClassname: string;
    if (!titleError && !titleIsTouched) {
      return (textClassname = "form-control text-dark");
    } else if (!titleError) {
      return (textClassname = "form-control is-valid text-dark");
    } else if (titleError) {
      return (textClassname = "form-control is-invalid text-dark");
    }
  };

  const descriptionClassnameHandler = () => {
    let descriptionClassname: string;
    if (!descriptionError && !descriptionIsTouched) {
      return (descriptionClassname = "form-control text-dark");
    } else if (!descriptionError) {
      return (descriptionClassname = "form-control is-valid text-dark");
    } else if (descriptionError) {
      return (descriptionClassname = "form-control is-invalid text-dark");
    }
  };

  const btnClassname: string = goalIsValid
    ? "btn btn-light  fw-bold "
    : "btn btn-light disabled fw-bold";

  return {
    setGoal,
    goal,
    onChangeHandler,
    titleFocus,
    descriptionFocus,
    textClassnameHandler,
    descriptionClassnameHandler,
    btnClassname,
    reset,
  };
};

export default GoalFormValidation;
