const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  totalStudents: 0,
  averageAttendance: 0,
  averageMarks: 0,
  topStudents: null,
};

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    updateSchoolStats: (state, action) => {
      const { totalStudents, averageAttendance, averageMarks, topStudents } =
        action.payload;
      state.totalStudents = totalStudents;
      state.averageAttendance = averageAttendance;
      state.averageMarks = averageMarks;
      state.topStudents = topStudents;
    },
    setTopStudent: (state, action) => {
      state.topStudents = action.payload;
    },
  },
});

export const { updateSchoolStats, setTopStudent } = schoolSlice.actions;
export default schoolSlice.reducer;
