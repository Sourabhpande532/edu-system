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
    <div className='container py-4'>
      <h1 className='mb-4 fw-bold text-secondary'>School Statistics</h1>

      <div className='row g-4'>
        {/* Total Students Card */}
        <div className='col-md-6 col-lg-3'>
          <div className='card h-100 shadow-sm border-0 bg-primary text-white'>
            <div className='card-body'>
              <h6 className='card-subtitle mb-2 opacity-75'>Total Students</h6>
              <h2 className='card-title mb-0 fw-bold'>{totalStudents}</h2>
            </div>
          </div>
        </div>

        {/* Average Attendance Card */}
        <div className='col-md-6 col-lg-3'>
          <div className='card h-100 shadow-sm border-0 bg-success text-white'>
            <div className='card-body'>
              <h6 className='card-subtitle mb-2 opacity-75'>Avg. Attendance</h6>
              <h2 className='card-title mb-0 fw-bold'>
                {averageAttendance.toFixed(1)}%
              </h2>
            </div>
          </div>
        </div>

        {/* Average Marks Card */}
        <div className='col-md-6 col-lg-3'>
          <div className='card h-100 shadow-sm border-0 bg-info text-white'>
            <div className='card-body'>
              <h6 className='card-subtitle mb-2 opacity-75'>Average Marks</h6>
              <h2 className='card-title mb-0 fw-bold'>
                {averageMarks.toFixed(1)}
              </h2>
            </div>
          </div>
        </div>

        {/* Top Student Card */}
        <div className='col-md-6 col-lg-3'>
          <div className='card h-100 shadow-sm border-0 bg-warning text-dark'>
            <div className='card-body'>
              <h6 className='card-subtitle mb-2 opacity-75'>Top Performer</h6>
              <h2 className='card-title mb-0 fw-bold text-truncate'>
                {topStudents?.name || "N/A"}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Summary Details */}
      <div className='mt-5 p-4 bg-light rounded shadow-sm border'>
        <h5 className='fw-bold mb-3'>Academic Summary</h5>
        <p className='text-muted mb-0'>
          The current average performance across the school is{" "}
          <strong>{averageMarks.toFixed(2)}</strong> marks, with a student
          engagement rate of <strong>{averageAttendance.toFixed(2)}%</strong>.
        </p>
      </div>
    </div>
  );
};
export { SchoolView };
