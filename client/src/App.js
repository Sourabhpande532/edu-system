import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { StudentView } from "./features/students/StudentView";
import Header from "./components/navbar/Header";
import { StudentForm } from "./components/student-form/StudentForm";

function App() {
  return (
    <div className=''>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<StudentView />} />
          <Route path='/add' element={<StudentForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
