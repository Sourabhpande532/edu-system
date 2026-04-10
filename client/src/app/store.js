import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../features/students/studentsSlice";
import schoolReducer from "../features/school/schoolSlice";
const store = configureStore({
  reducer: {
    students: studentReducer,
    school: schoolReducer,
  },
});
export default store;
