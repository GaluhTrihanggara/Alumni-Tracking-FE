function App() {
  return (
    <div
      id="LoginMahasiswaRoot"
      className="overflow-hidden bg-white flex flex-row justify-between pr-40 w-full font-['Inter'] items-start h-screen"
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
      <div className="flex flex-col items-start w-2/5 gap-20 mt-6">
        <img
          src="https://file.rendit.io/n/iSmGS7vcYAl7vG6JEj3U.png"
          alt="Rectangle1"
          className="ml-[359px]"
        />
        <div className="bg-[#e8f3fa] flex flex-col gap-12 w-full font-['Inter'] items-start pt-6 pb-10 px-10 rounded-[30px]">
          <div className="flex flex-col items-start w-full gap-8">
            <div className="flex flex-col items-start w-full gap-6">
              <div className="grid items-center grid-rows-2 mx-auto gap-y-4">
                <div className="text-4xl font-bold text-center">Login</div>
                <div className="w-full text-xl text-black/60">
                  Please login or signup to continue using Alumni Tracking Esa
                  Unggul
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start w-full gap-3">
              <div className="text-2xl font-semibold">Username</div>
              <div className="flex flex-row items-start w-full h-12 gap-6 px-5 pt-2 bg-white rounded-lg">
                <img
                  src="https://file.rendit.io/n/PCHtQZzS3hx7Nan1k04r.svg"
                  alt="Profile"
                  id="Profile"
                  className="w-6 mt-px"
                />
                <div className="mt-px text-2xl text-black/50">Username/NIM</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start w-full gap-3 mb-px">
            <div className="text-2xl font-semibold">Password</div>
            <div className="flex flex-row items-start justify-between w-full h-12 pt-2 pl-5 pr-8 bg-white rounded-lg">
              <div className="flex flex-row items-start w-1/3 gap-6 mt-px">
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
                className="w-6 mt-1"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full font-['Inter'] items-center">
            <button className="text-center text-2xl font-bold bg-[#afcaff] flex flex-row w-1/2 h-20 justify-center items-center rounded-md">
              Login
            </button>
            <div className="grid grid-row-2 gap-2 w-full font-['Inter'] items-center">
              <div className="text-center text-2xl text-[#2e2e2e]">
                Doesn’t have account yet?{" "}
                <span className="text-2xl font-semibold text-[rgba(6,_1,_255,_0.6)]">
                  Sign Up
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
