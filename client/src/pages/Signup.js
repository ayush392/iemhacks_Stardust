import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async function (e) {
    e.preventDefault();
    // console.log(email, password)
    await signup(email, password, username, fullName);
  };

  return (
    <div className="flex flex-row justify-around">
      <div className="flex flex-col ">
        <div className="w-full md:w-[500px] h-screen p-2 px-8 bg-white">
          <h1 className="text-7xl font-semibold mt-16 mb-8 font-tulpen">
            DEVCONNECT
          </h1>
          <h3 className="text-xl my-5">Sign-up now.</h3>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label>Full Name:</label>
            <input placeholder="Enter your full name" type="text" value={fullName} onChange={e => setFullName(e.target.value)}
              className="px-4 py-1 bg-gray-200 rounded-md mb-6" />

            <label>Github username:</label>
            <input placeholder="Enter your Github username" type="text" value={username} onChange={e => setUserName(e.target.value)}
              className="px-4 py-1 bg-gray-200 rounded-md mb-6" />

            <label>Email:</label>
            <input
              placeholder="Enter your mail id"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="px-4 py-1 bg-gray-200 rounded-md mb-6"
            />

            <label>Password:</label>
            <input
              placeholder="Choose a strong password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="px-4 py-1 bg-gray-200 rounded-md mb-6"
            />

            <button
              disabled={isLoading}
              className="bg-black text-white px-5 py-2 rounded-md"
            >
              SIGN UP
            </button>
            {error && <div className="error">{error}</div>}
          </form>
          <div className="text-sm mt-10">
            <p>Already have an account?</p>
            <Link to={"/login"}>
              Click{" "}
              <span className="underline italic hover:text-blue-800">here</span>{" "}
              to login instead
            </Link>
          </div>
        </div>
      </div>
      <div className="h-screen">
        <img
          className="mt-20 block"
          src="./signUp.svg"
          alt="Background"
        // className="object-cover overflow-hidden h-full w-full rotate-180 -z-20 absolute top-0 right-0"
        />
      </div>
    </div>
  );
}

export default Signup;
