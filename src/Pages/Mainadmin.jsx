import React, { useState } from "react";
import Hotellist from "../components/Hotellist";

import Hotelform from "../components/Hotelform";
import AddIcon from "@mui/icons-material/Add";

const Mainadmin = () => {
  const [formon, setformon] = useState(false);
  const func = () => {
    setformon(false);
  };
  return (
    <div className="">
      {!formon && (
        <div className="w-full relative top-[80px] flex justify-between items-center my-[1rem]  md:px-[4rem] max-md:px-[2rem]">
          <h1 className=" text-[1.4rem]  md:text-[2rem] font-bold text-gray-400">
            Hotel List
          </h1>

          <button
            onClick={() => setformon(true)}
            className="relative inline-flex justify-center w-[135px] items-center  py-[0.5rem] px-[1rem] overflow-hidden    hover:text-blue-600 border-[1px] hover:border-blue-600 rounded text-white group bg-indigo-600"
          >
            <span className="absolute left-0 block w-full h-0 transition-all bg-white opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex ml-[5px] items-center justify-start w-10 h-10 duration-700 transform translate-x-full group-hover:translate-x-0 ease">
              <AddIcon fontSize="small" />
            </span>
            <span className="relative hover:translate-x-[-15px] duration-500 ease transition-all ">
              Add Hotel
            </span>
          </button>
        </div>
      )}
      {formon ? (
        <div className=" relative pt-[1.6rem] md:pt-[4.5rem]">
          <Hotelform func={func} />
        </div>
      ) : (
        <Hotellist />
      )}
    </div>
  );
};

export default Mainadmin;
