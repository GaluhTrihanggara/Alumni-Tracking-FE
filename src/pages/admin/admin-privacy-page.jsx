import Sidebar from "../../components/adminSidebar";

const PrivacyPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-2xl font-bold mb-6">Kebijakan Privasi</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Kebijakan Privasi Alumni Universitas Esa Unggul</h2>
          
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">1. Pengumpulan Data</h3>
            <p>Kami mengumpulkan data alumni Universitas Esa Unggul untuk tujuan:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Memantau perkembangan karir alumni</li>
              <li>Menyediakan informasi untuk akreditasi dan evaluasi program studi</li>
              <li>Memfasilitasi jaringan antar alumni</li>
              <li>Memberikan informasi tentang kesempatan pengembangan karir dan pendidikan lanjutan</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">2. Penggunaan Data</h3>
            <p>Data yang dikumpulkan akan digunakan untuk:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Analisis statistik keberhasilan alumni</li>
              <li>Peningkatan kualitas pendidikan di Universitas Esa Unggul</li>
              <li>Memberi informasi kepada calon mahasiswa tentang prospek karir</li>
              <li>Memfasilitasi komunikasi antara alumni dan universitas</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">3. Perlindungan Data</h3>
            <p>Kami berkomitmen untuk melindungi data alumni dengan:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Menggunakan enkripsi untuk melindungi data sensitif</li>
              <li>Membatasi akses data hanya kepada pihak yang berwenang</li>
              <li>Melakukan pembaruan keamanan secara berkala</li>
              <li>Tidak menjual atau membagikan data kepada pihak ketiga tanpa izin</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">4. Hak Alumni</h3>
            <p>Sebagai alumni, Anda memiliki hak untuk:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Mengakses data pribadi Anda yang kami simpan</li>
              <li>Meminta koreksi jika terdapat kesalahan pada data Anda</li>
              <li>Meminta penghapusan data Anda dari sistem kami</li>
              <li>Menolak penggunaan data Anda untuk tujuan tertentu</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">5. Kontak</h3>
            <p>Jika Anda memiliki pertanyaan atau kekhawatiran tentang privasi data Anda, silakan hubungi kami di:</p>
            <p className="mt-2">
              Email: privacy@esaunggul.ac.id<br />
              Telepon: (021) 567-8910<br />
              Alamat: Jl. Arjuna Utara No.9, Duri Kepa, Kec. Kb. Jeruk, Kota Jakarta Barat, DKI Jakarta 11510
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;