import React from "react";
import { useSelector } from "react-redux";
import { AllVideos, videoSearch } from "../../store/Video/VideoSlice";
import VideoItem from "./VideoItem";

const VideoList = () => {
  const allVideos = useSelector(AllVideos);
  const searchText = useSelector(videoSearch);
  console.log(searchText);
  let videos = allVideos;
  if (searchText === "") {
    videos = allVideos;
  } else if (searchText.length > 0) {
    videos = allVideos.filter((e: { title: string }) =>
      e.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }
  return (
    <div className="row">
      {videos.map((video: any) => {
        return <VideoItem video={video} key={video._id} />;
      })}
    </div>
  );
};

export default VideoList;
