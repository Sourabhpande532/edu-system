import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api";

export const fetchTeachers = createAsyncThunk("teachers/fetch", async () => {
  const res = await axios.get(`${API_URL}/teachers`);
  return res.data;
});

// Add
export const addTeacherAsync = createAsyncThunk(
  "teachers/add",
  async (teacher) => {
    const res = await axios.post(`${API_URL}/teachers`, teacher);
    return res.data;
  },
);

// Delete
export const deleteTeacherAsync = createAsyncThunk(
  "teachers/delete",
  async (id) => {
    await axios.delete(`${API_URL}/teachers/${id}`);
    return id;
  },
);

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    teachers: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.teachers = action.payload;
      })
      .addCase(addTeacherAsync.fulfilled, (state, action) => {
        state.teachers.push(action.payload);
      })
      .addCase(deleteTeacherAsync.fulfilled, (state, action) => {
        state.teachers = state.teachers.filter((t) => t._id !== action.payload);
      });
  },
});

export default teacherSlice.reducer;
