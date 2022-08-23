import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  UserRegistration,
  UserLogin,
} from "../../components/Helpers/Interface/Auth";

const API = "http://localhost:4000";

export const fetchAsynSignUp = createAsyncThunk(
  "Auth/fetchAsyncSignUp",
  async (args: UserRegistration) => {
    const { data } = await axios.post(`${API}/user`, args);
    return data;
  }
);

export const fetchAsyncLogin = createAsyncThunk(
  "Auth/fetchAsyncLogin",
  async (args: UserLogin) => {
    const { data } = await axios.post(`${API}/user/login`, args);
    return data;
  }
);

const initialState = {
  user: {},
  registration: {},
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //*fetching SignUp
    builder.addCase(fetchAsynSignUp.pending, () => {
      console.log("pending SignUp");
    });
    builder.addCase(fetchAsynSignUp.fulfilled, (state, { payload }) => {
      console.log("fullfiled");
      console.log(payload);
      localStorage.setItem("token", payload.token);
      localStorage.setItem("userId", payload._id);
      return {
        ...state,
        registration: payload,
      };
    });
    builder.addCase(fetchAsynSignUp.rejected, () => {
      console.log("rejected");
    });
    //*fetching login
    builder.addCase(fetchAsyncLogin.pending, () => {
      console.log("pending Login");
    });
    builder.addCase(fetchAsyncLogin.fulfilled, (state, { payload }) => {
      console.log("pending Login");
      console.log(payload);
      localStorage.setItem("token", payload.token);
      localStorage.setItem("userId", payload._id);
      return {
        ...state,
        user: payload,
      };
    });
    builder.addCase(fetchAsyncLogin.rejected, () => {
      console.log("rejected Login");
    });
  },
});

export default AuthSlice.reducer;
