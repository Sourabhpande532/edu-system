import { Link } from "react-router-dom";
const StudentList = ({ student }) => {
  return (
    <div className="py-3">
      <h3>Student List</h3>
      <ul className='list-group'>
        {student.map((list) => (
          <li className='list-group-item' key={list._id}>
            <Link to={`/details/${list._id}`}>
              {list.name} (Age:{list.age})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export { StudentList };
