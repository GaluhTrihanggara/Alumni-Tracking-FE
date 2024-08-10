import { useState, useEffect } from "react";
import Sidebar from "../../components/adminSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubmissionPage = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          throw new Error("No admin token found");
        }

        const responseChanges = await fetch(
          "http://localhost:3000/api/submission-changes/pending",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseKolaborasi = await fetch(
          "http://localhost:3000/api/kolaborasi-alumni/pending",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseScraped = await fetch(
          "http://localhost:3000/api/scrape/pending",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let dataChanges = [];
        let dataKolaborasi = [];
        let dataScraped = [];

        if (responseChanges.ok) {
          const jsonChanges = await responseChanges.json();
          if (Array.isArray(jsonChanges)) {
            dataChanges = jsonChanges.map((item, index) => ({ ...item, type: "change", key: `change-${index}` }));
          } else {
            console.error(
              "Expected dataChanges to be an array but got:",
              jsonChanges
            );
          }
        } else {
          console.error("Failed to fetch submission changes");
        }

        if (responseKolaborasi.ok) {
          const jsonKolaborasi = await responseKolaborasi.json();
          if (Array.isArray(jsonKolaborasi.data)) {
            dataKolaborasi = jsonKolaborasi.data.map((item, index) => ({
              ...item,
              type: "kolaborasi",
              key: `kolaborasi-${index}`,
              mediaSosial: item.media_sosial_data || [],
            }));
          } else {
            console.error(
              "Expected dataKolaborasi.data to be an array but got:",
              jsonKolaborasi
            );
          }
        }

         if (responseScraped.ok) {
      const jsonScraped = await responseScraped.json();
      console.log("Scraped data from server:", jsonScraped);
      if (jsonScraped.success && Array.isArray(jsonScraped.data)) {
        dataScraped = jsonScraped.data.map((item, index) => ({
          ...item,
          type: 'scraped',
          key: `scraped-${index}`,
          pddiktiInfo: typeof item.pddiktiInfo === 'string' ? JSON.parse(item.pddiktiInfo) : item.pddiktiInfo,
          linkedInProfile: typeof item.linkedInProfile === 'string' ? JSON.parse(item.linkedInProfile) : item.linkedInProfile
        }));
      } else {
        console.error("Expected jsonScraped.data to be an array but got:", jsonScraped);
      }
    } else {
      console.error("Failed to fetch scraped data");
    }

    
        const combinedData = [
          ...dataChanges,
          ...dataKolaborasi,
          ...dataScraped
        ];

        console.log("Combined data:", combinedData); // For debugging

        setSubmissions(combinedData);
        localStorage.setItem(
          "submissionsCount",
          combinedData.length.toString()
        );
      } catch (error) {
        console.error("Error fetching submissions:", error.message);
        toast.error(`Error fetching submissions: ${error.message}`);
      }
    };
    fetchSubmissions();
  }, []);

  const handleApprove = async (id, type) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("No admin token found");
      }

      let url;
      if (type === "change") {
        url = `http://localhost:3000/api/submission-changes/${id}/approve`;
      } else if (type === "kolaborasi") {
        url = `http://localhost:3000/api/kolaborasi-alumni/${id}/approve`;
      } else if (type === 'scraped') {
        url = `http://localhost:3000/api/scrape/${id}/approve`; 
      } else {
        throw new Error("Invalid submission type");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to approve submission");
      }

      setSubmissions((prevSubmissions) => {
        const newSubmissions = prevSubmissions.filter(
          (submission) => submission.id !== id
        );
        localStorage.setItem(
          "submissionsCount",
          newSubmissions.length.toString()
        );
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
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("No admin token found");
      }

      let url;
      if (type === "change") {
        url = `http://localhost:3000/api/submission-changes/${id}/reject`;
      } else if (type === "kolaborasi") {
        url = `http://localhost:3000/api/kolaborasi-alumni/${id}/reject`;
      } else if (type === 'scraped') {
        url = `http://localhost:3000/api/scrape/${id}/reject`; 
      } else {
        throw new Error("Invalid submission type");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to reject submission");
      }

      setSubmissions((prevSubmissions) => {
        const newSubmissions = prevSubmissions.filter(
          (submission) => submission.id !== id
        );
        localStorage.setItem(
          "submissionsCount",
          newSubmissions.length.toString()
        );
        return newSubmissions;
      });

      toast.error("Submission rejected");
    } catch (error) {
      console.error("Error rejecting submission:", error.message);
      toast.error("Failed to reject submission");
    }
  };

  const renderChanges = (changes) => {
    if (typeof changes === "string") {
      try {
        changes = JSON.parse(changes);
      } catch (e) {
        return <p>{changes}</p>;
      }
    }

    if (typeof changes !== "object" || changes === null) {
      return <p>{String(changes)}</p>;
    }

    return (
      <div className="mt-2 ml-4">
        {Object.entries(changes).map(([key, value]) => (
          <div key={key} className="mb-2">
            <span className="font-semibold">{key}: </span>
            {typeof value === "object" ? renderChanges(value) : value}
          </div>
        ))}
      </div>
    );
  };

  const renderKolaborasiDetails = (kolaborasi) => {
    return (
      <div className="mt-2 ml-4">
        <p className="mb-2">
          <strong>NIM:</strong> {kolaborasi.nomor_induk_mahasiswa}
        </p>
        <p className="mb-2">
          <strong>Program Studi:</strong> {kolaborasi.program_studi_id}
        </p>
        <p className="mb-2">
          <strong>Kontak:</strong> {kolaborasi.kontak_telephone}
        </p>
        <p className="mb-2">
          <strong>Jenis Kelamin:</strong> {kolaborasi.jenis_kelamin}
        </p>
        <p className="mb-2">
          <strong>Perguruan Tinggi:</strong> {kolaborasi.perguruan_tinggi}
        </p>
        <p className="mb-2">
          <strong>Jenjang:</strong> {kolaborasi.jenjang}
        </p>
        <p className="mb-2">
          <strong>Tahun Masuk:</strong> {kolaborasi.tahun_masuk}
        </p>
        <p className="mb-2">
          <strong>Status:</strong> {kolaborasi.status_mahasiswa_saat_ini}
        </p>
        <p className="mb-2">
          <strong>Pekerjaan:</strong> {kolaborasi.pekerjaan_saat_ini}
        </p>
        <p className="mb-2">
          <strong>Perusahaan:</strong> {kolaborasi.nama_perusahaan}
        </p>
        <p className="mb-2">
          <strong>Media Sosial:</strong>
        </p>
        {kolaborasi.mediaSosial && kolaborasi.mediaSosial.length > 0 ? (
          <ul className="list-disc pl-5">
            {kolaborasi.mediaSosial.map((media, index) => (
              <li key={index} className="mb-1">
                {media.media_sosial_id}: {media.link}
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic">Tidak ada media sosial yang ditambahkan</p>
        )}
      </div>
    );
  };

  const renderScrapedDetails = (scraped) => {
  const pddiktiInfo = typeof scraped.pddiktiInfo === 'string' ? JSON.parse(scraped.pddiktiInfo) : scraped.pddiktiInfo;
  const linkedInProfile = typeof scraped.linkedInProfile === 'string' ? JSON.parse(scraped.linkedInProfile) : scraped.linkedInProfile;
  
  return (
    <div className="mt-2 ml-4">
      <p><strong>Nama:</strong> {scraped.name}</p>
      <p><strong>Universitas:</strong> {pddiktiInfo?.university}</p>
      <p><strong>Program Studi:</strong> {pddiktiInfo?.alumniData?.program_studi}</p>
      <p><strong>Jenjang:</strong> {pddiktiInfo?.alumniData?.jenjang}</p>
      <p><strong>NIM:</strong> {pddiktiInfo?.alumniData?.nomor_induk_mahasiswa}</p>
      <p><strong>Tahun Masuk:</strong> {pddiktiInfo?.alumniData?.tahun_masuk}</p>
      <p><strong>Status:</strong> {pddiktiInfo?.alumniData?.status_mahasiswa_saat_ini}</p>
      <p><strong>Pekerjaan LinkedIn:</strong> {linkedInProfile?.jobTitle}</p>
      <p><strong>Perusahaan LinkedIn:</strong> {linkedInProfile?.companyName}</p>
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
              <div key={submission.key} className="mb-6 border-b pb-4">
                <h2 className="text-xl font-semibold mb-2">
                  {submission.type === 'change' ? 'Profile Change': 
                   submission.type === 'kolaborasi' ? 'New Alumni Collaboration':
                   submission.type === 'scraped' ? 'Scraped Alumni Data':
                   null}
                </h2>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div>
                    <span className="font-semibold">Nama: </span>
                    {submission.type === "change"
                      ? submission.Alumni?.nama
                      : submission.nama || submission.name || "Name not available"}
                  </div>
                  <div>
                    <span className="font-semibold">Details: </span>
                    {submission.type === 'change' ? renderChanges(submission.changes) :
                     submission.type === 'kolaborasi' ? renderKolaborasiDetails(submission) :
                     submission.type === 'scraped' ? renderScrapedDetails(submission) :
                     null}
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