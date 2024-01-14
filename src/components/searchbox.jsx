import React, { useState } from 'react';
import AlumniList from './alumnilist';


const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search alumni"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;

// import React, { useState } from 'react';

// const BerandaMahasiswa = () => {
//   return (
//     <div
//       id="BerandaMahasiswaRoot"
//       className="overflow-hidden bg-[#4a41ae] relative flex flex-row justify-end w-full h-full"
//       style={{ width: '1536px', height: '729.6px' }}
//     >
//       <div
//         className="w-1/5 bg-[url(https://file.rendit.io/n/91r1DQyJy0VGTBP8sfXP.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat absolute top-0 left-0 flex flex-row items-start"
//         alt="gelombang depan"
//         style={{ height: '8px' }}
//       >
//         <div
//           className="bg-[url(https://file.rendit.io/n/3MUTx8bPejK6AZXpSMRs.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row w-full items-start"
//           alt="gelombang depan"
//           style={{ height: '103px' }}
//         >
//           <img
//             src="https://file.rendit.io/n/G5pI2i5inlUMLsca4Y5c.svg"
//             alt="Rectangle2"
//             className="absolute  left-[50px]"
//           />
//         </div>
//       </div>
//       <div className="bg-[url(https://file.rendit.io/n/f7Q07hMm5WtMxt6Q4Qqs.png)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat relative flex flex-col justify-between mb-1 w-5/6 h-full font-['Montserrat'] items-start pl-20 py-6">
//         <div className="flex flex-col ml-4 gap-8 w-full font-['Inter'] items-start">
//           <div className="flex flex-row justify-between ml-2 w-full items-start">
//             <div className="text-6xl font-bold text-white bg-[linear-gradient(180deg,_#000000_0%,_#000000_100%)] mt-8">
//               Alumni Tracking
//             </div>
//             <img
//               src="https://file.rendit.io/n/2wYhtRUaxjI0hR1kFz80.png"
//               alt="Rectangle4"
//               className="mb-3"
//             />
//           </div>
//           <div className="flex flex-row justify-between w-full items-start">
//             <div className="border-solid bg-white flex flex-row mt-6 gap-10 w-3/5 h-24 items-start pt-6 px-6 border-black border rounded-[55px]">
//               <img
//                 src="https://file.rendit.io/n/ZKf3TIvZaqvJciphE196.svg"
//                 alt="Icon"
//                 id="Icon"
//                 className="mt-px w-10"
//               />
//               <div className="text-3xl font-semibold text-black/50 mt-1">
//                 Search Alumni or type
//               </div>
//             </div>
//             <div className="flex flex-row gap-6 w-1/4 items-start">
//               <div className="text-2xl text-white mt-6">Hi, Galuh Trihanggara!</div>
//               <div
//                 id="Eclips"
//                 className="bg-[url(https://file.rendit.io/n/UygyPgBhxYCVPN5pKU5Y.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row justify-center pt-4 w-16 h-16 items-start"
//               >
//                 <img
//                   src="https://file.rendit.io/n/X23AQ5w4Sw9qXRSCn2wb.svg"
//                   alt="Profile"
//                   id="Profile"
//                   className="w-10"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="text-center text-xl ml-[451px]">
//           copyright©2023 alumnitracking
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BerandaMahasiswa;