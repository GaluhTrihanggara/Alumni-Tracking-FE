import { useState, useEffect } from 'react';
import Sidebar from "../../components/adminSidebar";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AlumniGraph = () => {
  const [year, setYear] = useState('');
  const [programStudi, setProgramStudi] = useState('');
  const [alumniData, setAlumniData] = useState(null);
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

  const fetchAlumniData = async (year, programStudiId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/admin/alumni-by-year-and-program?year=${year}&programStudiId=${programStudiId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch alumni data');
      const data = await response.json();
      setAlumniData(data);
    } catch (error) {
      console.error('Error fetching alumni data:', error);
      setError('Failed to load alumni data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAlumniData(year, programStudi);
  };

  const chartData = {
    labels: alumniData?.groups.map(group => group.name) || [],
    datasets: [
      {
        label: 'Jumlah Alumni',
        data: alumniData?.groups.map(group => group.count) || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Pengelompokan Lama Menunggu Pekerjaan Alumni',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Jumlah Alumni'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Lama Menunggu (bulan)'
        }
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <h2 className="text-2xl font-bold mb-4">Grafik Lama Pekerjaan Alumni</h2>
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

        {alumniData && (
          <div>
            <h3 className="text-xl font-bold mb-2">Hasil:</h3>
            <p>Jumlah Alumni: {alumniData.count}</p>
            <p>Total Lama Menunggu Pekerjaan: {alumniData.totalLamaMenunggu} bulan</p>
            <p>Rata-rata Lama Menunggu Pekerjaan: {alumniData.averageLamaMenunggu.toFixed(2)} bulan</p>
            
            <div className="mt-8" style={{ height: '400px' }}>
              <Bar data={chartData} options={chartOptions} />
            </div>

            <h4 className="text-lg font-semibold mt-8 mb-2">Detail Pengelompokan:</h4>
            <ul>
              {alumniData.groups.map((group, index) => (
                <li key={index}>
                  {group.name}: {group.count} alumni
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniGraph;