import React, { MouseEvent, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  fetchAsyncDeleteVideo,
  fetchAsyncGetAllVideos,
  fetchAsyncGetVideo,
} from "../../store/Video/VideoSlice";
import { Video } from "../Helpers/Interface/Video";
import { removedToast } from "../Helpers/Utilities/Toast";
import VideoUpdate from "./Modals/Update";

interface Props {
  video: Video;
}

function VideoItem({ video }: Props) {
  const { title, description, url, _id, createdAt } = video;
  const date = createdAt?.toLocaleString();
  const dispatch = useDispatch<AppDispatch>();
  const deleteHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await dispatch(fetchAsyncDeleteVideo(_id!));
    await dispatch(fetchAsyncGetAllVideos());

    removedToast("Successfully Deleted Video")
  };
  const [updateModal, setUpdateModal] = useState(false);
  console.log(_id);

  const onEdit = async () => {
    await dispatch(fetchAsyncGetVideo(_id));
    setUpdateModal(true);
    console.log(_id);
  };
  return (
    <>
      <div className="col-md-6 col-lg-4  my-3 d-flex align-items-stretch  ">
        <div
          className="card card-body video-card "
          style={{ cursor: "pointer" }}
        >
          <div className="row">
            <h3 className="card-header col-10 ">{title}</h3>
            <button
              className="text-light btn btn-lg  col-2 mt-1"
              onClick={deleteHandler}
            >
              <i className="fa fa-window-close" aria-hidden="true"></i>
            </button>
          </div>

          <div className="ratio ratio-16x9 mb-5">
            <ReactPlayer url={url} width="100%" height="250px" />
          </div>
          <p className="card-text">{description}</p>
          <div className="row mx-1">
            <a  target="_blank" href={url} className="btn btn-primary col-6 rounded-pill ">
              Go To Video
            </a>
            <a
              role="button"
              className="btn btn-primary col-6  rounded-pill"
              onClick={onEdit}
            >
              EDIT
            </a>
          </div>

          <div className="card-footer text-muted">{date}</div>
        </div>
      </div>
      <VideoUpdate
        setUpdateModal={setUpdateModal}
        updateModal={updateModal}
        _id={_id}
      />
    </>
  );
}

export default VideoItem;
