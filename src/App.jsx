import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/user/login-page";
import Signup from "./pages/user/signup-page";
import Beranda from "./pages/user/beranda-page";
import Profile from "./pages/user/profile-page";
import ChangePassword from "./pages/user/change-password";
import PrivacyPolicy from "./pages/user/privacy-page";
import Search from "./pages/user/search-page";
import Alumni from "./pages/user/alumni-page";
import Kolaborasi from "./pages/user/kolaborasi-alumni-page";
import AdminLogin from "./pages/admin/admin-login-page";
import AdminSignUp from "./pages/admin/admin-signup-page"
import AdminSearch from "./pages/admin/admin-search-page";
import DataAlumniPage from "./pages/admin/admin-alumni-page";
import BerandaAdmin from "./pages/admin/beranda-admin-page";
import AdminChangePassword from "./pages/admin/change-password-admin";
import EditProfileAdmin from "./pages/admin/edit-profile-admin";
import AdminPrivacyPolicy from "./pages/admin/admin-privacy-page";
import AdminSubmission from "./pages/admin/admin-pengajuan-page";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/kolaborasi" element={<Kolaborasi />} />
          <Route path="/change_password" element={<ChangePassword />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route path="/search" element={<Search />} />
          <Route path="/alumni/:nameSlug" element={<Alumni/>} />
          <Route path="/login-admin" element={<AdminLogin />} />
          <Route path="/signup-admin" element={<AdminSignUp />} />
          <Route path="/beranda-admin" element={<BerandaAdmin />} />
          <Route path="/admin-search" element={<AdminSearch />} />
          <Route path="/admin/alumni/:nameSlug" element={<DataAlumniPage/>} />
          <Route path="/admin-password" element={<AdminChangePassword />} />
          <Route path="/admin-profile" element={<EditProfileAdmin />} />
          <Route path="/privacy-policy" element={<AdminPrivacyPolicy />} />
          <Route path="/admin-submission" element={<AdminSubmission />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
