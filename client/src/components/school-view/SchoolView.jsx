/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSchoolStats,
  setTopStudent,
} from "../../features/school/schoolSlice";
import { fetchStudents } from "../../features/students/studentsSlice";

const SchoolView = () => {
  const dispatch = useDispatch();
  const { totalStudents, averageAttendance, averageMarks, topStudents } =
    useSelector((state) => state.school);

  const students = useSelector((state) => state.students.students);

  // Fetch ONLY IF empty
  useEffect(() => {
    if (!students || students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students.length]);

  // calculate stats when data comes
  useEffect(() => {
    if (!students || students.length === 0) return;
    const total = students.length;
    const totalAttendance = students.reduce(
      (acc, curr) => acc + (curr.attendence || 0),
      0,
    );
    const totalMarks = students.reduce(
      (acc, curr) => acc + Number(curr.marks || 0),
      0,
    );
    const avgAttendance = totalAttendance / total;
    const avgMarks = totalMarks / total;

    // Find Top student
    const top =
      students.length > 0
        ? students.reduce((prev, curr) => {
            const prevMarks = Number(prev.marks || 0);
            const currMarks = Number(curr.marks || 0);
            return currMarks > prevMarks ? curr : prev;
          })
        : null;

    dispatch(
      updateSchoolStats({
        totalStudents: total,
        averageAttendance: avgAttendance,
        averageMarks: avgMarks,
        topStudents: top,
      }),
    );
    dispatch(setTopStudent(top));
  }, [students, dispatch]);

  return (
    <div className='container py-3'>
      <h1>School View</h1>
      <p>Total Students: {totalStudents}</p>
      <p>Average Attendance: {averageAttendance.toFixed(2)}</p>
      <p>Average Marks: {averageMarks.toFixed(2)}</p>
      <p>
        Top Students: {topStudents && topStudents.name ? topStudents.name : "-"}
      </p>
    </div>
  );
};
export { SchoolView };
