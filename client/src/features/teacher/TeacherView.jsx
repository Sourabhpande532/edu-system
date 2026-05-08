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
    <div className='container py-4'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2 className="mb-0 text-primary">Teacher Directory</h2>
        <Link className='btn btn-primary shadow-sm' to='/teacher-form'>
          <i className="bi bi-person-plus me-2"></i>Add Teacher
        </Link>
      </div>
      
      <div className="card shadow-sm border-0">
        <ul className='list-group list-group-flush'>
          {teacher.map((t) => (
            <li
              className='list-group-item d-flex justify-content-between align-items-center py-3'
              key={t._id}>
              <div>
                <h5 className="mb-1">{t.name}</h5>
                <span className="badge bg-info text-dark">{t.subject}</span>
              </div>
              <button
                className='btn btn-outline-danger btn-sm px-3'
                onClick={() => dispatch(deleteTeacherAsync(t._id))}>
                <i className="bi bi-trash me-1"></i> Delete
              </button>
            </li>
          ))}
          {teacher.length === 0 && (
            <li className="list-group-item text-center py-4 text-muted">
              No teachers found. Click "Add Teacher" to add one.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TeacherView;
