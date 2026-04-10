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
    <main className='container py-4'>
      {/* ERROR ALERT */}
      {error && (
        <div className='alert alert-danger mb-4' role='alert'>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h1 className='h2 mb-0'>Student Management</h1>

        {/* Styled Link as a Button directly */}
        <Link to='/add' className='btn btn-warning shadow-sm'>
          <i className='bi bi-plus-lg me-1'></i> Add Student
        </Link>
      </div>

      {/* LOADING SPINNER */}
      {status === "loading" ? (
        <div className='text-center py-5'>
          <div className='spinner-border text-warning' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
          <p className='mt-2 text-muted'>Fetching student records...</p>
        </div>
      ) : (
        <div className='card shadow-sm border-0'>
          <div className='card-body p-0'>
            <StudentList student={students} />
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!status === "loading" && students.length === 0 && (
        <div className='text-center py-5 border rounded bg-light'>
          <p className='mb-0 text-muted'>
            No students found. Click "Add Student" to get started.
          </p>
        </div>
      )}
    </main>
  );
};
