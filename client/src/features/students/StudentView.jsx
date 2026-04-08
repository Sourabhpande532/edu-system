/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "./studentsSlice";
import { StudentList } from "../../components/student-list/StudentList";

export const StudentView = () => {
  const { students, status, error } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  return (
    <main className='container'>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        <h1>Student View</h1>
        <button className='btn btn-warning'>
          <Link to="/add">Add Student</Link>
        </button>
        <StudentList student={students} />
      </div>
    </main>
  );
};
