import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  AllVideos,
  fetchAsyncGetAllVideos,
  videoAllError,
  videoAllPending,
} from "../../store/Video/VideoSlice";
import { Video } from "../Helpers/Interface/Video";
import Fail from "../UI/Status/Fail";
import Pending from "../UI/Status/Pending";
import VideoItem from "./VideoItem";
import VideoCreate from "./Modals/Create";
import Search from "../UI/Search/Search";
import VideoList from "./VideoList";

const Videos = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAsyncGetAllVideos());
  }, [dispatch]);
  const [modalShow, setModalShow] = useState(false);
  const allVideos = useSelector(AllVideos);
  const pending = useSelector(videoAllPending);
  const fail = useSelector(videoAllError);
  return (
    <>
      <div className="container-fluid">
        {!fail && (
          <>
            <div className="row justify-content-center mt-2">
              <button
                className="btn btn-primary col-lg-3 col-md-5 col-8 rounded-pill text-center"
                onClick={() => setModalShow(true)}
              >
                <i className="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>
            <div className="col-8 offset-2 my-2">
              <Search />
            </div>
          </>
        )}
        {pending && <Pending text="Loading All Videos" />}
        {fail && <Fail />}
        {!pending &&
          !fail &&
          (allVideos.length !== 0 ? (
            <VideoList />
          ) : (
            <div className="row text-center">
              <h1 className="display-2 my-4">You Dont Have any saved Videos</h1>
              <h1 className="display-3">
                Click On The Plus Icon To Start Adding
              </h1>
            </div>
          ))}
      </div>

      <VideoCreate show={modalShow} setModalShow={setModalShow} />
    </>
  );
};

export default Videos;
