import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StudentView } from "./features/students/StudentView";
import Header from "./components/navbar/Header";
import { StudentForm } from "./components/student-form/StudentForm";
import { StudentDetails } from "./components/student-details/StudentDetails";
import { ClassView } from "./components/class-view/ClassView";
import { SchoolView } from "./components/school-view/SchoolView";
import TeacherView from "./features/teacher/TeacherView";

function App() {
  return (
    <div className=''>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<StudentView />} />
          <Route path='/add' element={<StudentForm />} />
          <Route path='/edit/:id' element={<StudentForm />} />
          <Route path='/details/:id' element={<StudentDetails />} />
          <Route path='/class' element={<ClassView />} />
          <Route path='/school' element={<SchoolView />} />
          <Route path="/teacher" element={<TeacherView/>}/>
        </Routes>
        <ToastContainer position='top-right' />
      </BrowserRouter>
    </div>
  );
}

export default App;
