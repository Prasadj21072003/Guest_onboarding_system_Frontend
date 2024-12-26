import React, { useEffect, useState } from "react";
import Usezustand from "../components/Usezustand";
import { useNavigate } from "react-router";
import axios from "axios";
import { url } from "../data";

const Guestpanellogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setdata] = useState();

  const [error, seterror] = useState(false);
  const { setguestlogin, setuser } = Usezustand();
  let navigate = useNavigate();
  var path = window.location.pathname;
  var id = path.split("/")[2];

  useEffect(() => {
    const getiddata = async () => {
      if (path.includes("editguestform") || path.includes("infolist")) {
        const resp = await axios.get(`${url}/api/guests/${id}`, {
          headers: {
            email: "random@gmail.com",
            pass: "random",
          },
        });

        id = resp.data.hotelid;
      }

      try {
        const resp = await axios.get(`${url}/api/hotels/${id}`, {
          headers: {
            email: "random@gmail.com",
            pass: "random",
          },
        });

        setdata(resp?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getiddata();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === data?.guestpanelemail && password === data?.guestpanelpass) {
      setguestlogin({ email: email, password: password });
      setuser({ email: "random@gmail.com", password: "random" });
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
          Guest Panel Login
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
          class="relative w-full inline-flex mt-[30px] items-center justify-center p-4 px-6 py-[22px] overflow-hidden font-medium bg-indigo-600 text-white transition duration-300 ease-out border-[1px] hover:border-indigo-600 rounded-lg shadow-md group"
        >
          <span class="absolute inset-0 flex items-center justify-center w-full h-full text-indigo-600 duration-300 -translate-x-full bg-white group-hover:translate-x-0 ease">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span class="absolute font-normal flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
            Login
          </span>
        </button>
      </form>
    </div>
  );
};

export default Guestpanellogin;
