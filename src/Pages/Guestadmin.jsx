import React from "react";
import Guestlist from "../components/Guestlist";

const Guestadmin = () => {
  return (
    <div>
      <div className="w-full relative top-[80px] flex justify-between items-center my-[1rem]  md:px-[4rem] max-md:px-[2rem]">
        <h1 className=" text-[1.4rem]  md:text-[2rem] font-bold text-gray-400">
          Guest List
        </h1>
      </div>
      <Guestlist />
    </div>
  );
};

export default Guestadmin;
