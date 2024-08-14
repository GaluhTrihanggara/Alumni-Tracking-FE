import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Sidebar from "../../components/adminSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormCard = ({ title, children, onApprove, onReject }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
    <div className="flex space-x-4 mt-4">
      <button
        onClick={onApprove}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Approve
      </button>
      <button
        onClick={onReject}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Reject
      </button>
    </div>
  </div>
);

FormCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

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
            dataChanges = jsonChanges.map((item, index) => ({
              ...item,
              type: "change",
              key: `change-${index}`,
              nim_pengaju: item.nim_pengaju,
            }));
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
              nim_pengaju: item.nim_pengaju, // Menambahkan nim_pengaju dari data API
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
              type: "scraped",
              key: `scraped-${index}`,
              pddiktiInfo:
                typeof item.pddiktiInfo === "string"
                  ? JSON.parse(item.pddiktiInfo)
                  : item.pddiktiInfo,
              linkedInProfile:
                typeof item.linkedInProfile === "string"
                  ? JSON.parse(item.linkedInProfile)
                  : item.linkedInProfile,
            }));
          } else {
            console.error(
              "Expected jsonScraped.data to be an array but got:",
              jsonScraped
            );
          }
        } else {
          console.error("Failed to fetch scraped data");
        }

        const combinedData = [
          ...dataChanges,
          ...dataKolaborasi,
          ...dataScraped,
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
      } else if (type === "scraped") {
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
      } else if (type === "scraped") {
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

  const renderKolaborasiDetails = (kolaborasi) => (
    <div className="grid grid-cols-2 gap-4">
      <div><strong>Nama:</strong> {kolaborasi.nama}</div>
      <div><strong>NIM:</strong> {kolaborasi.nomor_induk_mahasiswa}</div>
      <div><strong>Program Studi:</strong> {kolaborasi.program_studi_id}</div>
      <div><strong>Kontak:</strong> {kolaborasi.kontak_telephone}</div>
      <div><strong>Jenis Kelamin:</strong> {kolaborasi.jenis_kelamin}</div>
      <div><strong>Perguruan Tinggi:</strong> {kolaborasi.perguruan_tinggi}</div>
      <div><strong>Jenjang:</strong> {kolaborasi.jenjang}</div>
      <div><strong>Tahun Masuk:</strong> {kolaborasi.tahun_masuk}</div>
      <div><strong>Status:</strong> {kolaborasi.status_mahasiswa_saat_ini}</div>
      <div><strong>Pekerjaan:</strong> {kolaborasi.pekerjaan_saat_ini}</div>
      <div><strong>Perusahaan:</strong> {kolaborasi.nama_perusahaan}</div>
      <div>
        <strong>Media Sosial:</strong>
        {kolaborasi.mediaSosial && kolaborasi.mediaSosial.length > 0 ? (
          <ul className="list-disc pl-5 mt-2">
            {kolaborasi.mediaSosial.map((media, index) => (
              <li key={index}>{media.media_sosial_id}: {media.link}</li>
            ))}
          </ul>
        ) : (
          <p className="italic mt-2">Tidak ada media sosial yang ditambahkan</p>
        )}
      </div>
    </div>
  );

  const renderScrapedDetails = (scraped) => {
    const pddiktiInfo = typeof scraped.pddiktiInfo === 'string' ? JSON.parse(scraped.pddiktiInfo) : scraped.pddiktiInfo;
    const linkedInProfile = typeof scraped.linkedInProfile === 'string' ? JSON.parse(scraped.linkedInProfile) : scraped.linkedInProfile;

    return (
      <div className="grid grid-cols-2 gap-4">
        <div><strong>Nama:</strong> {scraped.name}</div>
        <div><strong>Universitas:</strong> {pddiktiInfo?.university}</div>
        <div><strong>Program Studi:</strong> {pddiktiInfo?.alumniData?.program_studi}</div>
        <div><strong>Jenjang:</strong> {pddiktiInfo?.alumniData?.jenjang}</div>
        <div><strong>NIM:</strong> {pddiktiInfo?.alumniData?.nomor_induk_mahasiswa}</div>
        <div><strong>Tahun Masuk:</strong> {pddiktiInfo?.alumniData?.tahun_masuk}</div>
        <div><strong>Status:</strong> {pddiktiInfo?.alumniData?.status_mahasiswa_saat_ini}</div>
        <div><strong>Pekerjaan LinkedIn:</strong> {linkedInProfile?.jobTitle}</div>
        <div><strong>Perusahaan LinkedIn:</strong> {linkedInProfile?.companyName}</div>
      </div>
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <ToastContainer />
        <h1 className="text-2xl font-bold mb-4">Submissions</h1>
        <div className="space-y-6">
          {submissions.length === 0 ? (
            <p>No submissions available</p>
          ) : (
            submissions.map((submission) => {
              switch (submission.type) {
                case "change":
                  return (
                    <FormCard
                      key={submission.key}
                      title="Profile Change"
                      onApprove={() => handleApprove(submission.id, submission.type)}
                      onReject={() => handleReject(submission.id, submission.type)}
                    >
                      <div><strong>Nama:</strong> {submission.Alumni?.nama} ({submission.Alumni?.nomor_induk_mahasiswa})</div>
                      <div className="mt-4">
                        <strong>Changes:</strong>
                        {renderChanges(submission.changes)}
                      </div>
                    </FormCard>
                  );
                case "kolaborasi":
                  return (
                    <FormCard
                      key={submission.key}
                      title="New Alumni Collaboration"
                      onApprove={() => handleApprove(submission.id, submission.type)}
                      onReject={() => handleReject(submission.id, submission.type)}
                    >
                      <div><strong>Diajukan oleh:</strong> {submission.pengaju} ({submission.nim_pengaju})</div>
                      <div className="mt-4">{renderKolaborasiDetails(submission)}</div>
                    </FormCard>
                  );
                case "scraped":
                  return (
                    <FormCard
                      key={submission.key}
                      title="Scraped Alumni Data"
                      onApprove={() => handleApprove(submission.id, submission.type)}
                      onReject={() => handleReject(submission.id, submission.type)}
                    >
                      {renderScrapedDetails(submission)}
                    </FormCard>
                  );
                default:
                  return null;
              }
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionPage;
