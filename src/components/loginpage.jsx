import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Loginpage() {
  const [passwordType, setPasswordType] = useState('password');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   
    const handlePasswordTypeChange = () => {
        setPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));
        setIsPasswordVisible(!isPasswordVisible);
      };

 return (
<div className="overflow-hidden bg-white flex flex-row justify-between pr-40 w-screen h-screen">
      <div className="bg-[#4a41ae] flex flex-col justify-end pt-5 w-1/2 items-start">
        <div className="text-5xl font-bold text-white ml-[19%]">Alumni Tracking</div>
        <img
          src="https://file.rendit.io/n/kDL8dQ7h0VrOIzyBhM6s.png"
          alt="DrawkitIllustrationsEducation"
           style={{ maxWidth: '700px', maxHeight: '796px', width: '100%', height: '94%'}}
        />
      </div>
      <div className="flex flex-col items-start w-2/5 gap-20 mt-5">
        <img src="https://file.rendit.io/n/iSmGS7vcYAl7vG6JEj3U.png" alt="Rectangle1" className="ml-[93%]" style={{ width: '180px' }} />
        <div className="bg-[#e8f3fa] flex flex-col gap-4 w-full font-['Inter'] items-start pt-6 pb-10 px-10 rounded-[30px]">
          <div className="flex flex-col items-start w-full gap-6">
            <div className="flex flex-col items-start w-full gap-6">
              <div className="grid items-center grid-rows-2 mx-auto gap-y-4">
                <div className="text-4xl font-bold text-center">Login</div>
                <div className="w-full text-xl text-black/60">
                  Please login or signup to continue using Alumni Tracking Esa Unggul
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start w-full gap-2">
              <div className="text-2xl font-semibold">Username</div>
              <div className="flex flex-row items-start w-full h-12 gap-6 px-5 pt-2 bg-white rounded-lg">
                <img
                  src="https://file.rendit.io/n/PCHtQZzS3hx7Nan1k04r.svg"
                  alt="Profile"
                  id="Profile"
                  className="w-6 mt-px"
                />
                <input
                  type="text"
                  placeholder="Username/NIM"
                  className="mt-px text-2xl text-black/100 outline-none border-none flex flex-col items-start w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start w-full gap-2">
            <div className="text-2xl font-semibold">Password</div>
            <div className="flex flex-row items-start w-full h-12 gap-6 px-5 pt-2 bg-white rounded-lg">
                <img
                  src="https://file.rendit.io/n/b3SmrM6zu2moH29qMHm7.svg"
                  alt="IconlyLightOutlineLock"
                  className="w-6 mt-px"
                />
                <input
                  type={passwordType}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-px text-2xl text-black/100 outline-none border-none flex flex-col items-start w-full"
                />
          
          <img
                src="https://file.rendit.io/n/yRCaCIOIgt3hX2JlLQMQ.svg"
                alt="Heroiconsoutlineeye"
                id="Heroiconsoutlineeye"
                style={{ width: '27px' }}
                onClick={handlePasswordTypeChange}
                className={`transition duration-300 transform ${isPasswordVisible? 'rotate-0' : 'rotate-180'}`}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full font-['Inter'] items-center">
            <button className="text-center text-2xl font-bold bg-[#afcaff] flex-shrink-0 w-[11.1875rem] h-[3.25rem] bg-[#afcaff]">
              <Link to="/berandapage">Login</Link>
            </button>
            <div className="grid grid-row-2 gap-1 w-full font-['Inter'] items-center">
              <div className="text-center text-2xl text-[#2e2e2e]">
                Doesn’t have account yet?{' '}
                <span className="text-2xl font-semibold text-[rgba(6,_1,_255,_0.6)]">
                  <Link to="/Signup">Sign Up</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Loginpage;