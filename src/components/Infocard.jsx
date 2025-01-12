import React, { useState } from "react";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import { url } from "../data";

const Infocard = ({ func, data }) => {
  const [openIndex, setOpenIndex] = useState(null);
  let navigate = useNavigate();

  const items = [
    {
      label: "Hotel Info",
      fields: ["logo", "hotelname", "hoteladdress"],
    },
    { label: "Guest Info", fields: ["name", "number", "address"] },
    { label: "Stay Details", fields: ["purpose", "stayfrom", "stayto"] },
    { label: "Contact Info", fields: ["email", "proofno"] },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="sm:max-w-[580px] max-sm:w-[91vw] mx-auto bg-white shadow-lg rounded-lg p-4 border border-gray-400">
      <div className="w-full  py-[0.1rem] px-[0.6rem] ">
        <div className="w-fit h-fit  ml-auto cursor-pointer" onClick={func}>
          <CloseIcon />
        </div>
      </div>
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-300">
          {/* Accordion Header */}
          <div
            className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-4 h-4 ${
                  index === openIndex ? "bg-blue-600" : "bg-gray-400"
                } rounded-full`}
              ></span>
              <h3 className="text-gray-800 font-medium">{item.label}</h3>
            </div>
            <motion.span
              className={` ${
                index === openIndex ? "text-blue-600" : "text-gray-500"
              }`}
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▼
            </motion.span>
          </div>

          {/* Accordion Content */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: openIndex === index ? "auto" : 0,
              opacity: openIndex === index ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gray-50 text-gray-600">
              <ul className="space-y-2">
                {item.fields.map((field) => (
                  <li key={field} className="flex justify-between">
                    <span className="font-semibold">{field}</span>
                    {field !== "logo" ? (
                      <span className=" max-w-[60%] text-right">
                        {data[field]}
                      </span>
                    ) : (
                      <img
                        src={data?.logo}
                        alt=""
                        width={100}
                        height={100}
                        className="w-[50px] h-[50px] rounded-full my-[3px] border border-gray-300 "
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      ))}
      <div className="mt-[1.5rem]  w-full flex justify-center items-center">
        <button
          onClick={() => navigate("/infolist/" + data?._id)}
          className="rounded px-5 py-2 m-1 overflow-hidden relative group cursor-pointer border-[1px]  border-blue-600 text-blue-600 "
        >
          <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
          <span className="relative text-blue-600 transition duration-300 group-hover:text-white ease">
            Print
          </span>
        </button>
      </div>
    </div>
  );
};

export default Infocard;
