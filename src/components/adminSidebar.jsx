import { Link } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { name: 'Home', icon: '🏠', path: '/beranda-admin' },
    { name: 'Profile', icon: '👤', path: '/admin-profile' },
    { name: 'Change Password', icon: '🔑', path: '/admin-password' },
    { name: 'Privacy Policy', icon: '🔒', path: '/privacy_policy' },
    { name: 'Logout', icon: '🚪', path: '/login-admin' },
  ];

  return (
    <div className="w-60 bg-gray-900 text-white h-screen fixed left-0 top-0">
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