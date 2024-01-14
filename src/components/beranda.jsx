import React from "react";

function Beranda() {

     return (
    <div
        className="overflow-hidden bg-[#4a41ae] relative flex flex-row w-full font-['Inter'] items-start px-16"
        >
        <div className="w-1/4 h-[851px] bg-[url(https://file.rendit.io/n/Ci8pIGRKWtRj2zhBR2ZJ.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat absolute top-[-69.00000000000011px] left-[-92px] flex flex-row items-start">
            <div className="bg-[url(https://file.rendit.io/n/m9QhYql3rEO0H3EXQg5p.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row w-full items-start">
            <img
                src="https://file.rendit.io/n/AgSfqLLxOrtbVh66SkVf.svg"
                alt="Rectangle2"
            />
            </div>
        </div>
        <div className="w-5/6 h-[730px] bg-[url(https://file.rendit.io/n/x3cHwJCx3dceHvklW5t0.png)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat absolute top-0 left-40 flex flex-col gap-10 items-start pl-8 py-20">
            <div className="flex flex-row justify-between ml-[665px] w-2/5 items-start">
            <img
                src="https://file.rendit.io/n/Vc9Fid9vHtSe2QHFhUXp.svg"
                alt="Profile"
                id="Profile"
                className="w-4"
            />
            <div className="flex flex-row mt-4 gap-4 w-2/3 font-['Inter'] items-start">
                <div className="text-xl text-white mt-2">Hi, Galuh Trihanggara!</div>
                <img
                src="https://file.rendit.io/n/OD3Vcnu1xdJxSOzmxoA4.svg"
                alt="Eclips"
                id="Eclips"
                className="w-10"
                />
            </div>
            </div>
            <div className="border-solid bg-white flex flex-row ml-[148px] gap-6 w-1/2 h-16 font-['Inter'] items-start pt-4 px-6 border-black border rounded-[55px]">
            <img
                src="https://file.rendit.io/n/OaAogmnzui0JfFqMPTHG.svg"
                alt="Icon"
                id="Icon"
                className="mt-px w-5"
            />
            <div className="text-xl font-semibold text-black/50">
                Search Alumni or type
            </div>
            </div>
        </div>
        <div className="text-5xl font-bold text-white relative mb-[640px]">
            Alumni Tracking
        </div>
        </div>
      );
    };
    export default Beranda;
