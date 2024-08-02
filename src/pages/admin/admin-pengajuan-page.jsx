import { useState, useEffect } from "react";
import Sidebar from "../../components/adminSidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubmissionPage = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          throw new Error('No admin token found');
        }
        
        // Fetch submission-changes
        const responseChanges = await fetch('http://localhost:3000/api/submission-changes/pending', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Fetch kolaborasi-alumni
        const responseKolaborasi = await fetch('http://localhost:3000/api/kolaborasi-alumni/pending', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        let dataChanges = [];
        let dataKolaborasi = [];

        if (responseChanges.ok) {
          const jsonChanges = await responseChanges.json();
          if (Array.isArray(jsonChanges)) {
            dataChanges = jsonChanges;
          } else {
            console.error('Expected dataChanges to be an array but got:', jsonChanges);
          }
        } else {
          console.error('Failed to fetch submission changes');
        }

        if (responseKolaborasi.ok) {
          const jsonKolaborasi = await responseKolaborasi.json();
          if (Array.isArray(jsonKolaborasi.data)) {
            dataKolaborasi = jsonKolaborasi.data;
          } else {
            console.error('Expected dataKolaborasi.data to be an array but got:', jsonKolaborasi);
          }
        } else {
          console.error('Failed to fetch kolaborasi alumni');
        }

        // Combine and mark the data
        const combinedData = [
          ...dataChanges.map(item => ({...item, type: 'change'})),
          ...dataKolaborasi.map(item => ({...item, type: 'kolaborasi'}))
        ];

        console.log('Combined data:', combinedData); // For debugging

        setSubmissions(combinedData);
        localStorage.setItem('submissionsCount', combinedData.length.toString());
      } catch (error) {
        console.error("Error fetching submissions:", error.message);
        toast.error(`Error fetching submissions: ${error.message}`);
      }
    };
    fetchSubmissions();
  }, []);

  useEffect(() => {
    console.log('Current submissions:', submissions);
  }, [submissions]);

  const handleApprove = async (id, type) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No admin token found');
      }

      let url;
      if (type === 'change') {
        url = `http://localhost:3000/api/submission-changes/${id}/approve`;
      } else if (type === 'kolaborasi') {
        url = `http://localhost:3000/api/kolaborasi-alumni/${id}/approve`;
      } else {
        throw new Error('Invalid submission type');
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to approve submission');
      }

      setSubmissions(prevSubmissions => {
        const newSubmissions = prevSubmissions.filter((submission) => submission.id !== id);
        localStorage.setItem('submissionsCount', newSubmissions.length.toString());
        return newSubmissions;
      });

      toast.success("Submission approved");
    } catch (error) {
      console.error("Error approving submission:", error.message);
      toast.error("Failed to approve submission");
    }
  };

  const handleReject = async (id, type) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No admin token found');
      }

      let url;
      if (type === 'change') {
        url = `http://localhost:3000/api/submission-changes/${id}/reject`;
      } else if (type === 'kolaborasi') {
        url = `http://localhost:3000/api/kolaborasi-alumni/${id}/reject`;
      } else {
        throw new Error('Invalid submission type');
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to reject submission');
      }

      setSubmissions(prevSubmissions => {
        const newSubmissions = prevSubmissions.filter((submission) => submission.id !== id);
        localStorage.setItem('submissionsCount', newSubmissions.length.toString());
        return newSubmissions;
      });

      toast.error("Submission rejected", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error rejecting submission:", error.message);
      toast.error("Failed to reject submission", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  
  const renderChanges = (changes) => {
    if (typeof changes === 'string') {
      try {
        changes = JSON.parse(changes);
      } catch (e) {
        return <p>{changes}</p>;
      }
    }

    if (typeof changes !== 'object' || changes === null) {
      return <p>{String(changes)}</p>;
    }

    return (
      <div className="mt-2 ml-4">
        {Object.entries(changes).map(([key, value]) => (
          <div key={key} className="mb-2">
            <span className="font-semibold">{key}: </span>
            {typeof value === 'object' ? renderChanges(value) : value}
          </div>
        ))}
      </div>
    );
  };

  const renderKolaborasiDetails = (kolaborasi) => {
    return (
      <div className="mt-2 ml-4">
      <p className="mb-2"><strong>NIM:</strong> {kolaborasi.nomor_induk_mahasiswa}</p>
      <p className="mb-2"><strong>Program Studi:</strong> {kolaborasi.program_studi_id}</p>
      <p className="mb-2"><strong>Kontak:</strong> {kolaborasi.kontak_telephone}</p>
      <p className="mb-2"><strong>Jenis Kelamin:</strong> {kolaborasi.jenis_kelamin}</p>
      <p className="mb-2"><strong>Perguruan Tinggi:</strong> {kolaborasi.perguruan_tinggi}</p>
      <p className="mb-2"><strong>Jenjang:</strong> {kolaborasi.jenjang}</p>
      <p className="mb-2"><strong>Tahun Masuk:</strong> {kolaborasi.tahun_masuk}</p>
      <p className="mb-2"><strong>Status:</strong> {kolaborasi.status_mahasiswa_saat_ini}</p>
      <p className="mb-2"><strong>Pekerjaan:</strong> {kolaborasi.pekerjaan_saat_ini}</p>
      <p className="mb-2"><strong>Perusahaan:</strong> {kolaborasi.nama_perusahaan}</p>
    </div>
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <ToastContainer />
        <h1 className="text-2xl font-bold mb-4">Submissions</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {submissions.length === 0 ? (
            <p>No submissions available</p>
          ) : (
            submissions.map((submission) => (
              <div key={submission.id} className="mb-6 border-b pb-4">
                <h2 className="text-xl font-semibold mb-2">
                  {submission.type === 'change' ? 'Profile Change' : 'New Alumni Collaboration'}
                </h2>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div>
                    <span className="font-semibold">Nama: </span>
                    {submission.type === 'change' 
                      ? submission.Alumni?.nama 
                      : submission.nama || 'Name not available'}
                    {submission.type === 'change' && (
                      <p className="mt-2"><span className="font-semibold">Nomor Induk Mahasiswa: </span>{submission.Alumni?.nomor_induk_mahasiswa}</p>
                    )}
                  </div>
                  <div>
                    <span className="font-semibold">Details: </span>
                    {submission.type === 'change' 
                      ? renderChanges(submission.changes)
                      : renderKolaborasiDetails(submission)}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleApprove(submission.id, submission.type)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(submission.id, submission.type)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionPage;
