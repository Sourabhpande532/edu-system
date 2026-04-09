import axios from "axios";
import { API_URL } from "../../api";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(`${API_URL}/students`);
    return response.data;
  },
);

export const addStudentAsync = createAsyncThunk(
  "students/addStudentAsync",
  async (newStudent) => {
    const response = await axios.post(`${API_URL}/students`, newStudent);
    return response.data;
  },
);

export const updateStudentAsync = createAsyncThunk(
  "student/updateStudentAsync",
  async ({ id, updatedStudent }) => {
    const response = await axios.put(
      `${API_URL}/students/${id}`,
      updatedStudent,
    );
    return response.data;
  },
);

export const deleteStudentAsync = createAsyncThunk(
  "student/deleteStudentAsync",
  async (id) => {
    await axios.delete(`${API_URL}/students/${id}`);
    return id;
  },
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    status: "idle",
    error: null,
    filter: "All",
    sortBy: "name",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.status = "success";
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    });
    builder.addCase(addStudentAsync.fulfilled, (state, action) => {
      state.students.push(action.payload);
    });
    builder.addCase(updateStudentAsync.fulfilled, (state, action) => {
      const index = state.students.findIndex(
        (s) => s._id === action.payload._id,
      );
      if (index !== -1) state.students[index] = action.payload;
    });
    builder.addCase(deleteStudentAsync.fulfilled, (state, action) => {
      state.students = state.students.filter(
        (student) => student._id !== action.payload,
      );
    });
  },
});

export const { setFilter, setSortBy } = studentSlice.actions;
export default studentSlice.reducer;
