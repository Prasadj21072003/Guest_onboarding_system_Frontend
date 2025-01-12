import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Usezustand from "./Usezustand";
import { url } from "../data";
const Hotelform = ({ func }) => {
  const [data, setdata] = useState({
    name: "",
    address: "",
    guestpanelemail: "",
    guestpanelpass: "",
  });
  const [image, setimage] = useState();
  const [error, seterror] = useState(false);
  const [hoteldatasubmmited, sethoteldatasubmmited] = useState(false);
  const { user } = Usezustand();

  /* the submit function make a post request to create hotel */
  const submit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("name", data?.name);
    formdata.append("address", data?.address);
    formdata.append("guestpanelemail", data?.guestpanelemail);
    formdata.append("guestpanelpass", data?.guestpanelpass);
    if (error === false) {
      sethoteldatasubmmited(true);
      try {
        const resp = await axios.post(`${url}/api/hotels/`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            email: user?.email,
            pass: user?.password,
          },
        });
        console.log(resp.data);
        func();
        sethoteldatasubmmited(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="max-xl:max-w-md mx-auto flex flex-col gap-[2rem] bg-white shadow-xl border border-gray-200 rounded-lg p-6 mt-[1rem] mb-[2rem] xl:w-[80vw]">
      <div className=" w-full h-fit cursor-pointer relative  ">
        <div onClick={func} className="w-fit h-fit  absolute right-[10px]">
          <CloseIcon fontSize="medium" />
        </div>
      </div>
      <h2 className="text-[20px] xl:text-[26px] tracking-wide mb-6 border-b border-b-gray-300 pb-[1rem]  text-indigo-600 font-bold">
        HOTEL DETAILS
      </h2>
      <form
        onSubmit={submit}
        className="flex flex-col gap-[2rem] xl:flex-row xl:gap-[50px] "
      >
        <div className="xl:w-[50%] ">
          <div className=" mb-6">
            <label
              htmlFor="hotelName"
              className="block text-sm font-medium text-gray-600"
            >
              Hotel Name
            </label>
            <input
              type="text"
              required
              id="hotelName"
              placeholder="Enter hotel name"
              onChange={(e) => setdata({ ...data, name: e.target.value })}
              className="mt-1 block w-full rounded-md p-[0.8rem] border-gray-300 shadow-sm focus:ring-2 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className=" mb-6">
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-600"
            >
              Logo
            </label>
            <input
              type="file"
              id="logo"
              required
              onChange={(e) => setimage(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-gray-600 file:bg-gray-100 hover:file:bg-gray-200"
            />
          </div>

          <div className=" mb-6">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-600"
            >
              Address
            </label>
            <textarea
              id="address"
              required
              placeholder="Enter address"
              rows={3}
              onChange={(e) => setdata({ ...data, address: e.target.value })}
              className="mt-1 block p-[0.8rem] w-full rounded-md border-gray-300 shadow-sm focus:ring-2  focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
          </div>
        </div>

        <div className="xl:w-[50%] xl:flex xl:flex-col xl:justify-evenly">
          <div className=" mb-6">
            <label
              htmlFor="Guestemail"
              className="block text-sm font-medium text-gray-600"
            >
              Guest Panel Login Email
            </label>
            <input
              type="email"
              required
              id="Guestemail"
              placeholder="Enter Guest Panel Login Email"
              onChange={(e) =>
                setdata({ ...data, guestpanelemail: e.target.value })
              }
              className="mt-1 block w-full rounded-md p-[0.8rem] border-gray-300 shadow-sm focus:ring-2 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className=" mb-6">
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
              placeholder="Enter Guest Panel Login Password"
              onChange={(e) => {
                if (e.target.value.toString().length > 6) {
                  setdata({ ...data, guestpanelpass: e.target.value });
                  seterror(false);
                } else {
                  seterror(true);
                }
              }}
              className="mt-1 block w-full rounded-md p-[0.8rem] border-gray-300 shadow-sm focus:ring-2 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {error && (
              <span className="text-red-500  text-[14px] ">
                {" "}
                Password Should be atleast 6 digits
              </span>
            )}
          </div>
          <div
            className={`mt-1 ${
              hoteldatasubmmited === false
                ? `pointer-events-auto`
                : `pointer-events-none`
            }`}
          >
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
              <span class="absolute  flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                Submit
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Hotelform;
