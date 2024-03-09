import "./App.css";
import React from "react";
import Home1 from "./components/Home1";
import About from "./components/About";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import Login1 from "./components/Login1";
import SignUp from "./components/SignUp";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) =>{
    setAlert({msg: message, type: type})
    setTimeout(() =>{
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home1 showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/Login1" element={<Login1 showAlert={showAlert} />} />
              <Route exact path="/SignUp" element={<SignUp showAlert={showAlert} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
