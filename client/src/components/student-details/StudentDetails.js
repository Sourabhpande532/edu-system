import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchStudents } from "../../features/students/studentsSlice";
import { useEffect } from "react";

const StudentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { students, status } = useSelector((state) => state.students);

  const existingStudent = students.find((s) => s._id === id);

  // fetch again if empty
  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students.length]);

  if (status === "loading") return <p>Loading..</p>;
  if (!existingStudent) return <p>Student not found.</p>;
  return (
    <div className='container py-3'>
      <h1>Student Details</h1>
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
        <button className='btn btn-danger'>Delete</button>
      </div>
    </div>
  );
};
export { StudentDetails };
