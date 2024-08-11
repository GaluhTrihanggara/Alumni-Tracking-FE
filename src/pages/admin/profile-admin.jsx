import { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/adminSidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfileAdminPage = () => {
  const lastToastTime = useRef(0);
  const [profile, setProfile] = useState({
    nama: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch admin profile data when component mounts
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/admin/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProfile({
          nama: data.name,
          email: data.email
        });
      } else {
        toast.error("Failed to fetch admin profile");
      }
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      toast.error("An error occurred while fetching profile");
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = Date.now();
    const timeSinceLastToast = now - lastToastTime.current;

    if (timeSinceLastToast >= 3000) {
      try {
        const response = await fetch('http://localhost:3000/api/admin/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          },
          body: JSON.stringify({
            name: profile.nama,
            email: profile.email
          })
        });

        if (response.ok) {
          toast.success("Profile updated successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setIsEditing(false);
          lastToastTime.current = now;
        } else {
          toast.error("Failed to update profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("An error occurred while updating profile");
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchAdminProfile(); // Reset to original data
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <ToastContainer />
        <h1 className="text-2xl font-bold mb-4">Profile Admin</h1>
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
                <div className="grid grid-cols-1 gap-4">
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
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
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
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nama
                  </label>
                  <p>{profile.nama}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p>{profile.email}</p>
                </div>
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

export default EditProfileAdminPage;