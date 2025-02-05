import React, { useEffect, useState } from "react";
import Usezustand from "../components/Usezustand";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState(false);
  const { setuser, user } = Usezustand();
  let navigate = useNavigate();
  let path = window.location.pathname;

  /*
   The handleSubmit function checks if the email and password match a specific value and either sets
   the user data and navigates to a new path or sets an error flag.
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "random@gmail.com" && password === "random") {
      setuser({ email: "random@gmail.com", password: "random" });
      window.localStorage.setItem(
        "user",
        JSON.stringify({ email: "random@gmail.com", password: "random" })
      );
      navigate(path);
    } else {
      seterror(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg border border-gray-300 rounded-lg px-[1.5rem] py-[2rem] w-full max-w-[450px] flex flex-col justify-evenly mx-[1rem] h-[70vh]"
      >
        <h2 className="text-[2rem] font-bold text-blue-600  text-center">
          Login
        </h2>

        <div className="">
          <label
            htmlFor="email"
            className="block text-gray-600 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="">
          <label
            htmlFor="password"
            className="block text-gray-600 font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {error && (
          <span className="text-center text-red-600">Invalid credentials</span>
        )}

        <button
          type="submit"
          className="relative w-full inline-flex mt-[30px] items-center justify-center p-4 px-6 py-[22px] overflow-hidden font-medium bg-indigo-600 text-white transition duration-300 ease-out border-[1px] hover:border-indigo-600 rounded-lg shadow-md group"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-indigo-600 duration-300 -translate-x-full bg-white group-hover:translate-x-0 ease">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="absolute  flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
            Login
          </span>
        </button>
      </form>
    </div>
  );
};

export default Login;
