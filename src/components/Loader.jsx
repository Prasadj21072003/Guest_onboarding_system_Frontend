import React from "react";
import { Oval } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#3949AB"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
