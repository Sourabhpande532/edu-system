import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addStudentAsync,
  updateStudentAsync,
} from "../../features/students/studentsSlice";
import { toast } from "react-toastify";

const StudentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const existingStudent = location.state?.student;

  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    age: "",
    grade: "",
    gender: "Male",
    marks: 0,
    attendence: 0,
  });

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
    // dispatch logic based on context
    if (existingStudent) {
      dispatch(
        updateStudentAsync({ id: existingStudent._id, updatedStudent: form }),
      );
      toast.success("Student Updated");
    } else {
      dispatch(addStudentAsync(form));
      // setForm({
      //   name: "",
      //   age: "",
      //   grade: "",
      //   gender: "Male",
      //   marks: 0,
      //   attendence: 0,
      // });
      toast.success("Student added successfully!");
    }
    navigate("/");
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
          <label className='form-label'>
            <input
              type='radio'
              value='Male'
              name='gender'
              checked={form.gender === "Male"}
              onChange={handleStudentInputs}
            />{" "}
            Male
          </label>{" "}
          <label className='form-label'>
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
              value={form.marks}
              onChange={handleStudentInputs}
              placeholder='Marks'
              className='form-control'
            />
            <br />
            <input
              name='attendence'
              type='number'
              value={form.attendence}
              onChange={handleStudentInputs}
              className='form-control'
              placeholder='Attendence'
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
