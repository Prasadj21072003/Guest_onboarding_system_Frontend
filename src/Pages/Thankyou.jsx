import React from "react";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { motion } from "framer-motion";
const Thankyou = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen shadow-2xl bg-gray-100 text-center  px-[1rem]">
      <div className="p-6 w-full sm:w-[450px] h-[450px] bg-white rounded-lg shadow-md flex flex-col justify-evenly">
        <div className=" h-[50%] flex justify-center items-center">
          <motion.div
            className=" "
            initial={{ scale: 0, opacity: 0, rotateY: 360 }}
            animate={{
              rotateY: 0,
              scale: 8,
              opacity: 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <VerifiedRoundedIcon className=" text-blue-500 " />
          </motion.div>
        </div>
        <div>
          <h1 className="text-2xl max-sm:text-xl font-bold mb-2">
            Thank you for submitting!
          </h1>
          <p className="text-gray-600 mb-6 font-semibold max-sm:text-[1rem] text-[1.2rem]">
            Your registration is sucessfull!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
