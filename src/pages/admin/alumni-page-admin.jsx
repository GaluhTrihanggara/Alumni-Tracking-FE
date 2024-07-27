import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { Bell, User } from "lucide-react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import profileImage from '../../assets/user.jpg';
import logo1 from "../../assets/alumni_tracking1.png";
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const AlumniPageAdmin = () => {
  const location = useLocation();
  const menuRef = useRef(null);
  const { nameSlug } = useParams();
  const profileRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const alumniData = location.state?.alumniData || {
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
  };

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

  const hanclePrivacyPolicy = (e) => {
    e.preventDefault();
    navigate('/privacy_policy');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 p-4 flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleLogoClick}
        >
          <img src={logo1} alt="Alumni Tracking Logo" className="h-8 mr-2" />
        </div>
        <div className="flex items-center">
          <Bell className="text-white mr-8" size={24} />
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
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-1">
              <div className="bg-gray-300 w-40 h-40 flex items-center justify-center mx-auto mt-10 shadow-md">
                <User className="w-24 h-24 text-gray-700" />
              </div>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-4">
              <InfoField label="Nama" value={alumniData.name} />
              <InfoField label="Nomor Induk Mahasiswa" value={alumniData.studentId} />
              <InfoField label="Program Studi" value={alumniData.major} />
              <InfoField label="Kontak Telephone" value={alumniData.phone} />
              <InfoField label="Password" value={alumniData.password} type="password" />
              <InfoField label="Jenis Kelamin" value={alumniData.gender} />
              <InfoField label="Perguruan Tinggi" value={alumniData.faculty} />
              <InfoField label="Jenjang" value={alumniData.degree} />
              <InfoField label="Tahun Masuk" value={alumniData.entryYear} />
              <InfoField label="Pekerjaan Saat Ini" value={alumniData.currentJob} />
              <InfoField label="Nama Perusahaan" value={alumniData.company} />
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

const InfoField = ({ label, value, type = "text" }) => (
  <div className="mb-4">
    <div className="text-sm font-medium text-gray-500">{label}</div>
    <div className={`mt-1 ${type === "password" ? "text-sm text-gray-900" : "text-gray-900"}`}>
      {type === "password" ? "••••••••" : value}
    </div>
  </div>
);

InfoField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  type: PropTypes.string
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