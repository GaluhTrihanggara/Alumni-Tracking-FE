import { useState } from 'react';
import Sidebar from "../../components/adminSidebar";
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

const ScrappingPage = () => {
  const [namaAlumni, setNamaAlumni] = useState('');
  const [sedangMemuat, setSedangMemuat] = useState(false);
  const [hasil, setHasil] = useState(null);
  const [error, setError] = useState(null);

  const handlePerubahanInput = (e) => {
    setNamaAlumni(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSedangMemuat(true);
    setError(null);
    setHasil(null);

    try {
      const daftarNama = namaAlumni.split(',').map(nama => nama.trim());
      const respons = await fetch('http://localhost:3000/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}` // Asumsi token admin disimpan di localStorage
        },
        body: JSON.stringify({ names: daftarNama })
      });

      if (!respons.ok) {
        throw new Error('Respons jaringan tidak OK');
      }

      const data = await respons.json();
      setHasil(data);
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
          {hasil && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Hasil Scrapping:</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
                {JSON.stringify(hasil, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrappingPage;