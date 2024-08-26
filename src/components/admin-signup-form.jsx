import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { MdLock } from "react-icons/md";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handlePasswordTypeChange = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/admin/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email, password: password}) // Sesuaikan dengan data yang diperlukan
      });

      const data = await response.json();

      if (response.ok) {
        // Simulasi signup sukses
        console.log("Signup successful:", data);
        navigate('/login-admin');
      } else {
        console.error("Signup failed:", data);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-[#e8f3fa] flex flex-col gap-4 w-full font-['Inter'] items-start pt-6 pb-10 px-10 rounded-[30px]"
    >
      <div className="flex flex-col items-start w-full gap-6">
        <div className="flex flex-col items-start w-full gap-6">
          <div className="grid items-center grid-rows-2 mx-auto gap-y-4">
            <div className="text-4xl font-bold text-center">Signup</div>
          </div>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <div className="text-2xl font-semibold">Name</div>
          <div className="flex flex-row items-start w-full h-12 gap-6 px-5 pt-2 bg-white rounded-lg">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-px text-2xl text-black/100 outline-none border-none flex flex-col items-start w-full"
              required
            />
          </div>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <div className="text-2xl font-semibold">Email</div>
          <div className="flex flex-row items-start w-full h-12 gap-6 px-5 pt-2 bg-white rounded-lg">
            <MdEmail className="w-8 h-8 mt-px" />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-px text-2xl text-black/100 outline-none border-none flex flex-col items-start w-full"
              required
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start w-full gap-2">
        <div className="text-2xl font-semibold">Password</div>
        <div className="relative flex flex-row items-start w-full h-12 gap-6 px-5 pt-2 bg-white rounded-lg">
          <MdLock className="w-8 h-8 mt-px" />
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={isPasswordVisible ? "text" : "password"}
            className="mt-px text-2xl text-black/100 outline-none border-none flex flex-col items-start w-full"
            required
          />

          {isPasswordVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              onClick={handlePasswordTypeChange}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-eye-off absolute top-1/2 -translate-y-1/2 right-3"
            >
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
              <line x1="2" x2="22" y1="2" y2="22" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              onClick={handlePasswordTypeChange}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-eye absolute top-1/2 -translate-y-1/2 right-3"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full font-['Inter'] items-center">
        <button
          type="submit"
          className="text-center text-2xl font-bold bg-[#afcaff] flex-shrink-0 w-[11.1875rem] h-[3.25rem]"
        >
          Signup
        </button>
        <div className="grid grid-row-2 gap-1 w-full font-['Inter'] items-center">
          <div className="text-center text-2xl text-[#2e2e2e]">
            Doesn’t have account yet?{" "}
            <span className="text-2xl font-semibold text-[rgba(6,_1,_255,_0.6)]">
              <Link to="/login-admin">Login</Link>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}
