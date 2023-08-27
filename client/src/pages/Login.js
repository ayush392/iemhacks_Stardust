import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async function (e) {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex flex-row justify-around">
      <div className="w-full md:w-[500px] h-screen p-2 px-8 bg-white">
        <h1 className="text-7xl font-semibold mt-16 mb-8 font-tulpen">
          DEVCONNECT
        </h1>
        <h3 className="text-xl my-5">Login to your account.</h3>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email:</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="px-4 py-1 bg-gray-200 rounded-md mb-6"
          />

          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password here..."
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="px-4 py-1 bg-gray-200 rounded-md mb-6"
          />

          <button
            disabled={isLoading}
            className="bg-black text-white px-5 py-2 rounded-md"
          >
            LOGIN
          </button>

          {error && <div className="error">{error}</div>}
        </form>
        <div className="text-sm">
          <p>Don't have an account?</p>
          <Link to={"/signup"}>
            Click{" "}
            <span className="underline italic hover:text-blue-800">here</span>{" "}
            to signup instead
          </Link>
        </div>
      </div>
      <div>
        <img
          className="block h-[60%] mt-20"
          src="./loginImg.svg"
          alt="Background"
          // className="object-cover overflow-hidden h-full w-full rotate-180 -z-20 absolute top-0 right-0"
        />
      </div>
    </div>
  );
}

export default Login;
