import axios from "axios";
import React, { useEffect, useState } from "react";
import Usezustand from "../components/Usezustand";
import PrintIcon from "@mui/icons-material/Print";
import { url } from "../data";

const Infolist = () => {
  console.log(url);
  const [data, setdata] = useState();
  const { user } = Usezustand();

  /* getiddata function get guest data based on id */
  useEffect(() => {
    const getiddata = async () => {
      var id = window.location.pathname.split("/")[2];
      try {
        const resp = await axios.get(`${url}/api/guests/${id}`, {
          headers: {
            email: user?.email,
            pass: user?.password,
          },
        });
        setdata(resp?.data);
        console.log(resp?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getiddata();
  }, []);

  return (
    <div className="w-full h-auto flex justify-center items-center  bg-white ">
      <div className=" my-[50px]  border border-gray-300 rounded-[10px] bg-gray-50 relative  w-[600px] max-sm:w-[90vw] shadow-2xl h-auto  rounded-b-lg px-[2rem] max-sm:px-[1rem] pt-[2rem]">
        <ul className=" text-gray-700 flex flex-col gap-[1rem] max-sm:gap-[0.5rem] text-left">
          <li className="flex justify-between">
            <strong>Logo:</strong>{" "}
            <img
              src={data?.logo}
              alt=""
              width={100}
              height={100}
              className="w-[50px] h-[50px] rounded-full my-[3px] border border-gray-300 "
            />
          </li>
          <li className="flex justify-between">
            <strong>Hotel Name:</strong> {data?.hotelname}
          </li>

          <li className="flex justify-between">
            <strong>Hotel Address:</strong> {data?.hoteladdress}
          </li>
          <li className="flex justify-between">
            <strong>Guest Name:</strong> {data?.name}
          </li>
          <li className="flex justify-between">
            <strong>Contact Number:</strong> {data?.number}
          </li>
          <li className="flex justify-between">
            <strong>Guest Address:</strong>{" "}
            <span className="w-[60%] text-right">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              aliquam dignissimos molestias nemo aliquid facere inventore
              temporibus culpa nam! Eum quis sapiente veritatis vero velit quo
              atque soluta sit odit.
            </span>
          </li>
          <li className="flex justify-between">
            <strong>Purpose:</strong> {data?.purpose}
          </li>
          <li className="flex justify-between">
            <strong>Stay From:</strong> {data?.stayfrom}
          </li>
          <li className="flex justify-between">
            <strong>Stay To:</strong> {data?.stayto}
          </li>
          <li className="flex justify-between">
            <strong>Email:</strong> {data?.email}
          </li>
          <li className="flex justify-between">
            <strong>Proof No:</strong> {data?.proofno}
          </li>

          <div className="  w-full flex justify-center items-center p-[1rem] border-t  border-t-gray-300 ">
            <button
              onClick={() => window.print()}
              class="relative inline-flex justify-center w-[115px] items-center  py-[0.5rem] px-[1rem] overflow-hidden    hover:text-blue-600 border-[1px] hover:border-blue-600 rounded text-white group bg-indigo-600"
            >
              <span class="absolute left-0 block w-full h-0 transition-all bg-white opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
              <span class="absolute right-0 flex ml-[5px] items-center justify-start w-10 h-10 duration-700 transform translate-x-full group-hover:translate-x-0 ease">
                <PrintIcon fontSize="small" />
              </span>
              <span class="relative hover:translate-x-[-15px] duration-500 ease transition-all ">
                Print
              </span>
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Infolist;
