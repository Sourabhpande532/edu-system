import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  setSortBy,
  fetchStudents,
} from "../../features/students/studentsSlice";
import { useEffect } from "react";

const ClassView = () => {
  const dispatch = useDispatch();
  const { students, filter, sortBy, status } = useSelector(
    (state) => state.students,
  );

  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students.length]);

  const filterStudents =
    filter === "All"
      ? students
      : students.filter((s) =>
          filter === "Boys" ? s.gender === "Male" : s.gender === "Female",
        );

  const sortedStudents = [...filterStudents].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "marks") {
      return (b.marks || 0) - (a.marks || 0);
    }
    if (sortBy === "attendence") {
      return (b.attendence || 0) - (a.attendence || 0);
    }
    return 0;
  });

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  if (status === "loading")
    return (
      <div className='container py-5 text-center'>
        <div className='spinner-border'></div>
      </div>
    );
  return (
    <div className='container py-3'>
      <h1 className='mb-4'>Class View</h1>
      {/* FILTER */}
      <div className='row g-3 mb-4'>
        <div className='col-md-6 col-lg-4'>
          <label className='form-label fw-bold'>Filter by Gender</label>
          <select
            value={filter}
            onChange={handleFilterChange}
            className='form-select'>
            <option value='All'>All</option>
            <option value='Boys'>Boys</option>
            <option value='Girls'>Girls</option>
          </select>
        </div>

        {/* SORT */}
        <div className='col-md-6 col-lg-4'>
          <label className='form-label fw-bold'>Sort By:</label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className='form-select'>
            <option value='name'>Name</option>
            <option value='marks'>Marks</option>
            <option value='attendence'>Attendence</option>
          </select>
        </div>
      </div>

      <div className='card shadow-sm'>
        <div className='card-header bg-light'>
          <h5 className='mb-0'>Student List ({filterStudents.length})</h5>
        </div>
        <ul className='list-group list-group-flush'>
          {sortedStudents.map((s) => (
            <li
              key={s._id}
              className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
              <div>
                <span className='fw-bold d-block'>{s.name}</span>
                <small className='text-muted'>{s?.gender ?? "N/A"}</small>
              </div>
              <div className='mt-2 mt-sm-0'>
                <span className='badge bg-primary me-2'>
                  Marks: {s.marks ?? 0}
                </span>
                <span className='badge bg-info text-dark'>
                  Attendance: {s.attendence ?? 0}%
                </span>
              </div>
            </li>
          ))}
          {filterStudents.length === 0 && (
            <li className='list-group-item text-center py-4 text-muted'>
              No students found matching these criteria.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
export { ClassView };
