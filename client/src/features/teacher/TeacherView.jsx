import { useEffect } from "react";
import { fetchTeachers } from "./teacherSlice";
import { useSelector, useDispatch } from "react-redux";

const TeacherView = () => {
  const dispatch = useDispatch();
  const teacher = useSelector((state) => state.teachers.teachers);
  
  console.log(teacher);
  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch, teacher.lenght]);

  return (
    <div className='container py-3'>
      <div className='d-flex justify-content-between gap-3'>
        <h2>Teacher view</h2>
        <button className='btn btn-outline-success'>Add Teacher</button>
      </div>
      <ul className='list-group list-group-flush'>
        {teacher.map((t) => (
          <li
            className='list-group-item d-flex justify-content-between'
            key={t._id}>
            {t.name} - {t.subject}
            <button className='btn btn-outline-warning'>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherView;
