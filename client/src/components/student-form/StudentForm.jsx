import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addStudentAsync,
  updateStudentAsync,
} from "../../features/students/studentsSlice";

const StudentForm = ({ existingStudent }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    age: "",
    grade: "",
    gender: "Male",
    marks: 0,
    attendence: 0,
  });
  console.log(form);

  // Load data if editing
  useEffect(() => {
    if (existingStudent) {
      setForm(existingStudent);
    }
  }, [existingStudent]);

  const handleStudentInputs = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "age" || name === "marks" || name === "attendence"
          ? Number(value)
          : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const { name, age, gender, grade } = form;
    if (!name || !age || !gender || !grade) {
      setError("Please fill in all requred fields.");
      return;
    }
    // dispatch logic based on context (New vs Updated);
    if (existingStudent) {
      dispatch(
        updateStudentAsync({ id: existingStudent._id, updatedStudent: form }),
        alert("Student Updated"),
      );
    } else {
      dispatch(addStudentAsync(form));
      setForm({ name: "", age: "", grade: "", gender: "Male" });
      alert("Student added successfully!");
    }
  };

  return (
    <div className='container py-3'>
      <h2>{existingStudent ? "Edit Student" : "Add Student"} </h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
              checked={form.gender === "Male"}
              onChange={handleStudentInputs}
            />{" "}
            Male
          </label>{" "}
          <label>
            <input
              value='Female'
              type='radio'
              name='gender'
              checked={form.gender === "Female"}
              onChange={handleStudentInputs}
            />{" "}
            Female
          </label>
        </div>
        {/* Show marks and attendence ONLY if exist student */}
        {existingStudent && (
          <>
            <input
              name='marks'
              type='number'
              placeholder='Marks'
              value={form.marks}
              onChange={handleStudentInputs}
            />
            <br />
            <input
              name='attendence'
              type='number'
              placeholder='Attendence'
              value={form.attendence}
              onChange={handleStudentInputs}
            />
            <br />
          </>
        )}
        <br />
        <button className='btn btn-outline-primary'>
          {existingStudent ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};
export { StudentForm };
