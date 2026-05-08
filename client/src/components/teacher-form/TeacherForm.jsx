import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTeacherAsync } from "../../features/teacher/teacherSlice";
import { toast } from "react-toastify";

const TeacherForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addTeacherAsync({ name, subject }));
    toast.success("Teacher Added.");

    setName("");
    setSubject("");
  };

  return (
    <div className='container py-4'>
      <div className="card shadow-sm border-0" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="card-header bg-white border-bottom-0 pt-4 pb-0">
          <h2 className="mb-0 text-primary">Add Teacher</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-muted">Teacher Name</label>
              <input
                placeholder='Enter teacher name'
                className='form-control'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label text-muted">Subject</label>
              <input
                placeholder='Enter subject'
                className='form-control'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="d-grid">
              <button className='btn btn-primary py-2'>Add Teacher</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherForm;
