import Login from "./Login";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import FileUpload from "./FileUpload";
import FileView from "./FileView";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/view" element={<FileView type="pdf"  />}></Route>
          <Route path="/view" element={<FileView type="image"  />}></Route>
          <Route path="/upload" element={<FileUpload />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
