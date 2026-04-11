import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api";

export const fetchTeachers = createAsyncThunk("teachers/fetch", async () => {
  const res = await axios.get(`${API_URL}/teachers`);
  return res.data;
});

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    teachers: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      state.teachers = action.payload;
    });
  },
});

export default teacherSlice.reducer;
