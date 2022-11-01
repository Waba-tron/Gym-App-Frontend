import React from "react";

interface SubscriptionMenuProps {
  subscriptionData: any;
}

const SubscriptionMenuBenefits = ({
  subscriptionData,
}: SubscriptionMenuProps) => {
  return (
    <>
      <h1 className="bg-orange-500 text-3xl font-extrabold p-4 text-white">
        About your {subscriptionData?.plan?.product?.name} membership
      </h1>
      <div
        className=" flex flex-row min-w-0 break-words mb-6 shadow-lg bg-white p-7"
        data-aos="fade-up-right"
      >
        <ul className="mb-8 space-y-4 text-left m-auto">
          {subscriptionData?.plan &&
            JSON.parse(subscriptionData?.plan?.product?.metadata?.benefits).map(
              (benefit: string) => (
                <li className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    <span className="font-semibold">{benefit}</span>
                  </span>
                </li>
              )
            )}
        </ul>
        <span className="material-symbols-outlined text-9xl m-auto text-orange-500">
          {subscriptionData?.plan?.product?.metadata?.icon}
        </span>
      </div>
    </>
  );
};

export default SubscriptionMenuBenefits;
