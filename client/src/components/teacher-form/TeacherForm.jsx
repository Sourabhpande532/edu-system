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
    <form className='container py-3' onSubmit={handleSubmit}>
      <input
        placeholder='Teacher Name'
        className='form-control mb-2'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder='Subject'
        className='form-control mb-2'
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <button className='btn btn-outline-primary mt-3'>Add Teacher</button>
    </form>
  );
};

export default TeacherForm;
