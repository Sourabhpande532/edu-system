import { Link } from "react-router-dom";
const StudentList = ({ student }) => {
  return (
    <div className="py-3 px-4">
      <h3 className="mb-4 text-primary">Student List</h3>
      <div className='list-group list-group-flush'>
        {student.map((list) => (
          <Link 
            to={`/details/${list._id}`} 
            className='list-group-item list-group-item-action d-flex justify-content-between align-items-center py-3' 
            key={list._id}
          >
            <div>
              <h5 className="mb-1">{list.name}</h5>
              <small className="text-muted">Age: {list.age}</small>
            </div>
            <i className="bi bi-chevron-right text-muted"></i>
          </Link>
        ))}
      </div>
    </div>
  );
};
export { StudentList };
