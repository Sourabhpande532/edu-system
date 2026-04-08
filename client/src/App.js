import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { StudentView } from "./features/students/StudentView";
import Header from "./components/navbar/Header";

function App() {
  return (
    <div className=''>
      <BrowserRouter>
      <Header/>
        <StudentView />
      </BrowserRouter>
    </div>
  );
}

export default App;
