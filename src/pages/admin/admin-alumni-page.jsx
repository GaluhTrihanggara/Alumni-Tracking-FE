import PropTypes from "prop-types";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Bell,
  User,
  Edit,
  Save,
  XCircle,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import profileImage from "../../assets/user.jpg";
import logo1 from "../../assets/alumni_tracking1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AlumniPageAdmin = () => {
  const [programStudis, setProgramStudis] = useState([]);
  const menuRef = useRef(null);
  const { nameSlug } = useParams();
  const [newSubmissionsCount, setNewSubmissionsCount] = useState(0);
  const profileRef = useRef(null);
  const lastToastTime = useRef(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [alumniData, setAlumniData] = useState(null);
  const [mediaSosialPlatforms, setMediaSosialPlatforms] = useState([]);
  const [tempMediaSosial, setTempMediaSosial] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch alumni data if not provided via location state
     const fetchAlumniData = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:3000/api/admin/alumni/${nameSlug}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch alumni data');
      }
      const data = await response.json();
      setAlumniData(data);
      setTempMediaSosial(data.Media_Sosial_Alumnis || []);
    } catch (error) {
      console.error('Error fetching alumni data:', error);
      toast.error('Failed to load alumni data');
    } finally {
      setIsLoading(false);
    }
  }, [nameSlug]);

  const fetchProgramStudis = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        "http://localhost:3000/api/admin/program-studi",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch program studis");
      }
      const data = await response.json();
      setProgramStudis(data);
    } catch (error) {
      console.error("Error fetching program studis:", error);
      toast.error("Gagal mengambil data program studi");
    }
  };

  const fetchMediaSosialPlatforms = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        "http://localhost:3000/api/admin/media-sosial/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setMediaSosialPlatforms(data);
    } catch (error) {
      console.error("Error fetching media sosial platforms:", error);
    }
  };
  
  useEffect(() => {
    fetchAlumniData();
    fetchProgramStudis();
    fetchMediaSosialPlatforms();
  }, [fetchAlumniData]);
  

   const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setTempMediaSosial(alumniData.Media_Sosial_Alumnis || []);
  };

  const handleMediaSosialChange = (index, field, value) => {
    const updatedMediaSosial = [...tempMediaSosial];
    updatedMediaSosial[index] = { ...updatedMediaSosial[index], [field]: value };
    setTempMediaSosial(updatedMediaSosial);
  };

  const addMediaSosial = () => {
    if (tempMediaSosial.length < 5) {
      setTempMediaSosial([...tempMediaSosial, { media_sosial_id: "", link: "" }]);
    } else {
      toast.error("Anda hanya dapat menambahkan maksimal 5 media sosial.");
    }
  };

  const removeMediaSosial = (index) => {
    const updatedMediaSosial = tempMediaSosial.filter((_, i) => i !== index);
    setTempMediaSosial(updatedMediaSosial);
  };

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
    // Load the submission count from localStorage
    const storedCount = localStorage.getItem("submissionsCount");
    setNewSubmissionsCount(storedCount ? parseInt(storedCount, 10) : 0);
  }, []);

  const toggleMenu = (e) => {
    if (e) e.stopPropagation();
    setIsMenuOpen((prevState) => !prevState);
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

  const handleLogoClick = () => {
    navigate("/beranda-admin");
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

  const handleSubmission = (e) => {
    e.preventDefault();
    navigate("/admin-submission");
  };

  const hanclePrivacyPolicy = (e) => {
    e.preventDefault();
    navigate("/privacy_policy");
  };

  // Save alumni data
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:3000/api/admin/alumni/${alumniData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...alumniData,
          Media_Sosial_Alumnis: tempMediaSosial
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update alumni data');
      }

      const updatedData = await response.json();
      setAlumniData(updatedData);
      setIsEditMode(false);
      toast.success('Alumni data updated successfully');
    } catch (error) {
      console.error('Error updating alumni data:', error);
      toast.error('Failed to update alumni data');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumniData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!alumniData) {
    return <div>No alumni data found.</div>;
  }

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
              onClick={handleBellClick}
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
            style={{
              border: "2px solid white",
              position: "relative",
              zIndex: 1000,
            }}
          >
            <img
              src={profileImage}
              alt="Galuh Trihanggara"
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
                    alt="Galuh Trihanggara"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <span>Galuh Trihanggara</span>
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
                  onClick={handleSubmission}
                >
                  Submissions
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={hanclePrivacyPolicy}
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

      <main className="container mx-auto mt-12 p-3">
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto">
          <div className="bg-blue-600 p-2 text-white text-lg font-semibold flex items-center">
            <User className="w-7 h-8 mr-2 ml-2" />
            Data Alumni: {alumniData.nama}
            <div className="ml-auto flex space-x-2">
              {!isEditMode ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-md"
                >
                  <Edit className="mr-2" size={16} />
                  Edit
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md mr-2"
                  >
                    <Save className="mr-2" size={16} />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center px-2 py-2 bg-red-500 text-white rounded-md"
                  >
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
              <InfoField
                label="Nama"
                value={alumniData.nama}
                isEditMode={isEditMode}
                name="nama"
                handleChange={handleChange}
              />
              <InfoField
                label="Nomor Induk Mahasiswa"
                value={alumniData.nomor_induk_mahasiswa}
                isEditMode={isEditMode}
                name="nomor_induk_mahasiswa"
                handleChange={handleChange}
              />
              <InfoField
                label="Program Studi"
                value={alumniData.program_studi_id}
                isEditMode={isEditMode}
                isDropdown
                name="program_studi_id"
                handleChange={handleChange}
                options={programStudis}
                displayOption={(option) => option.name}
                displayValue={(value) =>
                  programStudis.find((ps) => ps.id === value)?.name || ""
                }
              />
              <InfoField
                label="Kontak Telephone"
                value={alumniData.kontak_telephone}
                isEditMode={isEditMode}
                name="kontak_telephone"
                handleChange={handleChange}
              />
              <InfoField
                label="Jenis Kelamin"
                value={alumniData.jenis_kelamin}
                isEditMode={isEditMode}
                isDropdown
                name="jenis_kelamin"
                handleChange={handleChange}
                options={["Laki-laki", "Perempuan"]}
              />
              <InfoField
                label="Perguruan Tinggi"
                value={alumniData.perguruan_tinggi}
                isEditMode={isEditMode}
                name="perguruan_tinggi"
                handleChange={handleChange}
              />
              <InfoField
                label="Jenjang"
                value={alumniData.jenjang}
                isEditMode={isEditMode}
                isDropdown
                name="jenjang"
                handleChange={handleChange}
                options={["Sarjana", "Magister", "Doktor", "Diploma-1", "Diploma-2", "Diploma-3", "Diploma-4"]}
              />
              <InfoField
                label="Tahun Masuk"
                value={alumniData.tahun_masuk}
                isEditMode={isEditMode}
                isDropdown
                name="tahun_masuk"
                handleChange={handleChange}
                options={Array.from({ length: 2030 - 1999 }, (_, i) => 2030 - i)}
              />
              <InfoField
                label="Pekerjaan Saat Ini"
                value={alumniData.pekerjaan_saat_ini}
                isEditMode={isEditMode}
                name="pekerjaan_saat_ini"
                handleChange={handleChange}
              />
              <InfoField
                label="Nama Perusahaan"
                value={alumniData.nama_perusahaan}
                isEditMode={isEditMode}
                name="nama_perusahaan"
                handleChange={handleChange}
              />
              <InfoField
              label="Media Sosial"
              value={
                isEditMode ? (
                  <div>
                    {tempMediaSosial.map((media, index) => (
                      <div key={index} className="flex space-x-2 mt-2">
                        <select
                          value={media.media_sosial_id}
                          onChange={(e) =>
                            handleMediaSosialChange(
                              index,
                              "media_sosial_id",
                              e.target.value
                            )
                          }
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
                          onChange={(e) =>
                            handleMediaSosialChange(
                              index,
                              "link",
                              e.target.value
                            )
                          }
                          placeholder="Link Media Sosial"
                          className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <button
                          type="button"
                          onClick={() => removeMediaSosial(index)}
                          className="mt-1 p-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addMediaSosial}
                      disabled={tempMediaSosial.length >= 5}
                      className="mt-2 flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      <PlusCircle size={16} className="mr-2" />
                      Tambah Media Sosial
                    </button>
                  </div>
                ) : (
                  <div>
                    {alumniData.Media_Sosial_Alumnis &&
                    alumniData.Media_Sosial_Alumnis.length > 0 ? (
                      alumniData.Media_Sosial_Alumnis.map((media, index) => (
                        <div key={index} className="mt-2">
                          <p>
                            {media.Media_Sosial?.name || "Unknown Platform"}:{" "}
                            <a
                              href={media.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {media.link}
                            </a>
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>Belum ada media sosial yang ditambahkan</p>
                      )}
                    </div>
                  )
                }
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};


const InfoField = ({
  label,
  value,
  type = "text",
  isEditMode,
  name,
  handleChange,
  isDropdown,
  options,
  displayOption,
  displayValue,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div
      className={`mt-1 ${
        type === "password" ? "text-sm text-gray-900" : "text-gray-900"
      }`}
    >
      {isEditMode ? (
        isDropdown ? (
          <select
            name={name}
            value={value || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Pilih {label}</option>
            {options.map((option) => (
              <option key={option.id || option} value={option.id || option}>
                {displayOption ? displayOption(option) : option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        )
      ) : displayValue ? (
        displayValue(value)
      ) : (
        value
      )}
    </div>
  </div>
);

InfoField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  isEditMode: PropTypes.bool,
  name: PropTypes.string,
  handleChange: PropTypes.func,
  isDropdown: PropTypes.bool,
  options: PropTypes.array,
  displayOption: PropTypes.func,
  displayValue: PropTypes.func,
};

export default AlumniPageAdmin;