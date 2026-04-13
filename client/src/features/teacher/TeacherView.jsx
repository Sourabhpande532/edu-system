import { useEffect } from "react";
import { deleteTeacherAsync, fetchTeachers } from "./teacherSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const TeacherView = () => {
  const dispatch = useDispatch();
  const teacher = useSelector((state) => state.teachers.teachers);
  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch, teacher.length]);

  return (
    <div className='container py-3'>
      <div className='d-flex justify-content-between gap-3'>
        <h2>Teacher view</h2>
        <Link className='btn btn-outline-success' to='/teacher-form'>
          Add Teacher
        </Link>
      </div>
      <ul className='list-group list-group-flush'>
        {teacher.map((t) => (
          <li
            className='list-group-item d-flex justify-content-between'
            key={t._id}>
            {t.name} - {t.subject}
            <button
              className='btn btn-outline-warning'
              onClick={() => dispatch(deleteTeacherAsync(t._id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherView;
