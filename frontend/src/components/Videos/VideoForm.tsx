import React, { FormEvent, FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  fetchAsyncCreateVideo,
  fetchAsyncGetAllVideos,
  fetchAsyncGetVideo,
  fetchAsyncUpdateVideo,
  SingleVideo,
} from "../../store/Video/VideoSlice";

import VideoFormValidation from "../Helpers/FormValidation/VideoFormValidation";

type Form = FormEvent<HTMLFormElement>;

interface Props {
  setModalShow?: (value: boolean) => void;
  setUpdateModal?: (value: boolean) => void;
  _id?: string;
}

const VideoForm = ({ setModalShow, _id, setUpdateModal }: Props) => {
  const {
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
  } = VideoFormValidation();
  const dispatch = useDispatch<AppDispatch>();

  const singleVideo = useSelector(SingleVideo);

  useEffect(() => {
    reset();
    _id && dispatch(fetchAsyncGetVideo(_id));

    _id &&
      setvideo({
        title: singleVideo.title || "",
        description: singleVideo.description || "",
        url: singleVideo.url || "",
      });
  }, [_id, dispatch]);

  let btnText = _id ? "Update Video" : "Create Video";
  // let headerText = _id ? "Update Video" : "Create New Video";
  const formSubmitHandler = async (event: Form) => {
    event.preventDefault();

    if (!_id) {
      await dispatch(fetchAsyncCreateVideo(video));
      await dispatch(fetchAsyncGetAllVideos());
    } else if (_id) {
      const args = {
        video,
        singleVideo,
      };
      await dispatch(fetchAsyncUpdateVideo(args));
      await dispatch(fetchAsyncGetAllVideos());
    }
    _id ? setUpdateModal!(false) : setModalShow!(false);
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <fieldset>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="title" className="form-label mt-1 fw-bold">
              Title
            </label>
            <input
              type="text"
              className={textClassnameHandler()}
              id="title"
              name="title"
              value={video.title}
              placeholder="Write A Title"
              onChange={onChangeHandler}
              onBlur={titleFocus}
            />
          </div>
          <div className="form-group">
            <label htmlFor="url" className="form-label mt-2 fw-bold">
              Enter A Url
            </label>
            <input
              type="url"
              className={urlClassnameHandler()}
              id="url"
              name="url"
              aria-describedby="urlHelp"
              placeholder="https://somesite.com"
              value={video.url}
              onChange={onChangeHandler}
              onBlur={urlFocus}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label mt-2 fw-bold">
              Description
            </label>
            <textarea
              className={descriptionClassnameHandler()}
              id="description"
              name="description"
              rows={3}
              value={video.description}
              onChange={onChangeHandler}
              onBlur={descriptionFocus}
            />
          </div>

          <button className={btnClassname}>{btnText}</button>
        </div>
      </fieldset>
    </form>
  );
};

export default VideoForm;
