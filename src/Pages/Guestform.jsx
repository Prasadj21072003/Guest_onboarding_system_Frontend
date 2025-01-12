import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { url } from "../data";

const Guestform = () => {
  const [data, setdata] = useState({
    hotelid: "",
    logo: "",
    hotelname: "",
    hoteladdress: "",
    name: "",
    number: "",
    address: "",
    purpose: "",
    stayfrom: "",
    stayto: "",
    email: "",
    proofno: "",
  });
  const [error, seterror] = useState({
    number: false,
    proofno: false,
  });
  const [submiton, setsubmiton] = useState(false);
  let navigate = useNavigate();

  /*
 The function `checknumber` validates input values for a phone number and proof number based on their
 length.
 */
  const checknumber = (e) => {
    if (e.target.name === "number") {
      if (e.target.value.toString().length === 10) {
        setdata({ ...data, number: e.target.value });
        seterror({ ...error, number: false });
      } else {
        seterror({ ...error, number: true });
      }
    } else {
      if (e.target.value.toString().length === 12) {
        setdata({ ...data, proofno: e.target.value });
        seterror({ ...error, proofno: false });
      } else {
        seterror({ ...error, proofno: true });
      }
    }
  };

  /*
  The function `postData` is an asynchronous function that handles form submission by making a POST
  request to a create guest and navigating to a thank you page upon successful submission.
 */
  const postdata = async (e) => {
    e.preventDefault();
    setsubmiton(true);
    if (error.number === false && error.proofno === false) {
      try {
        const resp = await axios.post(`${url}/api/guests/`, data);
        console.log(resp.data);
        setsubmiton(false);

        if (resp?.data?._id) {
          navigate("/thankyou");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  /* getiddata function get hotel data based on id  */
  useEffect(() => {
    var id = window.location.pathname.split("/")[2];
    const getiddata = async () => {
      try {
        const resp = await axios.get(`${url}/api/hotels/${id}`, {
          headers: {
            email: "random@gmail.com",
            pass: "random",
          },
        });

        setdata({
          hotelid: resp?.data._id,
          logo: resp?.data.logo,
          hotelname: resp?.data.name,
          hoteladdress: resp?.data.address,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getiddata();
  }, []);

  return (
    <div className="max-xl:max-w-[570px] mx-auto bg-white shadow-[0px_1px_23px_11px_rgba(0,_0,_0,_0.1)] border-spacing-6 border-gray-200 rounded-lg my-[2rem] p-6  xl:w-[85vw]  xl:h-[91vh] xl:p-8 ">
      <div className="mb-6 w-full ">
        <div className="flex items-center mb-4">
          <img
            src={data?.logo}
            alt="Hotel Logo"
            className="w-[50px] h-[50px] rounded-full mr-4 border border-gray-300"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {data?.hotelname}
            </h2>
            <p className="text-sm text-gray-600 relative left-[3px]">
              {data?.hoteladdress}
            </p>
          </div>
        </div>
        <hr className="border-gray-200" />
      </div>

      <form className="xl:flex xl:gap-[50px] h-[86%]" onSubmit={postdata}>
        <div className=" w-full xl:w-[50%] flex flex-col xl:justify-evenly ">
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
                required
                placeholder="Enter your full name"
                onChange={(e) => setdata({ ...data, name: e.target.value })}
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
                required
                placeholder="Enter your mobile number"
                onChange={(e) => checknumber(e)}
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
                placeholder="Enter your address"
                required
                onChange={(e) => setdata({ ...data, address: e.target.value })}
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
                required
                onChange={(e) => setdata({ ...data, purpose: e.target.value })}
                className="mt-1 block w-full rounded-md p-[0.8rem] focus:ring-2 focus:outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>Business</option>
                <option selected>Personal</option>
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
                id="stayFrom"
                required
                onChange={(e) => setdata({ ...data, stayfrom: e.target.value })}
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
                required
                onChange={(e) => setdata({ ...data, stayto: e.target.value })}
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
              required
              onChange={(e) => setdata({ ...data, email: e.target.value })}
              placeholder="Enter your email ID"
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
              required
              onChange={(e) => checknumber(e)}
              placeholder="Enter your ID proof number"
              className="mt-1 block w-full rounded-md p-[0.8rem] focus:ring-2 focus:outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {error?.proofno && submiton && (
              <span className="text-red-500  text-[14px]">
                {" "}
                Enter Valid 12 digit Number
              </span>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Guestform;
