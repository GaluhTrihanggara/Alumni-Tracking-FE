import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login-page";
import Signup from "./pages/signup-page";
import Beranda from "./pages/beranda-page";
import Profile from "./pages/edit-profile-page";
import ChangePassword from "./pages/change-password";
import PrivacyPolicy from "./pages/privacy-page";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change_password" element={<ChangePassword />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
