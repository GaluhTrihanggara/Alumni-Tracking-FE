import './App.css'

function App() {

  return (
      <div
    id="LoginMahasiswaRoot"
    className="overflow-hidden bg-white flex flex-row justify-between pr-40 w-full font-['Inter'] items-start"
  >
    <div className="bg-[#4a41ae] flex flex-col justify-end pt-8 w-1/2 items-start">
      <div className="text-6xl font-bold text-white ml-[220px]">
        Alumni Tracking
      </div>
      <img
        src="https://file.rendit.io/n/kDL8dQ7h0VrOIzyBhM6s.png"
        alt="DrawkitIllustrationsEducation"
        className="mb[40px] ml[100px]"
      />
    </div>
    <div className="flex flex-col mt-6 gap-20 w-2/5 items-start">
      <img
        src="https://file.rendit.io/n/iSmGS7vcYAl7vG6JEj3U.png"
        alt="Rectangle1"
        className="ml-[359px]"
      />
      <div className="bg-[#e8f3fa] flex flex-col gap-12 w-full font-['Inter'] items-start pt-6 pb-10 px-10 rounded-[30px]">
        <div className="flex flex-col gap-8 w-full items-start">
          <div className="flex flex-col gap-6 w-full items-start">
            <div className="text-center text-4xl font-bold ml-40">Login</div>
            <div className="text-xl text-black/60 w-full">
              Please login or signup to continue using Alumni Tracking Esa Unggul
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full items-start">
            <div className="text-2xl font-semibold">Username</div>
            <div className="bg-white flex flex-row gap-6 w-full h-12 items-start pt-2 px-5 rounded-lg">
              <img
                src="https://file.rendit.io/n/PCHtQZzS3hx7Nan1k04r.svg"
                alt="Profile"
                id="Profile"
                className="mt-px w-6"
              />
              <div className="text-2xl text-black/50 mt-px">Username/NIM</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-px gap-3 w-full items-start">
          <div className="text-2xl font-semibold">Password</div>
          <div className="bg-white flex flex-row justify-between w-full h-12 items-start pt-2 pl-5 pr-8 rounded-lg">
            <div className="flex flex-row mt-px gap-6 w-1/3 items-start">
              <img
                src="https://file.rendit.io/n/b3SmrM6zu2moH29qMHm7.svg"
                alt="IconlyLightOutlineLock"
                className="w-6"
              />
              <div className="text-2xl text-black/50">Password</div>
            </div>
            <img
              src="https://file.rendit.io/n/yRCaCIOIgt3hX2JlLQMQ.svg"
              alt="Heroiconsoutlineeye"
              id="Heroiconsoutlineeye"
              className="mt-1 w-6"
            />
          </div>
        </div>
        <div className="flex flex-col ml-16 gap-6 w-3/4 font-['Inter'] items-start">
          <div className="text-center text-4xl font-bold bg-[#afcaff] flex flex-row ml-12 w-3/4 h-20 items-start pt-3 pl-24 pr-[112px]">
            Login
          </div>
          <div className="flex flex-row gap-2 w-full font-['Poppins'] items-start">
            <div className="text-center text-2xl text-[#2e2e2e]">
              Doesn’t have account yet?
            </div>
            <div className="text-2xl font-semibold text-[rgba(6,_1,_255,_0.6)]">
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default App
