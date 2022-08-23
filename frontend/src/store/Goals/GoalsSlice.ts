import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Goal } from "../../components/Helpers/Interface/Goal";
import {
  alertToast,
  removedToast,
  succesToast,
} from "../../components/Helpers/Utilities/Toast";
const API = "http://localhost:4000";

export const fetchAsyncGetAllGoals = createAsyncThunk(
  "Goal/fetchAsyncGetAllGoals ",
  async () => {
    try {
      const { data } = await axios.get(`${API}/goals`, {
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

export const fetchAsyncGetGoal = createAsyncThunk(
  "Goal/fetchAsyncGetGoal",
  async (id: string) => {
    try {
      const { data } = await axios.get(`${API}/goals/${id}`, {
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

export const fetchAsyncCreateGoal = createAsyncThunk(
  "Goal/fetchAsyncCreateGoal",
  async (goal: Goal) => {
    try {
      const { data } = await axios.post(`${API}/goals`, goal, {
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

export const fetchAsyncUpdateGoal = createAsyncThunk(
  "Goal/fetchAsyncUpdateGoal ",
  async (goal: any) => {
    try {
      const { data } = await axios.put<Goal>(
        `${API}/goals/${goal._id!}`,
        goal,
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

export const fetchAsyncDeleteGoal = createAsyncThunk(
  "Goal/fetchAsyncDeleteGoal",
  async (id: string) => {
    try {
      const { data } = await axios.delete<Goal>(`${API}/goals/${id}`, {
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
  goals: [],
  singleGoal: {},
  allGoalsPending: false,
  allGoalsFail: false,
  goalsFilter: "All",
  goalsSearch: "",
};

const GoalSlice = createSlice({
  name: "Goal",
  initialState,
  reducers: {
    searchGoals: (state: any, { payload }) => {
      state.goalsSearch = payload;
    },
    filterGoals: (state: any, { payload }) => {
      state.goalsFilter = payload;
    },
  },
  extraReducers: (builder) => {
    //*fetching all goals
    builder.addCase(fetchAsyncGetAllGoals.pending, (state) => {
      console.log("pending all goals");
      return {
        ...state,
        allGoalsPending: true,
        allGoalsFail: false,
      };
    });
    builder.addCase(fetchAsyncGetAllGoals.fulfilled, (state, { payload }) => {
      console.log("fullfilled all goals");
      console.log(payload);
      return {
        ...state,
        goals: payload,
        allGoalsPending: false,
        allGoalsFail: false,
      };
    });
    builder.addCase(fetchAsyncGetAllGoals.rejected, (state) => {
      console.log("rejected all goals");
      return {
        ...state,
        allGoalsPending: false,
        allGoalsFail: true,
      };
    });
    //*fetching single Goal
    builder.addCase(fetchAsyncGetGoal.pending, (state) => {
      console.log("pending singleGoal");
    });
    builder.addCase(fetchAsyncGetGoal.fulfilled, (state, { payload }) => {
      console.log("fullfilled singleGoal");
      return {
        ...state,
        singleGoal: payload,
      };
    });
    builder.addCase(fetchAsyncGetGoal.rejected, (state) => {
      console.log("rejected singleGoal");
    });
    //*fetch creating Goal
    builder.addCase(fetchAsyncCreateGoal.pending, (state) => {
      console.log("pending singleGoal");
    });
    builder.addCase(fetchAsyncCreateGoal.fulfilled, (state, { payload }) => {
      console.log("fullfilled singleGoal");
      succesToast("Created Goal");
    });
    builder.addCase(fetchAsyncCreateGoal.rejected, (state) => {
      console.log("rejected singleGoal");
      alertToast("Creating Goal Failed");
    });
    //*fetching Updating Goal
    builder.addCase(fetchAsyncUpdateGoal.pending, (state) => {
      console.log("pending Update Goal");
    });
    builder.addCase(fetchAsyncUpdateGoal.fulfilled, (state, { payload }) => {
      console.log("fullfilled Update Goal");
    });
    builder.addCase(fetchAsyncUpdateGoal.rejected, (state) => {
      console.log("rejected Update Goal");
      alertToast("Updating Goal Failed");
    });
    //*fetching Goal Delete
    builder.addCase(fetchAsyncDeleteGoal.pending, (state) => {
      console.log("pending Delete Goal");
    });
    builder.addCase(fetchAsyncDeleteGoal.fulfilled, (state, { payload }) => {
      console.log("fullfilled Delete Goal");
      removedToast(" Deleted Goal Successfully");
    });
    builder.addCase(fetchAsyncDeleteGoal.rejected, (state) => {
      console.log("rejected Delete Goal");
      alertToast("Deleting Goal Failed");
    });
  },
});

export const getAllGoals = (state: { Goal: { goals: Goal[] } }) =>
  state.Goal.goals;
export const getSingleGoal = (state: { Goal: { singleGoal: Goal } }) =>
  state.Goal.singleGoal;

export const { searchGoals } = GoalSlice.actions;
export const { filterGoals } = GoalSlice.actions;
export const goalSearchText = (state: { Goal: { goalsSearch: string } }) =>
  state.Goal.goalsSearch;
export const getGoalsFilter = (state: { Goal: { goalsFilter: string } }) =>
  state.Goal.goalsFilter;
export default GoalSlice.reducer;
