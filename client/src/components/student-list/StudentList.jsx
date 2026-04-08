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
export {StudentList}