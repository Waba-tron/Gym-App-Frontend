import React, { useContext, useState, useEffect } from "react";
import PricingCardList from "../../components/PricingCard/PricingCardList";
import { Audio } from "react-loader-spinner";
import { LoadingContext } from "../../context/LoadingContext";
import getPricies from "../../hooks/stripe/GetPrices";
import { toast } from "react-toastify";
const Pricing = () => {
  const { loading, setLoading } = useContext(LoadingContext);
  const [prices, setPricies] = useState([]);

  useEffect(() => {
    getPricies(setLoading, toast, setPricies);
  }, [setPricies, setLoading]);

  return (
    <>
      <div
        className="relative pt-16 pb-16 flex content-center items-center justify-center font-roboto"
        style={{ minHeight: "90vh" }}
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

        {loading ? (
          <div className="relative mx-auto flex justify-center">
            <Audio
              height="100"
              width="100"
              color="white"
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
            />
          </div>
        ) : (
          <div className="container relative mx-auto mt-2" data-aos="fade-in">
            <div className=" flex flex-wrap content-center items-center">
              <div className="w-full px-12 ml-auto mr-auto text-center">
                <div>
                  <h1 className="text-white font-bold text-5xl uppercase tracking-tight">
                    Our <span className="text-orange-500">Pricing</span>
                  </h1>
                  <p className="mt-4 text-lg text-gray-300">
                    Choose the pricing plan that fits you
                  </p>
                </div>

                <PricingCardList prices={prices} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Pricing;
