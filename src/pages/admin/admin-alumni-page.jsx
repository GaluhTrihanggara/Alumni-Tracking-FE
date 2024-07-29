import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { Bell, User, Edit, Save, XCircle } from "lucide-react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import profileImage from '../../assets/user.jpg';
import logo1 from "../../assets/alumni_tracking1.png";
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlumniPageAdmin = () => {
  const location = useLocation();
  const menuRef = useRef(null);
  const { nameSlug } = useParams();
  const [newSubmissionsCount, setNewSubmissionsCount] = useState(0);
  const profileRef = useRef(null);
  const lastToastTime = useRef(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [alumniData, setAlumniData] = useState(location.state?.alumniData || {
    name: nameSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    studentId: "",
    major: "",
    phone: "",
    password: "",
    gender: "",
    faculty: "",
    degree: "",
    entryYear: "",
    currentJob: "",
    company: "",
    linkedin: "#",
    twitter: "#",
    facebook: "#"
  });

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/beranda-admin');
  };

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
    // Load the submission count from localStorage
    const storedCount = localStorage.getItem('submissionsCount');
    setNewSubmissionsCount(storedCount ? parseInt(storedCount, 10) : 0);
  }, []);

  const toggleMenu = (e) => {
    if (e) e.stopPropagation();
    setIsMenuOpen(prevState => !prevState);
  };

    const handleBellClick = () => {
    const now = Date.now();
    const timeSinceLastToast = now - lastToastTime.current;

    // Only show toast if it's been more than 3 seconds since the last one
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
        toast.info('Tidak ada data pengajuan', {
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
    localStorage.removeItem('user');
    navigate('/login-admin');
  };

  const handleProfile = (e) => {
    e.preventDefault();
    navigate('/admin-profile');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    navigate('/admin-password');
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    navigate('/submission');
  }

  const hanclePrivacyPolicy = (e) => {
    e.preventDefault();
    navigate('/privacy_policy');
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
  console.log("Profile updated:", alumniData);
  toast.success("Data berhasil disimpan", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
    setIsEditMode(false);
  };

  const handleCancel = () => {
    // Reset to original data if needed
    setIsEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumniData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const programStudiOptions = [
    "Teknik Informatika",
    "Sistem Informasi",
    "Ilmu Komputer",
    "Teknik Elektro",
    // Add other options as needed
  ];

  const genderOptions = [
    "Laki-laki",
    "Perempuan"
  ];

  const facultyOptions = [
    "Fakultas Ilmu Komputer",
    "Fakultas Teknik",
    "Fakultas Ekonomi",
    "Fakultas Hukum",
    // Add other options as needed
  ];

  const degreeOptions = [
    "Sarjana",
    "Magister",
    "Doktor",
    "Diploma-1",
    "Diploma-2",
    "Diploma-3",
    "Diploma-4"
  ];

  const entryYearOptions = Array.from({ length: 2030 - 1999 }, (_, i) => 2030 - i);

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />
      <header className="bg-blue-500 p-4 flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleLogoClick}
        >
          <img src={logo1} alt="Alumni Tracking Logo" className="h-8 mr-2" />
        </div>
        <div className="flex items-center">
          <div className="relative">
          <Bell 
          className="text-white mr-8 mt-1 cursor-pointer" 
          size={24} 
          onClick={handleBellClick} // Add this onClick handler
        />
        {newSubmissionsCount > 0 && (
            <div className="absolute bottom-3.5 right-3 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {newSubmissionsCount}
            </div>
          )}
        </div>
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
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={handleChangePassword}>
                  Change Password
                </a>
                 <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={handleSubmission}>
                Submissions 
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

      <main className="container mx-auto mt-12 p-3">
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto">
          <div className="bg-blue-600 p-2 text-white text-lg font-semibold flex items-center">
            <User className="w-7 h-8 mr-2 ml-2" />
            Data Alumni: {alumniData.name}
            <div className="ml-auto flex space-x-2">
              {!isEditMode ? (
                <button onClick={handleEdit} className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-md">
                  <Edit className="mr-2" size={16} />
                  Edit
                </button>
              ) : (
                <>
                  <button onClick={handleSave} className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md mr-2">
                    <Save className="mr-2" size={16} />
                    Save
                  </button>
                  <button onClick={handleCancel} className="flex items-center px-2 py-2 bg-red-500 text-white rounded-md">
                    <XCircle className="mr-2" size={16} />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-1">
              <div className="bg-gray-300 w-40 h-40 flex items-center justify-center mx-auto mt-10 shadow-md">
                <User className="w-24 h-24 text-gray-700" />
              </div>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-4">
              <InfoField label="Nama" value={alumniData.name} isEditMode={isEditMode} name="name" handleChange={handleChange} />
              <InfoField label="Nomor Induk Mahasiswa" value={alumniData.studentId} isEditMode={isEditMode} name="studentId" handleChange={handleChange} />
              <InfoField label="Program Studi" value={alumniData.major} isEditMode={isEditMode} isDropdown name="major" handleChange={handleChange} options={programStudiOptions} />
              <InfoField label="Kontak Telephone" value={alumniData.phone} isEditMode={isEditMode} name="phone" handleChange={handleChange} />
              <InfoField label="Password" value={alumniData.password} type="password" isEditMode={isEditMode} name="password" handleChange={handleChange} />
              <InfoField label="Jenis Kelamin" value={alumniData.gender} isEditMode={isEditMode} isDropdown name="gender" handleChange={handleChange} options={genderOptions} />
              <InfoField label="Perguruan Tinggi" value={alumniData.faculty} isEditMode={isEditMode} isDropdown name="faculty" handleChange={handleChange} options={facultyOptions} />
              <InfoField label="Jenjang" value={alumniData.degree} isEditMode={isEditMode} isDropdown name="degree" handleChange={handleChange} options={degreeOptions} />
              <InfoField label="Tahun Masuk" value={alumniData.entryYear} isEditMode={isEditMode} isDropdown name="entryYear" handleChange={handleChange} options={entryYearOptions} />
              <InfoField label="Pekerjaan Saat Ini" value={alumniData.currentJob} isEditMode={isEditMode} name="currentJob" handleChange={handleChange} />
              <InfoField label="Nama Perusahaan" value={alumniData.company} isEditMode={isEditMode} name="company" handleChange={handleChange} />
              <InfoField label="Media Sosial" value={
                <div className="flex space-x-2">
                  <SocialLink href={alumniData.linkedin} icon={<FaLinkedin />} />
                  <SocialLink href={alumniData.twitter} icon={<FaTwitter />} />
                  <SocialLink href={alumniData.facebook} icon={<FaFacebook />} />
                </div>
              } />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const InfoField = ({ label, value, type = "text", isEditMode, name, handleChange, isDropdown, options }) => (
  <div className="mb-4">
    <div className="text-sm font-medium text-gray-500">{label}</div>
    <div className={`mt-1 ${type === "password" ? "text-sm text-gray-900" : "text-gray-900"}`}>
      {isEditMode ? (
        isDropdown ? (
          <select 
            name={name} 
            value={value} 
            onChange={handleChange} 
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input 
            type={type} 
            name={name} 
            value={value} 
            onChange={handleChange} 
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        )
      ) : (
        type === "password" ? "••••••••" : value
      )}
    </div>
  </div>
);

InfoField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  type: PropTypes.string,
  isEditMode: PropTypes.bool,
  name: PropTypes.string,
  handleChange: PropTypes.func,
  isDropdown: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
};

const SocialLink = ({ href, icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
    {icon}
  </a>
);

SocialLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired
};

export default AlumniPageAdmin;
