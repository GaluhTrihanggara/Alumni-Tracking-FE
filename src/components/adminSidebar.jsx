import { Link } from 'react-router-dom';
import submission from '../assets/submission.png';
import scrapping from '../assets/web-scraper.png';
import contact from '../assets/contact-person.png';
import grafik from '../assets/Grafik.png';

const Sidebar = () => {
  const menuItems = [
    { name: 'Home', icon: '🏠', path: '/beranda-admin' },
    { name: 'Profile Admin', icon: '👤', path: '/admin-profile' },
    { name: 'Change Password', icon: '🔑', path: '/admin-password' },
    { name: 'Scrapping Alumni', icon: <img src={scrapping} alt="Scrapping" className="w-5 h-5" />, path: '/admin-scrapping' },
    { name: 'Submissions', icon: <img src={submission} alt="Pengajuan" className="w-5 h-5" />, path: '/admin-submission' },
    { name: 'Contact Alumni', icon: <img src={contact} alt="Contact Alumni" className="w-5 h-5" />, path: '/contact-alumni' },
    { name: 'Grafik Lama Pekerjaan Alumni', icon: <img src={grafik} alt="Grafik Lama Pekerjaan Alumni" className="w-5 h-5" />, path: '/grafik-pekerjaan-alumni' },
    { name: 'Gaji Alumni', icon: <img src={grafik} alt="Gaji Alumni" className="w-5 h-5" />, path: '/gaji-alumni' },     
    { name: 'Privacy Policy', icon: '🔒', path: '/privacy-policy' },
    { name: 'Logout', icon: '🚪', path: '/login-admin' },
  ];

  return (
    <div className="w-60 bg-blue-800 text-white h-screen fixed left-0 top-0">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 mt-2">Menu</h2>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-2">
              <Link
                to={item.path}
                className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors"
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;