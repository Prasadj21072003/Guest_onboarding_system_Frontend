import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axios from "axios";
import Infocard from "./Infocard";
import Usezustand from "./Usezustand";
import { url } from "../data";
import Loader from "./Loader";

const Guestlist = () => {
  console.log(url);

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "logo",
      headerName: "Logo",
      width: 140,
      renderCell: (params) => {
        return (
          <div className=" h-[100px] w-[100px]  flex justify-center items-center">
            <img
              src={params?.row?.logo}
              alt=""
              width={100}
              height={90}
              className="object-cover w-[90px] h-[90px] rounded-full my-[3px] border border-gray-300"
            />
          </div>
        );
      },
    },
    {
      field: "hotelname",
      headerName: "Hotel Name",
      width: 200,
    },
    { field: "hoteladdress", headerName: "Hotel Address", width: 300 },
    { field: "name", headerName: "Full Name", width: 200 },
    { field: "number", headerName: "Phone Number", width: 200 },
    { field: "address", headerName: "Address", width: 300 },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex items-center cursor-pointer  h-[100%]">
            <Link to={"/editguestinfo/" + params?.row?._id}>
              <button className="bg-[rgb(109,_208,_109)] transition-all ease duration-300 hover:bg-indigo-600 flex items-center text-[white] px-[15px] py-[1px] h-[35px] mr-[10px] rounded-[5px] border-[none] cursor-pointer">
                Edit
              </button>
            </Link>
            <button
              onClick={() => setinfoon(params?.row)}
              className="bg-indigo-600 hover:bg-[rgb(109,_208,_109)]  transition-all ease duration-300 flex items-center text-[white] px-[15px] py-[1px] h-[35px] mr-[10px] rounded-[5px] border-[none] cursor-pointer"
            >
              View
            </button>
          </div>
        );
      },
    },
  ];

  const [data, setdata] = useState([]);
  const [infoon, setinfoon] = useState(null);
  const { user, setloaderon, loaderon } = Usezustand();

  /*
 The function `getdata` fetches guest data based on the ID from an API using Axios.
 */
  const getdata = async () => {
    try {
      var id = window.location.pathname.split("/")[2];
      const resp = await axios.get(`${url}/api/guests/byhotelid/${id}`, {
        headers: {
          email: user?.email,
          pass: user?.password,
        },
      });
      console.log(resp?.data);
      setdata(resp?.data);
      setloaderon(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const func = () => {
    setinfoon(null);
  };

  return (
    <div className="relative top-[50px] w-full h-screen px-[2rem] max-md:px-[0.5rem] py-[1rem] ">
      {loaderon ? (
        <div className="px-[20px] py-[50px]">
          <Loader />
        </div>
      ) : (
        <div className="px-[20px] py-[30px] max-sm:px-[10px] relative">
          <DataGrid
            disableRowSelectionOnClick
            rows={data}
            columns={columns}
            getRowId={(row) => row?._id}
            rowHeight={105}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
          {infoon !== null && (
            <div className=" w-full max-sm:w-[100%] h-auto  pt-[4rem] left-0 fixed top-[5%] z-[999] sm:mx-auto my-auto   ">
              <Infocard func={func} data={infoon} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Guestlist;
