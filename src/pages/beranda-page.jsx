import backgroundImage from '../assets/Kampus.jpg'; // Sesuaikan path ini sesuai lokasi gambar background
import logo1 from '../assets/UEU.png'; // Sesuaikan path ini dengan lokasi logo pertama Anda
import logo2 from '../assets/alumni_tracking.png'

function Beranda() {
  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div> {/* Overlay transparan */}
      
      <nav className="relative z-10 bg-white py-3 w-full" data-bs-theme="light">
        <div className="container-xl flex justify-between items-center mx-auto px-2">
          <img className="img-fluid logo-brand me-auto" src={logo1} alt="Logo 1" />
          <img className="img-fluid logo-brand" src={logo2} alt="Logo 2" />
        </div>
      </nav>
      
      <div className="relative z-10 w-full h-full flex flex-col gap-10 items-center justify-center" style={{ marginTop: '-90px' }}> {/* Mengangkat ke atas */}
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Temukan Data Alumni</h1>
          <h2 className="text-5xl font-bold">Semudah Mungkin</h2>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="bg-white flex flex-row gap-6 w-2/5 h-12 font-['Inter'] items-center pt-1 px-5 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Search Alumni or type..."
              className="flex-grow outline-none"
            />
            <button className="text-black px-1 py-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16.65 16.65a8.56 8.56 0 111.414-1.414l4.35 4.35L21 21z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Beranda;
