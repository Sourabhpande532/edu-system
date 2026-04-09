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

  if (status === "loading") return <p>Loading..</p>;
  return (
    <div className='container py-3'>
      <h1>Class View</h1>
      {/* FILTER */}
      <label>Filter</label>
      <select value={filter} onChange={handleFilterChange}>
        <option value='All'>All</option>
        <option value='Boys'>Boys</option>
        <option value='Girls'>Girls</option>
      </select>

      {/* SORT */}
      <label>Sort By:</label>
      <select value={sortBy} onChange={handleSortChange}>
        <option value='name'>Name</option>
        <option value='marks'>Marks</option>
        <option value='attendence'>Attendence</option>
      </select>

      {filterStudents.length === 0 && <p>No data found.</p>}
      <ul className='list-group mt-3'>
        {sortedStudents.map((s) => (
          <li key={s._id} className='list-group-item'>
            <strong>{s.name}</strong> | {s?.gender ?? "N/A"} {" | "}
            Marks: {s.marks ?? "N/A"} {" | "} Attendence:{" "}
            {s.attendence ?? "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
};
export { ClassView };
