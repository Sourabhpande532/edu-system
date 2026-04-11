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
    <div className='container py-3'>
      <h1>Student Details</h1>
      {status === "loading" && (
        <div className='text-center'>
          <div className='spinner-border'>loading....</div>
        </div>
      )}
      <p>Name: {existingStudent.name}</p>
      <p>Age: {existingStudent.age}</p>
      <p>Grade: {existingStudent.grade}</p>
      {existingStudent.attendence !== undefined && (
        <p>Attendence: {existingStudent.attendence}</p>
      )}
      {existingStudent.marks !== undefined && (
        <p>Marks: {existingStudent.marks}</p>
      )}
      <div className=''>
        <button className='btn bg-warning'>
          <Link
            to={`/edit/${existingStudent._id}`}
            state={{ student: existingStudent }}>
            Edit Details
          </Link>
        </button>
        {"  "}
        <button
          onClick={handleDelete}
          className='btn btn-danger'
          disabled={status === "loading"}>
          {status === "loading" ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};
export { StudentDetails };
