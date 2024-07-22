import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loginpage from "./pages/login-page";
import Signup from "./pages/signup-page";
import Beranda from "./pages/beranda-page";
import Profile from "./pages/edit-profile-page";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
