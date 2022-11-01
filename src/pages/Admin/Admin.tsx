import React from "react";
import { useState } from "react";
import AdminAddClass from "../../components/Admin/AdminAddClass";
import MembershipOverview from "../../components/Admin/MembershipOverview";

const Admin = () => {
  const [open, setOpen] = useState(true);
  const [Dashboard, setDashboard] = useState(0);

  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Create Classes", src: "Chat" },
  ];
  return (
    <div
      className="relative pt-16 flex font-roboto"
      style={{ minHeight: "100vh" }}
    >
      <div className="absolute top-0 w-full h-full bg-top bg-cover bg-orange-500"></div>
      <div className="flex relative h-full">
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-white h-screen p-5 pt-8 relative duration-300 `}
        >
          <span
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full bg-orange-500 text-white ${
             !open && "rotate-180"
           } material-symbols-outlined`}
            onClick={() => setOpen(!open)}
          >
            arrow_right_alt
          </span>
          <div className="flex gap-x-4 items-center"></div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-orange-500 text-sm items-center gap-x-4 
              ${index === 0 && "bg-light-white"} `}
              >
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                  onClick={() => setDashboard(index)}
                >
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-screen p-7 text-white w-1/5">
          <h1 className="text-2xl font-semibold w-full ">Admin Page</h1>
        </div>
      </div>

      <div className="relative text-center w-4/5 px-40">
        {Dashboard === 0 && <MembershipOverview />}
        {Dashboard === 1 && <AdminAddClass />}
      </div>
      {/*

      
        <div className="container relative mx-auto" data-aos="fade-in">
          <div className="items-center flex flex-wrap">
            <div className="w-full px-4 ml-auto mr-auto text-center">
              <div>
                <h1 className="text-white font-semibold text-5xl uppercase">
                  Add Class
                </h1>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4 mx-auto mt-3"></div>
          </div>
        </div>
      
      */}
    </div>
  );
};

export default Admin;
