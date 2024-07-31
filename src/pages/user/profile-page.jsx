import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [programStudis, setProgramStudis] = useState([]);
  const [mediaSosialPlatforms, setMediaSosialPlatforms] = useState([]);
  const [tempMediaSosial, setTempMediaSosial] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchProgramStudis();
    fetchMediaSosialPlatforms();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch("http://localhost:3000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setProfile(data);
        setTempMediaSosial(data.Media_Sosial_Alumnis || []);
        console.log("Profile data:", data);
      } else {
        console.error("Failed to fetch profile:", data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

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

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleMediaSosialChange = (index, field, value) => {
    const updatedMediaSosial = [...tempMediaSosial];
    if (!updatedMediaSosial[index]) {
      updatedMediaSosial[index] = {};
    }
    updatedMediaSosial[index][field] = value;
    setTempMediaSosial(updatedMediaSosial);
  };

  const addMediaSosial = () => {
    if (tempMediaSosial.length < 5) {
      setTempMediaSosial([
        ...tempMediaSosial,
        { media_sosial_id: "", link: "" },
      ]);
    } else {
      toast.error("Anda hanya dapat menambahkan maksimal 5 media sosial.");
    }
  };

  const removeMediaSosial = (index) => {
    const updatedMediaSosial = tempMediaSosial.filter((_, i) => i !== index);
    setTempMediaSosial(updatedMediaSosial);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...profile,
          program_studi_id: profile.program_studi_id,
          Media_Sosial_Alumnis: tempMediaSosial,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data);
        setTempMediaSosial(data.Media_Sosial_Alumnis || []);
        toast.success("Data berhasil disimpan", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsEditing(false);
      } else {
        console.error("Failed to save profile:", data);
        toast.error("Gagal menyimpan data");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTempMediaSosial(profile.Media_Sosial_Alumnis || []);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempMediaSosial(profile.Media_Sosial_Alumnis || []);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <ToastContainer />
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {isEditing ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
              <div className="flex justify-center mb-20">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nama
                    </label>
                    <input
                      type="text"
                      name="nama"
                      value={profile.nama}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nomor Induk Mahasiswa
                    </label>
                    <input
                      type="text"
                      name="nomor_induk_mahasiswa"
                      value={profile.nomor_induk_mahasiswa}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Program Studi
                    </label>
                    <select
                      name="program_studi_id"
                      value={profile.program_studi_id || ""}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option value="">Pilih Program Studi</option>
                      {programStudis.map((ps) => (
                        <option key={ps.id} value={ps.id}>
                          {ps.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Kontak Telephone
                    </label>
                    <input
                      type="tel"
                      name="kontak_telephone"
                      value={profile.kontak_telephone}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Jenis Kelamin
                    </label>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="jenis_kelamin"
                          value="Laki-laki"
                          checked={profile.jenis_kelamin === "Laki-laki"}
                          onChange={handleChange}
                          className="form-radio"
                        />
                        <span className="ml-2">Laki-laki</span>
                      </label>
                      <label className="inline-flex items-center ml-6">
                        <input
                          type="radio"
                          name="jenis_kelamin"
                          value="Perempuan"
                          checked={profile.jenis_kelamin === "Perempuan"}
                          onChange={handleChange}
                          className="form-radio"
                        />
                        <span className="ml-2">Perempuan</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Perguruan Tinggi
                    </label>
                    <input
                      type="text"
                      name="perguruan_tinggi"
                      value={profile.perguruan_tinggi}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Jenjang
                    </label>
                    <select
                      name="jenjang"
                      value={profile.jenjang}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option value="">Pilih Jenjang</option>
                      <option value="Sarjana">Sarjana</option>
                      <option value="Magister">Magister</option>
                      <option value="Doktor">Doktor</option>
                      <option value="Diploma-1">Diploma-1</option>
                      <option value="Diploma-2">Diploma-2</option>
                      <option value="Diploma-3">Diploma-3</option>
                      <option value="Diploma-4">Diploma-4</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tahun Masuk
                    </label>
                    <select
                      name="tahun_masuk"
                      value={profile.tahun_masuk}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      {Array.from(
                        { length: 2030 - 1999 },
                        (_, i) => 2030 - i
                      ).map((year) => (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Pekerjaan Saat Ini
                    </label>
                    <input
                      type="text"
                      name="pekerjaan_saat_ini"
                      value={profile.pekerjaan_saat_ini}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nama Perusahaan
                    </label>
                    <input
                      type="text"
                      name="nama_perusahaan"
                      value={profile.nama_perusahaan}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Media Sosial
                  </label>
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
                          handleMediaSosialChange(index, "link", e.target.value)
                        }
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
                    disabled={tempMediaSosial?.length >= 5}
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Tambah Media Sosial
                  </button>
                </div>
                <div className="mt-6 flex space-x-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">View Profile</h2>
              <div className="flex justify-center mb-20">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nama
                  </label>
                  <p>{profile.nama}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nomor Induk Mahasiswa
                  </label>
                  <p>{profile.nomor_induk_mahasiswa}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Program Studi
                  </label>
                  <p>
                    {profile.Program_Studi
                      ? profile.Program_Studi.name
                      : "Belum diisi"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Kontak Telephone
                  </label>
                  <p>{profile.kontak_telephone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Jenis Kelamin
                  </label>
                  <p>{profile.jenis_kelamin}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Perguruan Tinggi
                  </label>
                  <p>{profile.perguruan_tinggi}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Jenjang
                  </label>
                  <p>{profile.jenjang}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tahun Masuk
                  </label>
                  <p>{profile.tahun_masuk}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pekerjaan Saat Ini
                  </label>
                  <p>{profile.pekerjaan_saat_ini}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nama Perusahaan
                  </label>
                  <p>{profile.nama_perusahaan}</p>
                </div>
              </div>
              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">
                  Media Sosial
                </label>
                {profile.Media_Sosial_Alumnis &&
                profile.Media_Sosial_Alumnis.length > 0 ? (
                  profile.Media_Sosial_Alumnis.map((media, index) => (
                    <div key={index} className="mt-2">
                      <p>
                        {media.Media_Sosial.name}:{" "}
                        <a
                          href={media.link}
                          target="_blank"
                          rel="noopener noreferrer"
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
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
