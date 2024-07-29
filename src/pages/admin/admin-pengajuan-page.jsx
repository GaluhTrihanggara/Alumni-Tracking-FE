import { useState, useEffect } from "react";
import Sidebar from "../../components/adminSidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubmissionPage = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Load submissions from an API or local storage
    // For this example, we'll use the hardcoded data
    const initialSubmissions = [
      {
        id: 1,
        type: "New Data",
        data: {
          nama: "Alice Johnson",
          email: "alice.johnson@example.com",
          password: "alice_password",
        },
      },
      {
        id: 2,
        type: "Data Change",
        data: {
          nama: "Bob Smith",
          changes: {
            pekerjaan_saat_ini: "New Job Title",
            password: "new_bob_password",
          },
        },
      },
        {
          id: 3,
          type: "Data Change",
          data: {
          nama: "Ibnu Aji",
          changes: {
            nama_perusahaan: "google",
            pekerjaan_saat_ini: "Engineer",
            },
          },
        },
    ];
    setSubmissions(initialSubmissions);
    
    // Update the submissions count in localStorage
    localStorage.setItem('submissionsCount', initialSubmissions.length.toString());
  }, []);

  const handleApprove = (id) => {
    setSubmissions(prevSubmissions => {
      const newSubmissions = prevSubmissions.filter((submission) => submission.id !== id);
      // Update the submissions count in localStorage
      localStorage.setItem('submissionsCount', newSubmissions.length.toString());
      return newSubmissions;
    });
    toast.success("Submission approved", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleReject = (id) => {
    setSubmissions(prevSubmissions => {
      const newSubmissions = prevSubmissions.filter((submission) => submission.id !== id);
      // Update the submissions count in localStorage
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
                  {submission.type} Submission
                </h2>
                {submission.type === "New Data" ? (
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nama
                      </label>
                      <p>{submission.data.nama}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <p>{submission.data.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <p>{submission.data.password}</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nama
                      </label>
                      <p>{submission.data.nama}</p>
                    </div>
                    {Object.entries(submission.data.changes).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700">
                          {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                        </label>
                        <p>{value}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleApprove(submission.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(submission.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
