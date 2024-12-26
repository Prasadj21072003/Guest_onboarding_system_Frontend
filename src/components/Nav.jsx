import React, { useState } from "react";
import { Link } from "react-router-dom";
import Usezustand from "./Usezustand";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setuser, setguestlogin } = Usezustand();

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 z-10 px-[1rem] ">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <span className="text-2xl font-bold text-indigo-600">Adminpanel</span>

        <button
          className="text-gray-600 lg:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        <div
          className={`lg:flex lg:items-center lg:space-x-6  ${
            isOpen ? "block py-[15px]" : "hidden"
          } absolute lg:relative bg-white w-full lg:w-auto left-0 top-full lg:top-0 shadow-lg lg:shadow-none`}
        >
          <button
            onClick={() => {
              setguestlogin("");
              setuser("");
            }}
            className="relative inline-flex justify-center w-[115px] items-center  py-[0.5rem] px-[1rem] overflow-hidden   text-indigo-600 border-[1px] border-indigo-600 rounded bg-white hover:text-white group hover:bg-indigo-600"
          >
            <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex ml-[5px] items-center justify-start w-10 h-10 duration-700 transform translate-x-full group-hover:translate-x-0 ease">
              <KeyboardArrowRightIcon fontSize="small" />
            </span>
            <span className="relative hover:translate-x-[-15px] duration-500 ease transition-all ">
              Logout
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
