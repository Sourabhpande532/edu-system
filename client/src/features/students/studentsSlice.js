import axios from "axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get("http://localhost:4001/students");
    return response.data;
  },
);

export const addStudentAsync = createAsyncThunk(
  "students/addStudentAsync",
  async (newStudent) => {
    const response = await axios.post(
      "http://localhost:4001/students",
      newStudent,
    );
    return response.data;
  },
);

export const updateStudentAsync = createAsyncThunk(
  "student/updateStudentAsync",
  async ({ id, updatedStudent }) => {
    const response = await axios.put(
      `http://localhost:4001/students/${id}`,
      updatedStudent,
    );
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
    builder.addCase(addStudentAsync.fulfilled, (state, action) => {
      state.students.push(action.payload);
    });
    builder.addCase(updateStudentAsync.fulfilled, (state, action) => {
      const index = state.students.findIndex(
        (s) => s._id === action.payload._id,
      );
      if (index !== -1) state.students[index] = action.payload;
    });
  },
});

export const { increment, decrement } = studentSlice.actions;
export default studentSlice.reducer;
