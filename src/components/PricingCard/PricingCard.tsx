import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface priceCardProps {
  priceCard: any;
}

const PricingCard = ({ priceCard }: priceCardProps) => {
  const { values } = useContext(AuthContext);
  const token = values?.user?.token;
  const navigate = useNavigate();

  const buyCustomerSubscription = async () => {
    if (!token) {
      navigate("/login");
    }
    const response = await fetch(
      `/api/stripe/buy-subscription/${priceCard.default_price.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();

    if (response.status === 409) {
      navigate("/account");
    }

    if (!response.ok) {
      console.log(response, data);
    }
    if (response.ok) {
      console.log(data, response);
      window.location.href = data.url;

      // save the user to local storage
    }
  };

  return (
    <div className="bg-white p-9 w-1/3 rounded-lg font-roboto">
      <h3 className="mb-4 text-2xl font-semibold">{priceCard.name}</h3>
      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
        {priceCard.description}
      </p>
      <div className="flex justify-center items-baseline my-3">
        <span className="mr-2 text-5xl font-extrabold text-orange-500">
          £{priceCard.default_price.unit_amount / 100}
        </span>
        <span className="text-gray-500 dark:text-gray-400">/month</span>
      </div>

      <div className="flex flex-col h-2/4 flex-1">
        <ul className="space-y-4 mb-8 text-left h-full">
          {JSON.parse(priceCard.metadata.benefits).map(
            (
              benefit:
                | boolean
                | React.Key
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | null
                | undefined
            ) => (
              <li key={String(benefit)} className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>{benefit}</span>
              </li>
            )
          )}
        </ul>
        {values.membershipType === priceCard.name ? (
          <button
            className="bg-orange-500  font-semibold text-white  p-2 border border-orange-500 hover:border-transparent rounded inline-block cursor-pointer w-full"
            onClick={buyCustomerSubscription}
          >
            Manage
          </button>
        ) : (
          <button
            className="bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white p-2 border border-orange-500 hover:border-transparent rounded inline-block cursor-pointer w-full"
            onClick={buyCustomerSubscription}
          >
            Join
          </button>
        )}
      </div>
    </div>
  );
};

export default PricingCard;
