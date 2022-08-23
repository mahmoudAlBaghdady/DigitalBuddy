import React, { ChangeEvent, FocusEvent, useState } from "react";
import { Video } from "../Interface/Video";
function VideoFormValidation() {
  const initialState = {
    title: "",
    description: "",
    url: "",
  };
  const [video, setvideo] = useState<Video>(initialState);

  type inputChange =
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLTextAreaElement>;

  type textFocus = FocusEvent<HTMLInputElement>;

  type textAreaFocus = FocusEvent<HTMLTextAreaElement>;

  const [titleIsTouched, setTitleIsTouched] = useState(false);

  const [descriptionIsTouched, setDescriptionIsTouched] = useState(false);
  const [urlIsTouched, setUrlIsTouched] = useState(false);

  const onChangeHandler = (event: inputChange) =>
    setvideo({ ...video, [event.target.name]: event.target.value });

  const titleFocus = (event: textFocus) => {
    setTitleIsTouched(true);
  };

  const urlFocus = (event: textFocus) => {
    setUrlIsTouched(true);
  };

  const descriptionFocus = (event: textAreaFocus) => {
    setDescriptionIsTouched(true);
  };

  const urlValidation =
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  const { title, description, url } = video;
  let urlIsValid: boolean = urlValidation.test(url);
  let titleIsValid: boolean = title.trim() !== "";
  let descriptionIsValid: boolean = description.trim() !== "";

  let videoIsValid: boolean = urlIsValid && titleIsValid && descriptionIsValid;

  const titleError: boolean = !titleIsValid && titleIsTouched;
  const urlError: boolean = !urlIsValid && urlIsTouched;
  const descriptionError: boolean = !descriptionIsValid && descriptionIsTouched;

  const reset = () => {
    setvideo(initialState);
    setTitleIsTouched(false);
    setDescriptionIsTouched(false);
    setUrlIsTouched(false);
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

  const urlClassnameHandler = () => {
    let urlClassname: string;
    if (!urlError && !urlIsTouched) {
      return (urlClassname = "form-control ");
    } else if (!urlError) {
      return (urlClassname = "form-control is-valid");
    } else if (urlError) {
      return (urlClassname = "form-control is-invalid");
    }
  };

  const btnClassname: string = videoIsValid
    ? "btn btn-light text-primary mt-2 fs-5 fw-bold "
    : "btn btn-light text-primary mt-2 fs-5 fw-bold disabled";

  return {
    setvideo,
    video,
    onChangeHandler,
    titleFocus,
    urlFocus,
    descriptionFocus,
    textClassnameHandler,
    descriptionClassnameHandler,
    urlClassnameHandler,
    btnClassname,
    reset,
  };
}

export default VideoFormValidation;
