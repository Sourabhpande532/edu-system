import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StudentView } from "./features/students/StudentView";
import Header from "./components/navbar/Header";
import { StudentForm } from "./components/student-form/StudentForm";
import { StudentDetails } from "./components/student-details/StudentDetails";

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
        </Routes>
        <ToastContainer position='top-right' />
      </BrowserRouter>
    </div>
  );
}

export default App;
