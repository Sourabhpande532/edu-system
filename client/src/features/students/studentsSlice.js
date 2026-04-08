import axios from "axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get("http://localhost:4001/students");
    return response.data;
  },
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    status: "idle",
    error: null,
  },
  reducers: {},
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
  },
});

export const { increment, decrement } = studentSlice.actions;
export default studentSlice.reducer;
