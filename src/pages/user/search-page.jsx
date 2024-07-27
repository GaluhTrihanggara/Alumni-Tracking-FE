import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User } from "lucide-react";
import logo1 from "../../assets/alumni_tracking1.png";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import profileImage from '../../assets/user.jpg';
import { MdFilterListAlt } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AlumniSearchPage() {
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlumni] = useState(null);
  const [isProgramFilterEnabled, setIsProgramFilterEnabled] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [isYearFilterEnabled, setIsYearFilterEnabled] = useState(false);
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const navigate = useNavigate();

  const dummyAlumni = [
    {
      id: 1,
      name: "Dedy Setiady",
      faculty: "Fakultas Ilmu Komputer",
      major: "Teknik Informatika",
      studentId: "2018080105",
      degree: "Sarjana",
      phone: "081234567890",
      password: "••••••••",
      gender: "Laki-Laki",
      university: "Universitas Esa Unggul",
      entryYear: "2018",
      currentJob: "Software Engineer",
      company: "Tech Innovators Inc.",
      linkedin: "https://www.linkedin.com/in/dedy-setiady",
      twitter: "https://twitter.com/dedysetiady",
      facebook: "https://www.facebook.com/dedysetiady"
    },
    {
      id: 2,
      name: "Deni Setiadi",
      faculty: "Fakultas Ekonomi dan Bisnis",
      major: "Manajemen",
      studentId: "2019040126",
      degree: "Sarjana",
      phone: "081234567890",
      password: "••••••••",
      gender: "Laki-Laki",
      university: "Universitas Esa Unggul",
      entryYear: "2019",
      currentJob: "Software Engineer",
      company: "Tech Innovators Inc.",
      linkedin: "https://www.linkedin.com/in/dedy-setiady",
      twitter: "https://twitter.com/dedysetiady",
      facebook: "https://www.facebook.com/dedysetiady"
    },
    {
      id: 3,
      name: "Dedy Gunandar",
      faculty: "Fakultas Hukum",
      major: "Ilmu Hukum",
      studentId: "2020030504",
      degree: "Sarjana",
      phone: "081234567890",
      password: "••••••••",
      gender: "Laki-Laki",
      university: "Universitas Esa Unggul",
      entryYear: "2017",
      currentJob: "Software Engineer",
      company: "Tech Innovators Inc.",
      linkedin: "https://www.linkedin.com/in/dedy-setiady",
      twitter: "https://twitter.com/dedysetiady",
      facebook: "https://www.facebook.com/dedysetiady"
    },
    {
      id: 4,
      name: "Dedy Kurniawan",
      faculty: "Fakultas Ilmu Komputer",
      major: "Teknik Informatika",
      studentId: "2021040133",
      degree: "Sarjana",
      phone: "081234567890",
      password: "••••••••",
      gender: "Laki-Laki",
      university: "Universitas Esa Unggul",
      entryYear: "2017",
      currentJob: "Software Engineer",
      company: "Tech Innovators Inc.",
      linkedin: "https://www.linkedin.com/in/dedy-setiady",
      twitter: "https://twitter.com/dedysetiady",
      facebook: "https://www.facebook.com/dedysetiady"
    },
    {
      id: 5,
      name: "Teddy Setiadi",
      faculty: "Fakultas Ilmu Komputer",
      major: "Teknik Informatika",
      studentId: "2022040134",
      degree: "Sarjana",
      phone: "081234567890",
      password: "••••••••",
      gender: "Laki-Laki",
      university: "Universitas Esa Unggul",
      entryYear: "2019",
      currentJob: "Software Engineer",
      company: "Tech Innovators Inc.",
      linkedin: "https://www.linkedin.com/in/dedy-setiady",
      twitter: "https://twitter.com/dedysetiady",
      facebook: "https://www.facebook.com/dedysetiady"
    },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target) &&
          profileRef.current && !profileRef.current.contains(event.target)) {
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
      profileElement.addEventListener('click', toggleMenu);
      return () => profileElement.removeEventListener('click', toggleMenu);
    }
  }, []);

  const toggleMenu = (e) => {
    if (e) e.stopPropagation();
    setIsMenuOpen(prevState => !prevState);
  };

  const handleBellClick = () => {
    toast.info('Data alumni sudah terbaru tanggal 12 Februari 2024', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleProfile = (e) => {
    e.preventDefault();
    navigate('/profile');
  };

  const handleKolaborasiAlumni = (e) => {
    e.preventDefault();
    navigate('/kolaborasi');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    navigate('/change_password');
  };

  const hanclePrivacyPolicy = (e) => {
    e.preventDefault();
    navigate('/privacy_policy');
  };

  const handleLogoClick = () => {
    navigate('/beranda');
  };

  const handleAlumniClick = (alumni) => {
  const nameSlug = alumni.name.toLowerCase().replace(/ /g, '-');
  navigate(`/alumni/${nameSlug}`, { state: { alumniData: alumni } });
};

  const filteredAlumni = dummyAlumni.filter((alumni) => {
  const matchesSearch = alumni.name.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesProgram = !isProgramFilterEnabled || alumni.major === selectedProgram;
  
  const alumniYear = parseInt(alumni.studentId.substring(0, 4));
  const matchesYear = !isYearFilterEnabled || (
    (fromYear === "" || alumniYear >= parseInt(fromYear)) &&
    (toYear === "" || alumniYear <= parseInt(toYear))
  );
  return matchesSearch && matchesProgram && matchesYear;
});

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
        <div className="flex-grow mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Dedy Setiady"
              className="w-2/3 p-2 pl-12 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <div className="flex items-center">
          <Bell 
          className="text-white mr-6 cursor-pointer" 
          size={24} 
          onClick={handleBellClick} // Add this onClick handler
        />
          <div 
            ref={profileRef}
            className="profile-circle cursor-pointer w-10 h-10 rounded-full flex items-center justify-center overflow-hidden mr-2"
            onClick={toggleMenu}
            style={{ border: '2px solid white', position: 'relative', zIndex: 1000 }}
          >
            <img src={profileImage} alt="Galuh Trihanggara" className="w-full h-full object-cover" />
          </div>
          {isMenuOpen && (
            <div ref={menuRef} className="absolute right-10 top-6 mt-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dropdown-menu">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <div className="px-4 py-2 text-sm text-gray-700 border-b flex items-center">
                  <img src={profileImage} alt="Galuh Trihanggara" className="w-10 h-10 rounded-full mr-2" />
                  <span>Galuh Trihanggara</span>
                </div>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={handleProfile}>
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={handleKolaborasiAlumni}> 
                Kolaborasi Alumni
              </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={handleChangePassword}>
                  Change Password
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={hanclePrivacyPolicy}>
                  Privacy Policy
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={handleLogout}>
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
                      onChange={() => setIsYearFilterEnabled(!isYearFilterEnabled)}
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
                      onChange={() => setIsProgramFilterEnabled(!isProgramFilterEnabled)}
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
              <option value="Manajemen">Manajemen</option>
              <option value="Ilmu Hukum">Ilmu Hukum</option>
              <option value="Fisioterapi">Fisioterapi</option>
            </select>
          </div>
        </aside>

        <section className="flex-grow p-4">
      <p className="mb-4">
        Menampilkan {filteredAlumni.length} hasil pencarian dalam 0.442 detik
      </p>
      {filteredAlumni.map((alumni) => (
        <div
          key={alumni.id}
          className={`bg-white p-4 mb-4 rounded-md shadow-sm flex items-start cursor-pointer ${
            selectedAlumni === alumni.id ? "border-2 border-blue-500" : ""
          }`}
          onClick={() => handleAlumniClick(alumni)}
        >
          <div className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center mr-4">
            <User className="text-gray-600" size={24} />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-xl">{alumni.name}</h3>
            <p>{alumni.faculty}</p>
            <p>{alumni.major}</p>
            <p>{alumni.studentId}</p>
            <p>{alumni.degree}</p>
          </div>
        </div>
      ))}
    </section>
    </main>
    </div>
  );
}

export default AlumniSearchPage;