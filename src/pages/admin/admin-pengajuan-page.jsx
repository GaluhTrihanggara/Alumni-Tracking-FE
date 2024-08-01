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
        
        const response = await fetch('http://localhost:3000/api/submission-changes/pending', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized');
          }
          throw new Error('Failed to fetch submissions');
        }

         const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Fetched data is not an array');
        }

        setSubmissions(data);
        localStorage.setItem('submissionsCount', data.length.toString());
      } catch (error) {
        console.error("Error fetching submissions:", error.message);
        toast.error(error.message, {
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
    fetchSubmissions();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No admin token found');
      }

      const response = await fetch(`http://localhost:3000/api/submission-changes/${id}/approve`, {
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

      toast.success("Submission approved", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error approving submission:", error.message);
      toast.error("Failed to approve submission", {
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

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No admin token found');
      }

      const response = await fetch(`http://localhost:3000/api/submission-changes/${id}/reject`, {
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
                  {submission.type || 'Unknown'} Submission
                </h2>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div>
                    <span className="font-semibold">Nama: </span>
                    {submission.Alumni?.nama || 'Name not available'}
                  </div>
                  <div>
                    <span className="font-semibold">Changes: </span>
                    {renderChanges(submission.changes)}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleApprove(submission.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(submission.id)}
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