import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../features/students/studentsSlice";
import schoolReducer from "../features/school/schoolSlice";
import teacherReducer from "../features/teacher/teacherSlice";

const store = configureStore({
  reducer: {
    students: studentReducer,
    school: schoolReducer,
    teachers: teacherReducer,
  },
});
export default store;
