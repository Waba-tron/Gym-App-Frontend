import React, { useState } from "react";
import LoginComponent from "../../components/Auth/LoginComponent";
import SignUpComponent from "../../components/Auth/SignUpComponent";

const Login = () => {
  const [formState, setFormState] = useState(0);

  return (
    <div
      className="relative pt-16 pb-16 flex content-center items-center justify-center font-roboto"
      style={{ minHeight: "100vh" }}
    >
      <div className="absolute top-0 w-full h-full bg-top bg-cover bg-orange-500"></div>
      <div className="container relative mx-auto" data-aos="fade-in">
        <div className="items-center flex flex-wrap">
          <div className="w-full px-4 ml-auto mr-auto text-center">
            <div>
              <h1 className="text-white font-semibold text-5xl uppercase">
                {formState === 0 ? "Login" : "Sign Up"}
              </h1>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4 mx-auto mt-3">
            {formState === 0 && <LoginComponent setFormState={setFormState} />}
            {formState === 1 && <SignUpComponent setFormState={setFormState} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
