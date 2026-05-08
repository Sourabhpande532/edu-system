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
    marks: "",
    attendence: "",
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
    try {
      // dispatch logic based on context
      if (existingStudent) {
        dispatch(
          updateStudentAsync({ id: existingStudent._id, updatedStudent: form }),
        );
        toast.success("Student Updated");
      } else {
        dispatch(addStudentAsync(form));
        toast.success("Student added successfully!");
      }
      navigate("/");
    } catch (error) {
      setError(error.message || "Something went wrong with the server.");
      toast.error(error?.message || "Failed to save student.");
    }
  };

  return (
    <div className='container py-4 max-w-md mx-auto'>
      <div className="card shadow-sm border-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card-header bg-white border-bottom-0 pt-4 pb-0">
          <h2 className="mb-0 text-primary">{existingStudent ? "Edit Student" : "Add Student"}</h2>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-muted">Name</label>
              <input
                placeholder='Enter student name'
                name='name'
                value={form.name}
                onChange={handleStudentInputs}
                className='form-control'
              />
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label text-muted">Age</label>
                <input
                  placeholder='Enter age'
                  value={form.age}
                  type='number'
                  name='age'
                  onChange={handleStudentInputs}
                  className='form-control'
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-muted">Grade</label>
                <input
                  placeholder='Enter grade'
                  name='grade'
                  value={form.grade}
                  onChange={handleStudentInputs}
                  className='form-control'
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-muted d-block">Gender</label>
              <div className="form-check form-check-inline">
                <input
                  className='form-check-input'
                  type='radio'
                  value='Male'
                  name='gender'
                  id="genderMale"
                  checked={form.gender === "Male"}
                  onChange={handleStudentInputs}
                />
                <label className="form-check-label" htmlFor="genderMale">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className='form-check-input'
                  value='Female'
                  type='radio'
                  name='gender'
                  id="genderFemale"
                  checked={form.gender === "Female"}
                  onChange={handleStudentInputs}
                />
                <label className="form-check-label" htmlFor="genderFemale">Female</label>
              </div>
            </div>

            {/* Show marks and attendence ONLY if exist student */}
            {existingStudent && (
              <div className="row mb-4">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label className="form-label text-muted">Marks</label>
                  <input
                    name='marks'
                    type='number'
                    value={form.marks}
                    onChange={handleStudentInputs}
                    placeholder='Enter marks'
                    className='form-control'
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-muted">Attendance (%)</label>
                  <input
                    name='attendence'
                    type='number'
                    value={form.attendence}
                    onChange={handleStudentInputs}
                    className='form-control'
                    placeholder='Enter attendance'
                  />
                </div>
              </div>
            )}
            
            <div className="d-grid mt-4">
              <button className='btn btn-primary py-2'>
                {existingStudent ? "Update Student" : "Add Student"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export { StudentForm };
