import { useState } from 'react';
import PropTypes from 'prop-types';
import Sidebar from "../../components/adminSidebar";
import { FaSearch, FaSpinner,FaGraduationCap, FaLinkedin } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

const AlumniCard = ({ alumniData }) => {
  // Destructure dengan default values untuk menghindari error
  const { name, pddiktiInfo = {}, linkedInProfile = {} } = alumniData || {};
  const { isAlumni, university, alumniData: pddiktiData = {} } = pddiktiInfo;
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
      <h3 className="text-xl font-bold mb-4">{name || 'Nama Tidak Tersedia'}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2 flex items-center">
            <FaGraduationCap className="mr-2" /> Data PDDIKTI
          </h4>
         <p><strong>Universitas:</strong> {university || 'Bukan dari Universitas Esa Unggul'}</p>
          <p><strong>Status saat ini:</strong> {isAlumni ? 'Alumni' : 'Bukan Alumni'}</p>
          <p><strong>Program Studi:</strong> {pddiktiData.program_studi || 'Tidak Tersedia'}</p>
          <p><strong>NIM:</strong> {pddiktiData.nomor_induk_mahasiswa || 'Tidak Tersedia'}</p>
          <p><strong>Tahun Masuk:</strong> {pddiktiData.tahun_masuk || 'Tidak Tersedia'}</p>
          <p><strong>Status Terakhir Mahasiswa:</strong> {pddiktiData.status_mahasiswa_saat_ini || 'Tidak Tersedia'}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 flex items-center">
            <FaLinkedin className="mr-2" /> Profil LinkedIn
          </h4>
          <p><strong>Pekerjaan:</strong> {linkedInProfile.jobTitle || 'Tidak Tersedia'}</p>
          <p><strong>Perusahaan:</strong> {linkedInProfile.companyName || 'Tidak Tersedia'}</p>
        </div>
      </div>
    </div>
  );
};

AlumniCard.propTypes = {
  alumniData: PropTypes.shape({
    name: PropTypes.string,
    pddiktiInfo: PropTypes.shape({
      isFromEsaUnggul: PropTypes.bool,
      isAlumni: PropTypes.bool,
      university: PropTypes.string,
      alumniData: PropTypes.shape({
        program_studi: PropTypes.string,
        nomor_induk_mahasiswa: PropTypes.string,
        tahun_masuk: PropTypes.string,
        status_mahasiswa_saat_ini: PropTypes.string
      })
    }),
    linkedInProfile: PropTypes.shape({
      jobTitle: PropTypes.string,
      companyName: PropTypes.string
    })
  })
};

const ScrappingPage = () => {
  const [namaAlumni, setNamaAlumni] = useState('');
  const [sedangMemuat, setSedangMemuat] = useState(false);
  const [hasil, setHasil] = useState([]);
  const [error, setError] = useState(null);

  const handlePerubahanInput = (e) => {
    setNamaAlumni(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSedangMemuat(true);
    setError(null);
    setHasil([]);

    try {
      const daftarNama = namaAlumni.split(',').map(nama => nama.trim());
      const respons = await fetch('http://localhost:3000/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ names: daftarNama })
      });

      if (!respons.ok) {
        throw new Error('Respons jaringan tidak OK');
      }

      const data = await respons.json();
      setHasil(data.data); // Assuming the API returns an array of results in the 'data' field
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat melakukan scraping data');
    } finally {
      setSedangMemuat(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-2xl font-bold mb-4">Scrapping Alumni</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Masukkan Nama Alumni untuk Scrapping</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="namaAlumni" className="block text-gray-700 text-sm font-bold mb-2">
                Nama Alumni (pisahkan dengan koma)
              </label>
              <input
                type="text"
                id="namaAlumni"
                value={namaAlumni}
                onChange={handlePerubahanInput}
                placeholder="contoh: John Doe, Jane Smith"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={sedangMemuat}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            >
              {sedangMemuat ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Sedang Scrapping...
                </>
              ) : (
                <>
                  <FaSearch className="mr-2" />
                  Mulai Scrapping
                </>
              )}
            </button>
          </form>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
              <MdError className="absolute top-0 right-0 mt-3 mr-4" />
            </div>
          )}
          {hasil.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Hasil Scrapping:</h3>
              {hasil.map((alumniData, index) => (
                <AlumniCard key={index} alumniData={alumniData} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrappingPage;