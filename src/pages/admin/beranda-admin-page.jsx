import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/Kampus.jpg";
import logo1 from "../../assets/UEU.png";
import logo2 from "../../assets/alumni_tracking1.png";
import profileImage from "../../assets/user.jpg";
import { Bell } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BerandaAdmin() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [alumni, setAlumni] = useState([]);
  const [adminName, setAdminName] = useState("");
  const [newSubmissionsCount, setNewSubmissionsCount] = useState(0);
  const lastToastTime = useRef(0);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const profileElement = profileRef.current;
    if (profileElement) {
      profileElement.addEventListener("click", toggleMenu);
      return () => profileElement.removeEventListener("click", toggleMenu);
    }
  }, []);

  useEffect(() => {
    const storedCount = localStorage.getItem("submissionsCount");
    setNewSubmissionsCount(storedCount ? parseInt(storedCount, 10) : 0);
  }, []);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin && admin.name) {
      setAdminName(admin.name);
    }
  }, []);

  const toggleMenu = (e) => {
    if (e) e.stopPropagation();
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleBellClick = () => {
    const now = Date.now();
    const timeSinceLastToast = now - lastToastTime.current;

    if (timeSinceLastToast >= 3000) {
      if (newSubmissionsCount > 0) {
        toast.info(`Pending ${newSubmissionsCount} data pengajuan`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.info("Tidak ada data pengajuan", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      lastToastTime.current = now;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("admintoken");
    navigate("/login-admin");
  };

  const handleProfile = (e) => {
    e.preventDefault();
    navigate("/admin-profile");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    navigate("/admin-password");
  };
  
  const handelScrappingAlumni = (e) => {
    e.preventDefault();
    navigate("/admin-scrapping");
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    setNewSubmissionsCount(0);
    navigate("/admin-submission");
  };

  const handleContactAlumni = (e) => {
    e.preventDefault();
    setNewSubmissionsCount(0);
    navigate("/contact-alumni");
  };

  const handlePrivacyPolicy = (e) => {
    e.preventDefault();
    navigate("/privacy_policy");
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value) {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch(`http://localhost:3000/api/admin/search?query=${encodeURIComponent(value)}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setAlumni(data);
        } else {
          console.error('Gagal mengambil data alumni');
        }
      } catch (error) {
        console.error('Error saat mengambil data alumni:', error);
      }
    } else {
      setAlumni([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/admin/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSuggestionClick = (alumniName) => {
    setSearchTerm(alumniName);
    navigate(`/admin/search?q=${encodeURIComponent(alumniName)}`);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <ToastContainer />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

      <nav className="relative z-10 bg-white py-2 w-full" data-bs-theme="light">
        <div className="container-xl flex justify-between items-center mx-auto px-2">
          <img
            className="img-fluid logo-brand me-auto"
            src={logo1}
            alt="Logo 1"
          />
          <img className="img-fluid logo-brand" src={logo2} alt="Logo 2" />
        </div>
      </nav>

      <div className="relative z-20 flex justify-end pr-10 pt-5">
        <div className="relative">
          <Bell
            className="text-white mr-8 mt-2 cursor-pointer"
            size={24}
            onClick={handleBellClick}
          />
          {newSubmissionsCount > 0 && (
            <div className="absolute top-0 right-3 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {newSubmissionsCount}
            </div>
          )}
        </div>
        <span className="text-white mr-4 mt-2 font-bold text-sm font-sans">
          Halo, {adminName || "Admin"}
        </span>
        <div
          ref={profileRef}
          className="profile-circle cursor-pointer w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
          onClick={toggleMenu}
          style={{
            border: "2px solid white",
            position: "relative",
            zIndex: 1000,
          }}
        >
          <img
            src={profileImage}
            alt="Admin Profile"
            className="w-full h-full object-cover"
          />
        </div>
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute right-20 mt-11 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dropdown-menu"
          >
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="px-4 py-2 text-sm text-gray-700 border-b flex items-center">
                <img
                  src={profileImage}
                  alt="Admin Profile"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <span> {adminName || "Admin"} </span>
              </div>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={handleProfile}
              >
                Profile Admin
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={handleChangePassword}
              >
                Change Password
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={handelScrappingAlumni}
              >
                Scrapping Alumni
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={handleSubmission}
              >
                Submissions
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={handleContactAlumni}
              >
                Contact Alumni
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={handlePrivacyPolicy}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          </div>
        )}
      </div>

      <div
        className="relative z-10 w-full h-full flex flex-col gap-10 items-center justify-center"
        style={{ marginTop: "-110px" }}
      >
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Temukan Data Alumni</h1>
          <h2 className="text-5xl font-bold">Semudah Mungkin</h2>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <form
            onSubmit={handleSearch}
            className="bg-white w-2/5 rounded-2xl shadow-md relative overflow-hidden"
          >
            <div className="flex flex-row items-center px-5 py-3 border-b border-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Cari Alumni atau ketik..."
                className="w-full outline-none"
              />
            </div>
            {alumni.length > 0 && (
              <div className="max-h-60 overflow-y-auto">
                {alumni.map((alumnus) => (
                  <div
                    key={alumnus.id}
                    className="px-5 py-3 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => handleSuggestionClick(alumnus.nama)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-3 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    {alumnus.nama}
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default BerandaAdmin;