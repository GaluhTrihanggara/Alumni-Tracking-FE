import SignupForm from "../../components/signup-form";

function Signup() {
  return (
    <div className="overflow-hidden bg-white flex flex-row justify-between pr-40 w-screen h-screen">
      <div className="bg-[#4a41ae] flex flex-col justify-end pt-5 w-1/2 items-start">
        <div className="text-5xl font-bold text-white ml-[19%]">
          Alumni Tracking
        </div>
        <img
          src="https://file.rendit.io/n/kDL8dQ7h0VrOIzyBhM6s.png"
          alt="DrawkitIllustrationsEducation"
          style={{
            maxWidth: "700px",
            maxHeight: "796px",
            width: "100%",
            height: "94%",
          }}
        />
      </div>
      <div className="flex flex-col items-start w-2/5 gap-20 mt-5">
        <img
          src="https://file.rendit.io/n/iSmGS7vcYAl7vG6JEj3U.png"
          alt="Rectangle1"
          className="ml-[93%]"
          style={{ width: "180px" }}
        />
        <SignupForm />
      </div>
    </div>
  );
}
export default Signup;
