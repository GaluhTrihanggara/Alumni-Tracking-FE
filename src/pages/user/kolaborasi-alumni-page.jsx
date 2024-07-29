import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Bell, User, Edit, Send, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import profileImage from '../../assets/user.jpg';
import logo1 from "../../assets/alumni_tracking1.png";
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const KolaborasiAlumniPage = () => {
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const [alumniData, setAlumniData] = useState({
    name: "",
    studentId: "",
    major: "",
    phone: "",
    gender: "",
    faculty: "",
    degree: "",
    entryYear: "",
    currentJob: "",
    company: "",
    linkedin: "",
    twitter: "",
    facebook: ""
  });

  const initialAlumniData = {
    name: "",
    studentId: "",
    major: "",
    phone: "",
    gender: "",
    faculty: "",
    degree: "",
    entryYear: "",
    currentJob: "",
    company: "",
    linkedin: "",
    twitter: "",
    facebook: ""
  };

  const majors = ["Industrial Engineering", "Computer Science", "Electrical Engineering", "Mechanical Engineering"];
  const genders = ["Laki-Laki", "Perempuan"];
  const degrees = ["Sarjana", "Magister", "Doktor", "Diploma-1", "Diploma-2", "Diploma-3", "Diploma-4"];
  const years = Array.from({ length: 2030 - 1999 }, (_, i) => 2030 - i);

  const handleLogoClick = () => {
    navigate('/beranda');
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

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleChangePassword = () => {
    navigate('/change_password');
  };

  const handlePrivacyPolicy = () => {
    navigate('/privacy_policy');
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSend = () => {
    const requiredFields = [
      'name', 'studentId', 'major', 'phone', 'gender', 
      'faculty', 'degree', 'entryYear', 'currentJob', 'company'
    ];

    const isAnyFieldEmpty = requiredFields.some(field => !alumniData[field].trim());

    if (isAnyFieldEmpty) {
      toast.error('Data harus diisi terlebih dahulu.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      console.log("Sending data:", alumniData);
      setIsEditMode(false);
      toast.success('Data sudah dikirim dan menunggu persetujuan dari admin.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      // Reset the form data to initial state
      setAlumniData(initialAlumniData);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setAlumniData(initialAlumniData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlumniData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer/>
      <header className="bg-blue-500 p-4 flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
          <img src={logo1} alt="Alumni Tracking Logo" className="h-8 mr-2" />
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
            <img src={profileImage} alt="User Profile" className="w-full h-full object-cover" />
          </div>
          {isMenuOpen && (
            <div ref={menuRef} className="absolute right-10 top-6 mt-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dropdown-menu">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={handleProfile}>Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={handleChangePassword}>Change Password</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={handlePrivacyPolicy}>Privacy Policy</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={handleLogout}>Logout</a>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto mt-12 p-3">
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto">
          <div className="bg-blue-600 p-4 text-white text-lg font-semibold">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="w-7 h-8 mr-2" />
                Data Kolaborasi Alumni
              </div>
            </div>
            <div className="flex justify-center">
              {!isEditMode ? (
                <button onClick={handleEdit} className="bg-white text-blue-600 px-4 py-2 rounded-md flex items-center">
                  <Edit className="mr-2" size={18} />
                  Edit
                </button>
              ) : (
                <div className="flex space-x-4">
                  <button onClick={handleSend} className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center">
                    <Send className="mr-2" size={18} />
                    Kirim
                  </button>
                  <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center">
                    <X className="mr-2" size={18} />
                    Batal
                  </button>
                </div>
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
              <InfoField label="Nama" value={alumniData.name} name="name" isEditMode={isEditMode} onChange={handleInputChange} />
              <InfoField label="Nomor Induk Mahasiswa" value={alumniData.studentId} name="studentId" isEditMode={isEditMode} onChange={handleInputChange} />
              <InfoField 
                label="Program Studi" 
                value={alumniData.major} 
                name="major" 
                isEditMode={isEditMode} 
                onChange={handleInputChange}
                options={majors}
              />
              <InfoField label="Kontak Telephone" value={alumniData.phone} name="phone" isEditMode={isEditMode} onChange={handleInputChange} />
              <InfoField 
                label="Jenis Kelamin" 
                value={alumniData.gender} 
                name="gender" 
                isEditMode={isEditMode} 
                onChange={handleInputChange}
                options={genders}
              />
              <InfoField label="Perguruan Tinggi" value={alumniData.faculty} name="faculty" isEditMode={isEditMode} onChange={handleInputChange} />
              <InfoField 
                label="Jenjang" 
                value={alumniData.degree} 
                name="degree" 
                isEditMode={isEditMode} 
                onChange={handleInputChange}
                options={degrees}
              />
              <InfoField 
                label="Tahun Masuk" 
                value={alumniData.entryYear} 
                name="entryYear" 
                isEditMode={isEditMode} 
                onChange={handleInputChange}
                options={years}
              />
              <InfoField label="Pekerjaan Saat Ini" value={alumniData.currentJob} name="currentJob" isEditMode={isEditMode} onChange={handleInputChange} />
              <InfoField label="Nama Perusahaan" value={alumniData.company} name="company" isEditMode={isEditMode} onChange={handleInputChange} />
                <div className="col-span-2">
                <SocialMediaField label="LinkedIn" value={alumniData.linkedin} name="linkedin" isEditMode={isEditMode} onChange={handleInputChange} icon={<FaLinkedin />} />
                <SocialMediaField label="Twitter" value={alumniData.twitter} name="twitter" isEditMode={isEditMode} onChange={handleInputChange} icon={<FaTwitter />} />
                <SocialMediaField label="Facebook" value={alumniData.facebook} name="facebook" isEditMode={isEditMode} onChange={handleInputChange} icon={<FaFacebook />} />
                </div>
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const InfoField = ({ label, value, name, isEditMode, onChange, options }) => (
  <div className="mb-4">
    <div className="text-sm font-medium text-gray-500">{label}</div>
    {isEditMode ? (
      options ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Pilih {label}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      )
    ) : (
      <div className="mt-1 text-gray-900">{value || "N/A"}</div>
    )}
  </div>
);

InfoField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array
};

const SocialMediaField = ({ label, value, name, isEditMode, onChange, icon }) => (
  <div className="mb-4">
    <div className="text-sm font-medium text-gray-500 flex items-center">
      {icon}
      <span className="ml-2">{label}</span>
    </div>
    {isEditMode ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    ) : (
      <div className="mt-1 text-gray-900">{value || "N/A"}</div>
    )}
  </div>
);

SocialMediaField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
};

export default KolaborasiAlumniPage;