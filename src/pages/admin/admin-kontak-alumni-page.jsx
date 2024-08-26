import { useEffect, useState } from 'react';
import Sidebar from "../../components/adminSidebar";

const AlumniContacts = () => {
    const [alumni, setAlumni] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State untuk menyimpan kata kunci pencarian

    useEffect(() => {
        const fetchAlumniContacts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/admin/contacts', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data); // Tambahkan ini untuk memeriksa data
                setAlumni(data);
            } catch (error) {
                console.error('Error fetching alumni contacts:', error);
            }
        };
        fetchAlumniContacts();
    }, []);

    // Fungsi untuk mem-filter data alumni berdasarkan searchTerm
    const filteredAlumni = alumni.filter((alumni) => 
        alumni.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
        alumni.nomor_induk_mahasiswa.includes(searchTerm)
    );

    // Fungsi untuk membentuk URL WhatsApp dengan nomor telepon
    const getWhatsAppUrl = (phoneNumber) => {
        let formattedPhoneNumber = phoneNumber.replace(/\D/g, ''); // Menghapus semua karakter selain angka
        if (formattedPhoneNumber.startsWith('0')) {
            formattedPhoneNumber = '62' + formattedPhoneNumber.slice(1); // Mengganti '0' dengan '62'
        }
        return `https://wa.me/${formattedPhoneNumber}`;
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Alumni Contacts</h1>
                    <div className="mb-4">
                        <input 
                            type="text"
                            placeholder="Search by Name or NIM"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm saat input berubah
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="text-left py-2 px-4 border-b border-gray-300">Name</th>
                                    <th className="text-left py-2 px-4 border-b border-gray-300">NIM</th>
                                    <th className="text-left py-2 px-4 border-b border-gray-300">Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAlumni.map((alumni) => (
                                    <tr key={alumni.id} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b border-gray-300">{alumni.nama}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{alumni.nomor_induk_mahasiswa}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">
                                            {alumni.kontak_telephone ? (
                                                <a 
                                                    href={getWhatsAppUrl(alumni.kontak_telephone)} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="text-green-600 hover:underline"
                                                >
                                                    {alumni.kontak_telephone}
                                                </a>
                                            ) : (
                                                'N/A'
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlumniContacts;
