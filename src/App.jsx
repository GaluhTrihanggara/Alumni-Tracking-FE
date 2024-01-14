import React from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './components/loginpage';
import Signup from "./components/Signuppage";
import Beranda from "./components/beranda";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/beranda" element={<Beranda/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
