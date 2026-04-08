/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "./studentsSlice";

const StudentList = ({ student }) => {
  return (
    <div>
      <h3>Student List</h3>
      {student.map((list) => (
        <li key={list._id}>
          {list.name}(Age:{list.age})
        </li>
      ))}
    </div>
  );
};

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
          <Link>Add Student</Link>
        </button>
        <StudentList student={students} />
      </div>
    </main>
  );
};
