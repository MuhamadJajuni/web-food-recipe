import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

// REGISTER USERS
export const registerUsers = createAsyncThunk(
  "auth/registerUsers",
  async ({ name, email, password }) => {
    const response = await axios.post("http://localhost:3000/register", {
      name,
      email,
      password,
    });
    return response.data;
  }
);

// LOGIN USERS
export const loginUsers = createAsyncThunk(
  "auth/loginUsers",
  async ({ email, password }) => {
    const response = await axios.post("http://localhost:3000/login", {
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("id", response.data.dataUser.id);

    return response.data;
  }
);

const authEntity = createEntityAdapter({
  selectId: (user) => user.data.id,
});

// Membuat Slice & Reducers
const authSlice = createSlice({
  name: "auth",
  initialState: authEntity.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUsers.fulfilled, (state, action) => {
        authEntity.addOne(state, action.payload);
      })
      .addCase(loginUsers.fulfilled, (state, action) => {
        authEntity.updateOne(state, action.payload);
      });
  },
});

export const authSelector = authEntity.getSelectors((state) => state.auth);
export default authSlice.reducer;
