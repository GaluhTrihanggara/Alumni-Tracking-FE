import React from 'react';
import 'tailwindcss/tailwind.css';

const Loginpage = () => {
 return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Pelacak Alumni</h1>
              <p className="mt-2 text-gray-500">Masuk atau Daftar</p>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">Masuk</h2>
                <form className="mt-4">
                 <div className="flex flex-col">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input type="text" name="username" id="username" autoComplete="username" required className="mt-1 py-2 px-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                 </div>
                 <div className="mt-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Kata Sandi</label>
                    <input type="password" name="password" id="password" autoComplete="current-password" required className="mt-1 py-2 px-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                 </div>
                 <div className="mt-6">
                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                      Masuk
                    </button>
                 </div>
                </form>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">Belum punya akun?</h2>
                <p className="mt-2 text-sm text-gray-500">Daftar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 );
};

export default Loginpage;