import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudentAsync } from "../../features/students/studentsSlice";

const StudentForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    age: "",
    grade: "",
    gender: "Male",
  });
  console.log(form);

  const handleStudentInputs = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudentAsync(form));
    setForm({ name: "", age: "", grade: "", gender: "Male" });
    alert("Student added successfully!");
  };

  return (
    <div className='container py-3'>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Name'
          name='name'
          value={form.name}
          onChange={handleStudentInputs}
          className='form-control mb-3'
        />
        <input
          placeholder='age'
          value={form.age}
          type='number'
          name='age'
          onChange={handleStudentInputs}
          className='form-control mb-3'
        />
        <input
          placeholder='Grade'
          name='grade'
          value={form.grade}
          onChange={handleStudentInputs}
          className='form-control mb-3'
        />
        <div>
          Gender:{" "}
          <label>
            <input
              type='radio'
              value='Male'
              name='gender'
              onChange={handleStudentInputs}
            />{" "}
            Male
          </label>{" "}
          <label>
            <input
              value='Female'
              type='radio'
              name='gender'
              onChange={handleStudentInputs}
            />{" "}
            Female
          </label>
        </div>
        <br />
        <button className='btn btn-outline-primary'>Add</button>
      </form>
    </div>
  );
};
export { StudentForm };
