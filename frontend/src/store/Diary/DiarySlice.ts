import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Diary } from "../../components/Helpers/Interface/Diary";
import {
  removedToast,
  succesToast,
} from "../../components/Helpers/Utilities/Toast";

const API = "http://localhost:4000";

export const fetchAsyncSingleDiary = createAsyncThunk(
  "Diary/fetchAsyncSingleDiary",
  async (id: string) => {
    try {
      const { data } = await axios.get(`${API}/diary/${id!}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const fetchAsyncAllDiaries = createAsyncThunk(
  "Diary/fetchAsyncAllDiaries ",
  async () => {
    try {
      const { data } = await axios.get(`${API}/diary`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.table(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const fetchAsyncCreateDiary = createAsyncThunk(
  "Diary/fetchAsyncCreateDiary ",
  async (diary: Diary) => {
    try {
      const { data } = await axios.post(`${API}/diary`, diary, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const fetchAsyncUpdateDiary = createAsyncThunk(
  "Diary/fetchAsyncUpdateDiary ",
  async (args: any) => {
    try {
      const { diary, singleDiary } = args;
      const { data } = await axios.put<Diary>(
        `${API}/diary/${singleDiary._id!}`,
        diary,
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
      return error;
    }
  }
);

export const fetchAsyncDeleteDiary = createAsyncThunk(
  "Diary/fetchAsyncDeleteDiary ",
  async (id: string) => {
    try {
      const { data } = await axios.delete(`${API}/diary/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

const initialState = {
  singleDiary: {},
  singleDiaryPending: false,
  singleDiaryFail: false,
  allDiaries: [],
  allDiaryPending: false,
  allDiaryFail: false,
  diarySearch: "",
};
const DiarySlice = createSlice({
  name: "Diary",
  initialState,
  reducers: {
    searchDiaries: (state: any, { payload }) => {
      state.diarySearch = payload;
    },
  },
  extraReducers: (builder) => {
    //*fetching singleDiary
    builder.addCase(fetchAsyncSingleDiary.pending, (state: any) => {
      console.log("DIARY PENDING!!");
      return {
        ...state,
        singleDiaryPending: true,
        singleDiaryFail: false,
      };
    });
    builder.addCase(fetchAsyncSingleDiary.fulfilled, (state, { payload }) => {
      console.log("DIARY FETCH SUCCESSFULLY!!");
      return {
        ...state,
        singleDiary: payload,
        singleDiaryPending: false,
        singleDiaryFail: false,
      };
    });
    builder.addCase(fetchAsyncSingleDiary.rejected, (state: any) => {
      console.log("DIARY REJECTED!!");
      return {
        ...state,
        singleDiaryPending: false,
        singleDiaryFail: true,
      };
    });
    //*fetching all diaries
    builder.addCase(fetchAsyncAllDiaries.pending, (state: any) => {
      console.log("DIARY ALl PENDING!!");
      return {
        ...state,
        allDiaryPending: true,
        allDiaryFail: false,
      };
    });
    builder.addCase(fetchAsyncAllDiaries.fulfilled, (state, { payload }) => {
      console.log("DIARY ALl FETCH SUCCESSFULLY!!");
      console.log(payload);
      return {
        ...state,
        allDiaries: payload,
        allDiaryPending: false,
        allDiaryFail: false,
      };
    });
    builder.addCase(fetchAsyncAllDiaries.rejected, (state: any) => {
      console.log("DIARY ALl REJECTED!!");
      return {
        ...state,
        allDiaryPending: false,
        allDiaryFail: true,
      };
    });
    //* create Diaries
    builder.addCase(fetchAsyncCreateDiary.pending, () => {
      console.log("DIARY Create PENDING!!");
    });
    builder.addCase(fetchAsyncCreateDiary.fulfilled, (state, { payload }) => {
      console.log("DIARY Create  SUCCESSFULLY!!");
      succesToast("Successfully Created Diary");
      console.log(payload);
    });
    builder.addCase(fetchAsyncCreateDiary.rejected, () => {
      console.log("DIARY Create REJECTED!!");
    });
    //*Updating Diaries
    builder.addCase(fetchAsyncUpdateDiary.pending, () => {
      console.log("DIARY Updated PENDING!!");
    });
    builder.addCase(fetchAsyncUpdateDiary.fulfilled, (state, { payload }) => {
      console.log("DIARY Updated  SUCCESSFULLY!!");
      succesToast("Successfully Updated Diary");
      console.log(payload);
    });
    builder.addCase(fetchAsyncUpdateDiary.rejected, () => {
      console.log("DIARY Updated REJECTED!!");
    });
    //*deleting diary
    builder.addCase(fetchAsyncDeleteDiary.pending, () => {
      console.log("DIARY Deleted PENDING!!");
    });
    builder.addCase(fetchAsyncDeleteDiary.fulfilled, (state, { payload }) => {
      console.log("DIARY Deleted  SUCCESSFULLY!!");
      removedToast("Successfully Deleted Diary");
      console.log(payload);
    });
    builder.addCase(fetchAsyncDeleteDiary.rejected, () => {
      console.log("DIARY Deleted REJECTED!!");
    });
  },
});
export const getDiaryDetails = (state: { Diary: { singleDiary: any } }) =>
  state.Diary.singleDiary;
export const getAllDiaries = (state: { Diary: { allDiaries: any } }) =>
  state.Diary.allDiaries;
//* single diary status
export const singleDiaryPending = (state: {
  Diary: { singleDiaryPending: boolean };
}) => state.Diary.singleDiaryPending;
export const singleDiaryFail = (state: {
  Diary: { singleDiaryFail: boolean };
}) => state.Diary.singleDiaryFail;
export const allDiariesPending = (state: {
  Diary: { allDiaryPending: boolean };
}) => state.Diary.allDiaryPending;
export const allDiariesFail = (state: { Diary: { allDiaryFail: boolean } }) =>
  state.Diary.allDiaryFail;

export const { searchDiaries } = DiarySlice.actions;
export const diarySearch = (state: { Diary: { diarySearch: string } }) =>
  state.Diary.diarySearch;

export default DiarySlice.reducer;
