import { useState, useEffect } from 'react';
import Sidebar from "../../components/adminSidebar";

const AlumniSalaryAnalysis = () => {
  const [year, setYear] = useState('');
  const [programStudi, setProgramStudi] = useState('');
  const [salaryData, setSalaryData] = useState(null);
  const [programStudiOptions, setProgramStudiOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProgramStudiOptions();
  }, []);

  const fetchProgramStudiOptions = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/admin/program-studi', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch program studi options');
      const data = await response.json();
      setProgramStudiOptions(data);
    } catch (error) {
      console.error('Error fetching program studi options:', error);
      setError('Failed to load program studi options');
    }
  };

  const fetchSalaryData = async (year, programStudiId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/admin/alumni-salary?year=${year}&programStudiId=${programStudiId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch salary data');
      const data = await response.json();
      setSalaryData(data);
    } catch (error) {
      console.error('Error fetching salary data:', error);
      setError('Failed to load salary data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSalaryData(year, programStudi);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <h2 className="text-2xl font-bold mb-4">Cek Gaji Alumni</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Angkatan"
            className="mr-2 p-2 border rounded"
          />
          <select
            value={programStudi}
            onChange={(e) => setProgramStudi(e.target.value)}
            className="mr-2 p-2 border rounded"
          >
            <option value="">Pilih Program Studi</option>
            {programStudiOptions.map((option) => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">Tampilkan Data</button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {salaryData && (
          <div>
            <h3 className="text-xl font-bold mb-2">Hasil Analisis Gaji:</h3>
            <p>Jumlah Alumni: {salaryData.count}</p>
            <p>Total Gaji Pertama: {formatCurrency(salaryData.totalSalary)}</p>
            <p>Gaji Tertinggi: {formatCurrency(salaryData.highestSalary)}</p>
            <p>Gaji Terendah: {formatCurrency(salaryData.lowestSalary)}</p>
            <p>Rata-rata Gaji Pertama: {formatCurrency(salaryData.averageSalary)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniSalaryAnalysis;