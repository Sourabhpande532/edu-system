import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteStudentAsync,
  fetchStudents,
} from "../../features/students/studentsSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const StudentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, status } = useSelector((state) => state.students);

  const existingStudent = students.find((s) => s._id === id);

  // fetch again if empty
  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students.length]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );
    if (!confirmDelete) return;
    await dispatch(deleteStudentAsync(id));
    toast.success("Student deleted successfully");
    navigate("/");
  };
  if (!existingStudent)
    return <p className='text-center'>Student not found.</p>;
  return (
    <div className='container py-4 max-w-md mx-auto'>
      <div className="card shadow-sm border-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card-header bg-white border-bottom-0 pt-4 pb-0 d-flex justify-content-between align-items-center">
          <h2 className="mb-0 text-primary">Student Details</h2>
          <span className="badge bg-primary fs-6">{existingStudent.grade}</span>
        </div>
        <div className="card-body">
          {status === "loading" && (
            <div className='text-center py-4'>
              <div className='spinner-border text-primary' role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <h4 className="card-title fw-bold">{existingStudent.name}</h4>
            <p className="text-muted mb-3">{existingStudent.gender}</p>
          </div>

          <ul className="list-group list-group-flush mb-4">
            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
              <span className="text-muted">Age</span>
              <span className="fw-medium">{existingStudent.age} years</span>
            </li>
            {existingStudent.attendence !== undefined && (
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                <span className="text-muted">Attendance</span>
                <span className={`fw-medium ${existingStudent.attendence >= 75 ? 'text-success' : 'text-danger'}`}>
                  {existingStudent.attendence}%
                </span>
              </li>
            )}
            {existingStudent.marks !== undefined && (
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                <span className="text-muted">Marks</span>
                <span className="fw-medium">{existingStudent.marks}</span>
              </li>
            )}
          </ul>

          <div className='d-flex gap-2 mt-4'>
            <Link
              to={`/edit/${existingStudent._id}`}
              state={{ student: existingStudent }}
              className='btn btn-warning flex-grow-1 text-white fw-medium'>
              <i className="bi bi-pencil me-2"></i>Edit
            </Link>
            <button
              onClick={handleDelete}
              className='btn btn-outline-danger flex-grow-1'
              disabled={status === "loading"}>
              <i className="bi bi-trash me-2"></i>
              {status === "loading" ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export { StudentDetails };
