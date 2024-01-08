import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

// UPDATE USERS
export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async ({ userId, name, photo }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:3000/update/${userId}`,
      {
        name,
        photo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

// GET PROFILE
export const getProfile = createAsyncThunk("users/getProfile", async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`http://localhost:3000/detail/${id}`, {
    headers: {
      Authorization: `Bearer ${token || ""}`,
    },
  });
  return response.data;
});

const usersEntity = createEntityAdapter({
  selectId: (users) => users.data[0].id,
});

const usersSlice = createSlice({
  name: "users",
  initialState: usersEntity.getInitialState(),
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.fulfilled, (state, action) => {
        usersEntity.updateOne(state, action.payload);
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        usersEntity.setOne(state, action.payload);
      });
  },
});

export const usersSelector = usersEntity.getSelectors((state) => state.users);
export default usersSlice.reducer;
