import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import axios from "axios";
import Usezustand from "../components/Usezustand";
import { url } from "../data";

const Editguestform = () => {
  var id = window.location.pathname.split("/")[2];
  const [data, setdata] = useState();
  const [newdata, setnewdata] = useState(data);
  const [hoteldata, sethoteldata] = useState();
  const [submiton, setsubmiton] = useState(false);
  const { user } = Usezustand();
  const [error, seterror] = useState({
    number: false,
    idnumber: false,
  });
  let navigate = useNavigate();

  const editdata = async (e) => {
    e.preventDefault();
    setsubmiton(true);
    console.log(newdata);
    if (error.number === false && error.idnumber === false) {
      try {
        console.log(newdata);
        const resp = await axios.put(`${url}/api/guests/${id}`, newdata, {
          headers: {
            email: user?.email,
            pass: user?.password,
          },
        });
        console.log(resp?.data);
        setsubmiton(false);
        navigate(`/guestadmin/${data?.hotelid}`);
      } catch (error) {
        console.log("error: " + error);
      }
    }
  };

  const checknumber = (e) => {
    if (e.target.value.toString().length === 10) {
      setnewdata({ ...newdata, number: e.target.value });
      seterror({ ...error, number: false });
    } else if (e.target.value.toString().length === 0) {
      setnewdata({ ...newdata, number: data?.number });
      seterror({ ...error, number: false });
    } else {
      seterror({ ...error, number: true });
    }
  };

  const checkidproof = (e) => {
    if (
      e.target.value.toString().length === 12 ||
      e.target.value.toString().length === 0
    ) {
      setnewdata({ ...newdata, proofno: e.target.value });
      seterror({ ...error, idnumber: false });
    } else if (e.target.value.toString().length === 0) {
      setnewdata({ ...newdata, proofno: data?.proofno });
      seterror({ ...error, idnumber: false });
    } else {
      seterror({ ...error, idnumber: true });
    }
  };

  const checkinputs = (e) => {
    if (e.target.value.length === 0) {
      setnewdata({ ...newdata, [e.target.name]: data[e.target.name] });
    } else {
      setnewdata({ ...newdata, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    const getiddata = async () => {
      try {
        const resp = await axios.get(`${url}/api/guests/${id}`, {
          headers: {
            email: user?.email,
            pass: user?.password,
          },
        });
        setdata(resp?.data);
        const res = await axios.get(
          `${url}/api/hotels/${resp?.data?.hotelid}`,
          {
            headers: {
              email: user?.email,
              pass: user?.password,
            },
          }
        );
        sethoteldata(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getiddata();
  }, []);

  useEffect(() => {
    setnewdata(data);
  }, [data]);

  return (
    <div>
      <div className=" md:mt-[100px] mt-[80px]">
        <div className="max-xl:max-w-[570px] mx-auto bg-white shadow-[0px_1px_23px_11px_rgba(0,_0,_0,_0.1)] border border-gray-200 rounded-lg my-[2rem] p-6  xl:w-[85vw]  xl:h-auto xl:p-8 ">
          <div className="mb-6 w-full ">
            <div className="flex items-center mb-4">
              <img
                src={`${url}/uploads/${data?.logo}`}
                alt="Hotel Logo"
                className="w-[50px] h-[50px] rounded-full mr-4 border border-gray-300"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {hoteldata?.name}
                </h2>
                <p className="text-sm text-gray-600">{hoteldata?.address}</p>
              </div>
            </div>
            <hr className="border-gray-200" />
          </div>

          <form className="xl:flex xl:gap-[50px] h-[86%]" onSubmit={editdata}>
            <div className=" w-full xl:w-[50%] flex flex-col xl:justify-evenly">
              <div className="flex flex-col gap-[2rem]">
                <div className="mb-4">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="name"
                    onChange={(e) => checkinputs(e)}
                    placeholder={data?.name}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-[0.8rem] focus:ring-2 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="mobileNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="number"
                    onChange={(e) => checknumber(e)}
                    placeholder={data?.number}
                    className="mt-1 block w-full rounded-md p-[0.8rem] focus:ring-2 focus:outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {error?.number && submiton && (
                    <span className="text-red-500  text-[14px]">
                      {" "}
                      Enter Valid 10 digit Number
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    onChange={(e) => checkinputs(e)}
                    placeholder={data?.address}
                    rows={3}
                    className="mt-1 block w-full rounded-md p-[0.8rem] focus:ring-2 focus:outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="purpose"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Purpose of Visit
                  </label>
                  <select
                    id="purpose"
                    name="purpose"
                    onChange={(e) => checkinputs(e)}
                    className="mt-1 block w-full rounded-md p-[0.8rem] focus:ring-2 focus:outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option>Business</option>
                    <option>Personal</option>
                    <option>Tourist</option>
                  </select>
                </div>
              </div>
            </div>

            <div className=" w-full xl:w-[50%] flex flex-col xl:justify-evenly ">
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="stayFrom"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Stay From
                  </label>
                  <input
                    type="date"
                    name="stayfrom"
                    id="stayFrom"
                    onChange={(e) => checkinputs(e)}
                    placeholder={data?.stayfrom}
                    className="mt-1 block w-full rounded-md p-[0.8rem] focus:ring-2 focus:outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="stayTo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Stay To
                  </label>
                  <input
                    type="date"
                    id="stayTo"
                    name="stayto"
                    onChange={(e) => checkinputs(e)}
                    className="mt-1 block w-full rounded-md p-[0.8rem] focus:ring-2 focus:outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email ID
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => checkinputs(e)}
                  placeholder={data?.email}
                  className="mt-1 block w-full rounded-md p-[0.8rem] focus:ring-2 focus:outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="idProof"
                  className="block text-sm font-medium text-gray-700"
                >
                  ID Proof Number
                </label>
                <input
                  type="text"
                  id="idProof"
                  name="proofno"
                  onChange={(e) => checkidproof(e)}
                  placeholder={data?.proofno}
                  className="mt-1 block w-full rounded-md p-[0.8rem] focus:ring-2 focus:outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {error.idnumber && submiton && (
                  <span className="text-red-500 text-[14px]">
                    {" "}
                    Enter Valid 12 Digit ID Number
                  </span>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="relative w-full inline-flex mt-[30px] items-center justify-center p-4 px-6 py-[22px] overflow-hidden font-medium bg-indigo-600 text-white transition duration-300 ease-out border-[1px] hover:border-indigo-600 rounded-lg shadow-md group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-indigo-600 duration-300 -translate-x-full bg-white group-hover:translate-x-0 ease">
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
                  <span className="absolute font-semibold flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    Edit
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editguestform;
