import React, { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Usezustand from "./Usezustand";
import { url } from "../data";

const Hotellist = () => {
  const [data, setdata] = useState([]);
  const { user, setuser, setguestlogin } = Usezustand();
  let navigate = useNavigate();

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "logo",
      headerName: "Logo",
      width: 150,
      renderCell: (params) => {
        return (
          <div className=" h-[100px]  w-full   flex justify-center items-center ">
            <img
              src={`${url}/uploads/${params?.row?.logo}`}
              alt=""
              className=" object-cover w-[90px] h-[90px] rounded-full "
            />
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Hotel Name",
      width: 250,
    },
    { field: "address", headerName: "Address", width: 300 },
    {
      field: "QR Code",
      headerName: "QR Code",

      width: 130,
      renderCell: (params) => {
        return (
          <div className="">
            <Link to={`${url}/QR/` + params?.row?.qr}>
              <img
                src={`${url}/QR/${params?.row?.qr}`}
                alt=""
                width={100}
                height={100}
                className=" object-cover"
              />
            </Link>
          </div>
        );
      },
    },
    {
      field: "guestpanelemail",
      headerName: "Guest Panel Email",
      width: 280,
    },
    {
      field: "guestpanelpass",
      headerName: "Guest Panel Password",
      width: 220,
    },
    {
      field: "allguests",
      headerName: "Guest Panel",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex items-center cursor-pointer  h-[100%]">
            <span
              className="text-indigo-600 underline underline-offset-2"
              onClick={() => {
                setguestlogin("");
                setuser("");
                navigate("/guestadmin/" + params?.row?._id);
              }}
            >
              Link
            </span>
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex items-center cursor-pointer  h-[100%]">
            <Link to={"/edithotelform/" + params?.row?._id}>
              <button className="bg-[rgb(109,_208,_109)] transition-all ease duration-300 hover:bg-indigo-600 flex items-center text-[white] px-[20px] py-[1px] h-[35px] mr-[10px] rounded-[8px] border-[none] cursor-pointer">
                Edit
              </button>
            </Link>
            <DeleteOutlineIcon
              className="text-red-700 hover:text-red-900"
              onClick={() => handledelete(params?.row?._id)}
            />
          </div>
        );
      },
    },
  ];

  /* handledelete function delete the hotel based on id  */
  const handledelete = async (id) => {
    console.log(id);
    const resp = await axios.delete(`${url}/api/hotels/${id}`, {
      headers: {
        email: user?.email,
        pass: user?.password,
      },
    });
    console.log(resp?.data);
    setdata(data?.filter((item) => item?._id !== id));
  };

  /* The getdata function get hotels data */
  const getdata = async () => {
    try {
      const resp = await axios.get(`${url}/api/hotels`, {
        headers: {
          email: user?.email,
          pass: user?.password,
        },
      });
      setdata(resp?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="relative top-[50px] w-full h-screen px-[2rem] max-md:px-[0.5rem] py-[1rem]">
      <div className="px-[20px] py-[30px]">
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
      </div>
    </div>
  );
};

export default Hotellist;
