import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";
import Input from "../inputs/Input";

interface loginProps {
  setFormState: Dispatch<SetStateAction<number>>;
}

const LoginComponent = ({ setFormState }: loginProps) => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    console.log(email, password);
    e.preventDefault();

    const response = await fetch(`/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(response);
      toast(json.error, {
        type: "error",
      });
    }
    if (response.ok) {
      console.log(json, response);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      // save the user to local storage
    }
  };

  return (
    <div
      className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg  bg-white"
      data-aos="fade-up-right"
    >
      <ToastContainer />
      <div className="flex-auto p-2 lg:p-10 text-black">
        <form onSubmit={handleSubmit}>
          <div className="relative w-full mb-3 mt-8">
            <Input label={"Email"} type={"email"} handleChange={setEmail} />
          </div>
          <div className="relative w-full mb-3">
            <Input
              label={"Password"}
              type={"password"}
              handleChange={setPassword}
            />
          </div>
          <div className="relative w-full mb-3"></div>
          <div className="text-center mt-6">
            <button
              className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="submit"
              style={{ transition: "all 0.15s ease 0s" }}
            >
              Login
            </button>

            <p
              className=" text-orange-500 mt-5 hover:cursor-pointer"
              onClick={() => setFormState(1)}
            >
              Need a account?
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
