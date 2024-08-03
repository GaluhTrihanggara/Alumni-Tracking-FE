import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Bell, User, Edit, Send, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import profileImage from '../../assets/user.jpg';
import logo1 from "../../assets/alumni_tracking1.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const KolaborasiAlumniPage = () => {
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    nomor_induk_mahasiswa: "",
    program_studi_id: "",
    kontak_telephone: "",
    jenis_kelamin: "",
    perguruan_tinggi: "",
    jenjang: "",
    tahun_masuk: "",
    status_mahasiswa_saat_ini: "",
    pekerjaan_saat_ini: "",
    nama_perusahaan: "",
    mediaSosial: []
  });

  const [programStudis, setProgramStudis] = useState([]);
  const [mediaSosialPlatforms, setMediaSosialPlatforms] = useState([]);

  useEffect(() => {
    fetchProgramStudis();
    fetchMediaSosialPlatforms();
  }, []);

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

  const fetchProgramStudis = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/program-studi", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProgramStudis(data);
    } catch (error) {
      console.error("Error fetching program studis:", error);
    }
  };

  const fetchMediaSosialPlatforms = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/media-sosial", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setMediaSosialPlatforms(data);
    } catch (error) {
      console.error("Error fetching media sosial platforms:", error);
    }
  };

  const handleLogoClick = () => {
    navigate('/beranda');
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleMediaSosialChange = (index, field, value) => {
    const updatedMediaSosial = [...formData.mediaSosial];
    if (!updatedMediaSosial[index]) {
      updatedMediaSosial[index] = {};
    }
    updatedMediaSosial[index][field] = value;
    setFormData(prevData => ({
      ...prevData,
      mediaSosial: updatedMediaSosial
    }));
  };

  const addMediaSosial = () => {
    setFormData(prevData => ({
      ...prevData,
      mediaSosial: [...prevData.mediaSosial, { media_sosial_id: "", link: "" }]
    }));
  };

  const removeMediaSosial = (index) => {
    setFormData(prevData => ({
      ...prevData,
      mediaSosial: prevData.mediaSosial.filter((_, i) => i !== index)
    }));
  };

  const handleSend = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/kolaborasi-alumni/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Pengajuan data alumni baru berhasil dikirim");
        setIsEditMode(false);
        setFormData({
          nama: "",
          nomor_induk_mahasiswa: "",
          kontak_telephone: "",
          jenis_kelamin: "",
          perguruan_tinggi: "",
          jenjang: "",
          tahun_masuk: "",
          status_mahasiswa_saat_ini: "",
          pekerjaan_saat_ini: "",
          nama_perusahaan: "",
          program_studi_id: "",
          mediaSosial: []
        });
      } else {
        toast.error("Gagal mengirim pengajuan data alumni baru");
      }
    } catch (error) {
      console.error("Error submitting new alumni data:", error);
      toast.error("Terjadi kesalahan saat mengirim pengajuan data alumni baru");
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setFormData({
      nama: "",
      nomor_induk_mahasiswa: "",
      kontak_telephone: "",
      jenis_kelamin: "",
      perguruan_tinggi: "",
      jenjang: "",
      tahun_masuk: "",
      status_mahasiswa_saat_ini: "",
      pekerjaan_saat_ini: "",
      nama_perusahaan: "",
      program_studi_id: "",
      mediaSosial: []
    });
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
            onClick={handleBellClick}
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
              <InfoField label="Nama" value={formData.nama} name="nama" isEditMode={isEditMode} onChange={handleInputChange} />
              <InfoField label="Nomor Induk Mahasiswa" value={formData.nomor_induk_mahasiswa} name="nomor_induk_mahasiswa" isEditMode={isEditMode} onChange={handleInputChange} />
              <InfoField 
                label="Program Studi" 
                value={formData.program_studi_id} 
                name="program_studi_id" 
                isEditMode={isEditMode} 
                onChange={handleInputChange}
                options={programStudis.map(ps => ({ value: ps.id, label: ps.name }))}
              />
              <InfoField label="Kontak Telephone" value={formData.kontak_telephone} name="kontak_telephone" isEditMode={isEditMode} onChange={handleInputChange} />
              <InfoField 
                label="Jenis Kelamin" 
                value={formData.jenis_kelamin} 
                name="jenis_kelamin" 
                isEditMode={isEditMode} 
                onChange={handleInputChange}
                options={[
                  { value: "laki-laki", label: "Laki-laki" },
                  { value: "perempuan", label: "Perempuan" }
                ]}
              />
              <InfoField label="Perguruan Tinggi" value={formData.perguruan_tinggi} name="perguruan_tinggi" isEditMode={isEditMode} onChange={handleInputChange} />
              <InfoField 
                label="Jenjang" 
                value={formData.jenjang} 
                name="jenjang" 
                isEditMode={isEditMode} 
                onChange={handleInputChange}
                options={[
                  { value: "Sarjana", label: "Sarjana" },
                  { value: "Magister", label: "Magister" },
                  { value: "Doktor", label: "Doktor" },
                  { value: "Diploma-1", label: "Diploma-1" },
                  { value: "Diploma-2", label: "Diploma-2" },
                  { value: "Diploma-3", label: "Diploma-3" },
                  { value: "Diploma-4", label: "Diploma-4" },
                ]}
              />
              <InfoField 
                label="Tahun Masuk" 
                value={formData.tahun_masuk} 
                name="tahun_masuk" 
                isEditMode={isEditMode} 
                onChange={handleInputChange}
                options={Array.from({ length: 2030 - 1999 }, (_, i) => ({ value: (2030 - i).toString(), label: (2030 - i).toString() }))}
              />
              <InfoField label="Status Mahasiswa Saat Ini" value={formData.status_mahasiswa_saat_ini} name="status_mahasiswa_saat_ini" isEditMode={isEditMode} onChange={handleInputChange} />
              <InfoField label="Pekerjaan Saat Ini" value={formData.pekerjaan_saat_ini} name="pekerjaan_saat_ini" isEditMode={isEditMode} onChange={handleInputChange} />
              <InfoField label="Nama Perusahaan" value={formData.nama_perusahaan} name="nama_perusahaan" isEditMode={isEditMode} onChange={handleInputChange} />
              {isEditMode && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Media Sosial</label>
                  {formData.mediaSosial.map((media, index) => (
                    <div key={index} className="flex space-x-2 mt-2">
                      <select
                        value={media.media_sosial_id}
                        onChange={(e) => handleMediaSosialChange(index, "media_sosial_id", e.target.value)}
                        className="mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      >
                        <option value="">Pilih Platform</option>
                        {mediaSosialPlatforms.map((platform) => (
                          <option key={platform.id} value={platform.id}>
                            {platform.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={media.link}
                        onChange={(e) => handleMediaSosialChange(index, "link", e.target.value)}
                        placeholder="Link Media Sosial"
                        className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() => removeMediaSosial(index)}
                        className="mt-1 px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addMediaSosial}
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Tambah Media Sosial
                  </button>
                </div>
              )}
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
            <option key={index} value={option.value}>{option.label}</option>
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
      <div className="mt-1 text-gray-900">{value || ""}</div>
    )}
  </div>
);

InfoField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
};

export default KolaborasiAlumniPage;