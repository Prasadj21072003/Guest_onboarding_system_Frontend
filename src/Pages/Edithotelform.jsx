import React, { useEffect, useState } from "react";
import { url } from "../data";

import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import Usezustand from "../components/Usezustand";

const Edithotelform = () => {
  const [data, setdata] = useState();
  const [newdata, setnewdata] = useState(data);
  const { user } = Usezustand();
  let navigate = useNavigate();
  let id = window.location.pathname.split("/")[2];

  /*
   The `editdata` function sends a PUT request to update hotel data using Axios.
   */
  const editdata = async () => {
    try {
      console.log(newdata);
      const resp = await axios.put(`${url}/api/hotels/${id}`, newdata, {
        headers: {
          email: user?.email,
          pass: user?.password,
        },
      });
      console.log(resp?.data);
      navigate("/");
    } catch (error) {
      console.log("error: " + error);
    }
  };

  /* The `useEffect` hook in the provided code snippet is responsible for fetching data for a specific
hotel based on the `id` parameter. */

  useEffect(() => {
    const getiddata = async () => {
      try {
        const resp = await axios.get(`${url}/api/hotels/${id}`, {
          headers: {
            email: user?.email,
            pass: user?.password,
          },
        });
        console.log(resp.data);
        setdata(resp?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getiddata();
  }, []);

  /* The `useEffect` hook in the provided code snippet is responsible for updating the `newdata` state
whenever the `data` state changes. */

  useEffect(() => {
    setnewdata(data);
  }, [data]);

  /*
   The function `checkinputs` updates the `newdata` state based on the length of the input value of a target
   element.
  */
  const checkinputs = (e) => {
    if (e.target.value.length === 0) {
      setnewdata({ ...newdata, [e.target.name]: data[e.target.name] });
    } else {
      setnewdata({ ...newdata, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <div className=" md:mt-[120px] mt-[80px]">
        <div className="max-xl:max-w-md mx-auto flex flex-col gap-[2rem] bg-white shadow-xl border border-gray-200 rounded-lg p-6 my-[2rem] xl:w-[80vw]">
          <div className=" w-full h-fit cursor-pointer relative  ">
            <div className="w-fit h-fit  absolute right-[10px]">
              <Link to={"/"}>
                <CloseIcon fontSize="medium" />
              </Link>
            </div>
          </div>
          <h2 className="text-[20px] xl:text-[26px] tracking-wide  mb-6 border-b border-b-gray-300 pb-[1rem]  text-indigo-600 font-bold">
            EDIT HOTEL DETAILS
          </h2>
          <div className="flex flex-col gap-[2rem] xl:flex-row xl:gap-[50px] ">
            <div className="xl:w-[50%] ">
              <div className="mb-6">
                <label
                  htmlFor="hotelName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Hotel Name
                </label>
                <input
                  type="text"
                  id="hotelName"
                  name="name"
                  onChange={(e) => checkinputs(e)}
                  placeholder={data?.name}
                  className="mt-1 block w-full rounded-md p-[0.8rem] border-gray-300 shadow-sm focus:ring-2 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="logo"
                  className="block text-sm font-medium text-gray-600"
                >
                  Logo
                </label>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  placeholder={data?.logo}
                  className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-gray-600 file:bg-gray-100 hover:file:bg-gray-200"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="address"
                  name="address"
                  className="block text-sm font-medium text-gray-600"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  placeholder={data?.address}
                  onChange={(e) => checkinputs(e)}
                  rows={3}
                  className="mt-1 block p-[0.8rem] w-full rounded-md border-gray-300 shadow-sm focus:ring-2  focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </div>

            <div className="xl:w-[50%] xl:flex xl:flex-col xl:justify-evenly">
              <div className="mb-6">
                <label
                  htmlFor="Guestemail"
                  className="block text-sm font-medium text-gray-600"
                >
                  Guest Panel Login Email
                </label>
                <input
                  type="text"
                  required
                  id="Guestemail"
                  placeholder={data?.guestpanelemail}
                  onChange={(e) => checkinputs(e)}
                  className="mt-1 block w-full rounded-md p-[0.8rem] border-gray-300 shadow-sm focus:ring-2 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="Guestpassword"
                  className="block text-sm font-medium text-gray-600"
                >
                  Guest Panel Login Password
                </label>
                <input
                  type="text"
                  required
                  id="Guestpassword"
                  placeholder={data?.guestpanelpass}
                  onChange={(e) => checkinputs(e)}
                  className="mt-1 block w-full rounded-md p-[0.8rem] border-gray-300 shadow-sm focus:ring-2 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mt-6">
                <button
                  onClick={editdata}
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
                  <span class="absolute  flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    Edit
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edithotelform;
