import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Bell, User } from "lucide-react";
import logo1 from "../../assets/alumni_tracking1.png";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import profileImage from "../../assets/user.jpg";
import { MdFilterListAlt } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminSearchAlumniPage() {
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [alumni, setAlumni] = useState([]);
  const [isProgramFilterEnabled, setIsProgramFilterEnabled] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [isYearFilterEnabled, setIsYearFilterEnabled] = useState(false);
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
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
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    setSearchQuery(query || "");
    if (query) {
      fetchAlumni(query);
    }
  }, [location.search]);

  const fetchAlumni = async (query, filters = {}) => {
    try {
      const token = localStorage.getItem("adminToken");
      let url = `http://localhost:3000/api/admin/search?query=${encodeURIComponent(
        query
      )}`;

      if (filters.fromYear) url += `&fromYear=${filters.fromYear}`;
      if (filters.toYear) url += `&toYear=${filters.toYear}`;
      if (filters.programStudi)
        url += `&programStudi=${encodeURIComponent(filters.programStudi)}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAlumni(data);
        setSuggestions(data);
      } else {
        console.error("Failed to fetch alumni");
      }
    } catch (error) {
      console.error("Error fetching alumni:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value) {
      fetchAlumni(value);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filters = {};
    if (isYearFilterEnabled) {
      filters.fromYear = fromYear;
      filters.toYear = toYear;
    }
    if (isProgramFilterEnabled) {
      filters.programStudi = selectedProgram;
    }
    fetchAlumni(searchQuery, filters);
  };

  const handleSuggestionClick = (name) => {
    setSearchQuery(name);
    setShowSuggestions(false);
    navigate(`/admin/search?q=${encodeURIComponent(name)}`);
  };

  const toggleMenu = (e) => {
    if (e) e.stopPropagation();
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleBellClick = () => {
    const now = Date.now();
    const timeSinceLastToast = now - lastToastTime.current;

    if (timeSinceLastToast >= 3000) {
      toast.info("Tidak ada data pengajuan", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      lastToastTime.current = now;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
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
    navigate("/admin-submission");
  };

  const handlePrivacyPolicy = (e) => {
    e.preventDefault();
    navigate("/privacy_policy");
  };

  const handleLogoClick = () => {
    navigate("/beranda-admin");
  };

  const handleAlumniClick = (alumni) => {
    if (alumni && alumni.nama) {
      const nameSlug = alumni.nama.toLowerCase().replace(/ /g, "-");
      navigate(`/admin/alumni/${nameSlug}`, { state: { alumniData: alumni } });
    } else {
      console.error("Data alumni tidak valid:", alumni);
      toast.error("Terjadi kesalahan saat membuka profil alumni");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <ToastContainer />
      <header className="bg-blue-500 p-4 flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleLogoClick}
        >
          <img src={logo1} alt="Alumni Tracking Logo" className="h-8 mr-2" />
        </div>
        <div className="flex-grow mx-4 relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Alumni"
                className="w-full p-2 pl-12 rounded-md border"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
              />
              <button
                type="submit"
                className="absolute left-3 top-2 text-gray-400"
              >
                <Search size={20} />
              </button>
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                    onClick={() => handleSuggestionClick(suggestion.nama)}
                  >
                    <Search size={16} className="mr-2 text-gray-400" />
                    {suggestion.nama}
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
        <div className="flex items-center">
          <Bell
            className="text-white mr-6 cursor-pointer"
            size={24}
            onClick={handleBellClick}
          />
          <div
            ref={profileRef}
            className="profile-circle cursor-pointer w-10 h-10 rounded-full flex items-center justify-center overflow-hidden mr-2"
            onClick={toggleMenu}
            style={{
              border: "2px solid white",
              position: "relative",
              zIndex: 1000,
            }}
          >
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-10 top-6 mt-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dropdown-menu"
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
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <span>Profile Name</span>
                </div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={handleProfile}
                >
                  Profile
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
      </header>
      <main className="flex-grow flex">
        <aside className="w-64 bg-white p-4 shadow-md">
          <div className="flex items-center mb-4">
            <MdFilterListAlt className="text-black-500 mr-2" size={20} />
            <h2 className="font-bold text-lg">Filter Pencarian</h2>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Filter Tahun</h3>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isYearFilterEnabled}
                      onChange={() =>
                        setIsYearFilterEnabled(!isYearFilterEnabled)
                      }
                    />
                  }
                />
              </FormGroup>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="text"
                placeholder="Dari Tahun"
                className="border p-1 w-full rounded-md"
                value={fromYear}
                onChange={(e) => setFromYear(e.target.value)}
                disabled={!isYearFilterEnabled}
              />
            </div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Sampai Tahun"
                className="border p-1 w-full rounded-md"
                value={toYear}
                onChange={(e) => setToYear(e.target.value)}
                disabled={!isYearFilterEnabled}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <h3 className="font-semibold mr-4">Filter Program Studi</h3>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isProgramFilterEnabled}
                      onChange={() =>
                        setIsProgramFilterEnabled(!isProgramFilterEnabled)
                      }
                    />
                  }
                />
              </FormGroup>
            </div>
            <select
              className="border p-1 w-full rounded-md"
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              disabled={!isProgramFilterEnabled}
            >
              <option value="">Pilih Program Studi</option>
              <option value="Teknik Informatika">Teknik Informatika</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Manajemen">Desain Komunikasi Visual</option>
              <option value="Ilmu Hukum">Desain Produk</option>
              <option value="Fisioterapi">Humas</option>
              <option value="Fisioterapi">Jurnalistik</option>
              <option value="Fisioterapi">Ilmu Hukum</option>
              <option value="Fisioterapi">Broadcasting</option>
              <option value="Fisioterapi">Akutansi</option>
              <option value="Fisioterapi">Fisioterapi</option>
              <option value="Fisioterapi">Psikologi</option>
              <option value="Fisioterapi">Farmasi</option>
            </select>
          </div>
           <button
            className="mt-4 bg-blue-500 text-white p-2 rounded-md w-full"
            onClick={handleSearchSubmit}
          >
            Terapkan Filter
          </button>
        </aside>

        <section className="flex-grow p-4">
          <p className="mb-4">
            Menampilkan {alumni.length} hasil pencarian dalam 0.442 detik
          </p>
          {alumni.map((alumnus) => (
            <div
              key={alumnus.id}
              className="bg-white p-4 mb-4 rounded-md shadow-sm flex items-start cursor-pointer"
              onClick={() => handleAlumniClick(alumnus)}
            >
              <div className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <User className="text-gray-600" size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-xl">{alumnus.nama}</h3>
                <p>Nomor Induk Mahasiswa: {alumnus.nomor_induk_mahasiswa}</p>
                <p>Program Studi: {alumnus.Program_Studi?.name}</p>
                <p>Jenjang: {alumnus.jenjang}</p>
                <p>Tahun Masuk: {alumnus.tahun_masuk}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default AdminSearchAlumniPage;
