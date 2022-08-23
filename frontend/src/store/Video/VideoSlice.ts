import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Video } from "../../components/Helpers/Interface/Video";
import {
  alertToast,
  succesToast,
} from "../../components/Helpers/Utilities/Toast";
const API = "http://localhost:4000";

export const fetchAsyncGetAllVideos = createAsyncThunk(
  "Video/fetchAsyncGetAllVideos",
  async () => {
    try {
      const { data } = await axios.get<any>(`${API}/videos`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchAsyncGetVideo = createAsyncThunk(
  "Video/fetchAsyncGetVideo",
  async (id: any) => {
    const { data } = await axios.get<Video>(`${API}/videos/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return data;
  }
);

export const fetchAsyncCreateVideo = createAsyncThunk(
  "Video/fetchAsyncCreateVideo",
  async (video: Video) => {
    try {
      const { data } = await axios.post(`${API}/videos`, video, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAsyncUpdateVideo = createAsyncThunk(
  "Video/fetchAsyncUpdateVideo",
  async (args: any) => {
    try {
      const { singleVideo, video } = args;
      console.log("fetchUpdate", singleVideo._id);
      const { data } = await axios.put<Video>(
        `${API}/videos/${singleVideo._id}`,
        video,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAsyncDeleteVideo = createAsyncThunk(
  "Video/fetchAsyncDeleteVideo",
  async (id: string) => {
    try {
      const { data } = await axios.delete<Video>(`${API}/videos/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  videos: [],
  singleVideo: {},
  getAllPending: false,
  getAllError: false,
  getSinglePending: false,
  getSingleError: false,
  createPending: false,
  updatePending: false,
  deletePending: false,
  vidoeSearchText: "",
};

const VideoSlice = createSlice({
  name: "Video",
  initialState,
  reducers: {
    searchVideos: (state: any, { payload }) => {
      state.vidoeSearchText = payload;
    },
  },
  extraReducers: (builder) => {
    //*getting all Videos

    builder.addCase(fetchAsyncGetAllVideos.pending, (state) => {
      console.log("pending");
      return {
        ...state,
        getAllPending: true,
        getAllError: false,
      };
    });
    builder.addCase(fetchAsyncGetAllVideos.fulfilled, (state, { payload }) => {
      console.log("fullfilled");
      console.log(payload);
      return {
        ...state,
        videos: payload,
        getAllPending: false,
        getAllError: false,
      };
    });
    builder.addCase(fetchAsyncGetAllVideos.rejected, (state) => {
      console.log("rejected");
      return {
        ...state,
        getAllPending: false,
        getAllError: true,
      };
    });

    //*creating Videos
    builder.addCase(fetchAsyncCreateVideo.pending, (state) => {
      console.log("pending");
      return {
        ...state,
        createPending: true,
      };
    });
    builder.addCase(fetchAsyncCreateVideo.fulfilled, (state, { payload }) => {
      console.log("fullfiled");
      console.log("create payload", payload);
      if (payload === "this URL already exist") {
        alertToast("This Url Already Exist");
        return {
          ...state,
          createPending: false,
        };
      } else {
        succesToast("Video Created Successfully");
      }
    });
    builder.addCase(fetchAsyncCreateVideo.rejected, (state, { payload }) => {
      console.log("rejected");
      alertToast("Creating Video Failed");
      console.log(payload);

      return {
        ...state,
        createPending: false,
      };
    });

    //*updating video

    builder.addCase(fetchAsyncUpdateVideo.pending, (state) => {
      console.log("pending");
      return {
        ...state,
        updatePending: true,
      };
    });
    builder.addCase(fetchAsyncUpdateVideo.fulfilled, (state, { payload }) => {
      console.log("fulfilled");
      succesToast("Video Updated");
      console.log(payload);

      return {
        ...state,
        updatePending: false,
      };
    });
    builder.addCase(fetchAsyncUpdateVideo.rejected, (state, { payload }) => {
      console.log("rejected");
      alertToast("Updating Video Failed");
      console.log(payload);

      return {
        ...state,
        updatePending: false,
      };
    });

    //* get Single Video
    builder.addCase(fetchAsyncGetVideo.pending, (state) => {
      console.log("pending");
      return {
        ...state,
        getSinglePending: true,
        getSingleError: false,
        singleVideo: initialState.singleVideo,
      };
    });
    builder.addCase(fetchAsyncGetVideo.fulfilled, (state, { payload }) => {
      console.log("fulfilled");
      return {
        ...state,
        singleVideo: payload,
        getSinglePending: false,
        getSingleError: false,
      };
    });
    builder.addCase(fetchAsyncGetVideo.rejected, (state) => {
      console.log("rejected");
      return {
        ...state,
        getSinglePending: false,
        getSingleError: true,
        singleVideo: initialState.singleVideo,
      };
    });

    //*delete video
    builder.addCase(fetchAsyncDeleteVideo.pending, (state) => {
      console.log("pending");
      return {
        ...state,
        deletePending: true,
      };
    });
    builder.addCase(fetchAsyncDeleteVideo.fulfilled, (state) => {
      console.log("fulfilled");
      succesToast("Video Deleted Successfully");
    });
    builder.addCase(fetchAsyncDeleteVideo.rejected, () => {
      console.log("rejected");
      alertToast("Deleting Video Failed");
    });
  },
});

//* exporting all Videos
export const AllVideos = (state: { Video: { videos: Video[] } }) =>
  state.Video.videos;
//*exporting single Video
export const SingleVideo = (state: { Video: { singleVideo: Video } }) =>
  state.Video.singleVideo;

//*exporting status of error and pending
//*all videos Status
export const videoAllPending = (state: { Video: { getAllPending: boolean } }) =>
  state.Video.getAllPending;
export const videoAllError = (state: { Video: { getAllError: boolean } }) =>
  state.Video.getAllError;
//*create Video Status
export const videoCreatePending = (state: {
  Video: { getAllPending: boolean };
}) => state.Video.getAllPending;
//*update Video Status
export const videoUpadtePending = (state: {
  Video: { updatePending: boolean };
}) => state.Video.updatePending;
//*delete Video Status
export const videoDeletePending = (state: {
  Video: { deletePending: boolean };
}) => state.Video.deletePending;
//*single Video Status
export const videoSinglePending = (state: {
  Video: { getSinglePending: boolean };
}) => state.Video.getSinglePending;
export const videoSingleError = (state: {
  Video: { getSingleError: boolean };
}) => state.Video.getSingleError;

export const { searchVideos } = VideoSlice.actions;
export const videoSearch = (state: { Video: { vidoeSearchText: string } }) =>
  state.Video.vidoeSearchText;
export default VideoSlice.reducer;
