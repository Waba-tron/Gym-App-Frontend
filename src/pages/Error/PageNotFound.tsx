import React from "react";

const PageNotFound = () => {
  return (
    <div
      className="relative pt-16 pb-16 flex content-center items-center justify-center font-roboto"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="absolute top-0 w-full h-full bg-top bg-cover"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80")',
        }}
      >
        <span
          id="blackOverlay"
          className="w-full h-full absolute opacity-75 bg-black"
        />
      </div>
      <div className="container relative mx-auto mt-2" data-aos="fade-in">
        <div className="items-center flex flex-wrap">
          <div className="w-full px-12 ml-auto mr-auto text-center">
            <div>
              <h1 className="text-white font-bold text-5xl uppercase tracking-tight">
                Page <span className="text-orange-500">Not found</span>
              </h1>
            </div>

            <div className="flex space-x-8 mt-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
