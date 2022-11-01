import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";

interface SubscriptionMenuProps {
  subscriptionData: any;
}

const SubscriptionMenu = ({ subscriptionData }: SubscriptionMenuProps) => {
  const [displayPin, setDisplayPin] = useState(false);
  const { values } = useContext(AuthContext);
  const navigate = useNavigate();

  const manageAccount = async () => {
    const response = await fetch(`/api/stripe/manage-subscription`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${values?.user.token}`,
      },
    });

    const body = await response.json();

    if (response.status === 404) {
      navigate("/pricing");
      console.log(response.status);
    }
    if (response.ok) {
      window.location.href = body.url;
    }
  };
  return (
    <>
      <div
        className="relative flex min-w-0 break-words mb-6 shadow-lg bg-white p-7 justify-between account"
        data-aos="fade-up-right"
      >
        <div className="text-left flex flex-col">
          <h1 className="font-extrabold text-3xl mb-1">
            hi, {values?.user?.name}
          </h1>
          <span>Tap the icon to view your PIN</span>
          <div className="my-3 flex space-x-1">
            <p
              className="material-symbols-outlined cursor-pointer inline-block my-auto"
              onClick={() => setDisplayPin(!displayPin)}
            >
              {displayPin ? "lock_open" : "lock"}
            </p>
            <p className="text-lg font-bold tracking-wide my-auto">
              {displayPin ? values?.code : "..... ......"}
            </p>
          </div>

          <Link
            type="button"
            className="bg-gray-900 text-white text-center active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 cursor-pointer"
            activeClass="account"
            to="benefits"
            spy={true}
            offset={1}
            smooth={true}
            duration={800}
          >
            View your benefits
          </Link>
        </div>

        <div className="text-right flex flex-col justify-between">
          <div className="mb-2">
            <h1 className="font-extrabold text-3xl text-right mb-1">
              {subscriptionData?.plan?.product?.name}
            </h1>
            <p>Membership</p>
          </div>

          <div className="flex flex-col items-end ">
            <PrimaryButton
              text={"My Classes"}
              event={() => navigate("/classes")}
            />

            {/* <button
  className="bg-gray-900 text-white w-fit ml-auto active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 cursor-pointer"
  onClick={() => navigate("/classes")}
>
  My Classes
</button> */}

            <SecondaryButton
              text={"Manage your membership"}
              event={() => manageAccount()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionMenu;
