import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SubscriptionMenu from "../../components/SubscriptionMenu/SubscriptionMenu";
import SubscriptionMenuBenefits from "../../components/SubscriptionMenu/SubscriptionMenuBenefits";
import { AuthContext } from "../../context/AuthContext";
import { Audio } from "react-loader-spinner";
import { LoadingContext } from "../../context/LoadingContext";
import getSubscription from "../../hooks/stripe/GetSubscription";
import { ToastContainer, toast } from "react-toastify";
const Account = () => {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const { values, dispatch } = useContext(AuthContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  const token = values?.user?.token;

  useEffect(() => {
    // const getSubscription = async () => {
    //   setLoading(true);
    //   const response = await fetch(`/api/stripe/subscription`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${values?.user.token}`,
    //     },
    //   });

    //   const data = await response.json();

    //   if (response.status === 404) {
    //     navigate("/pricing");
    //     console.log(data.error, response.status);
    //   } else if (!response.ok) {
    //     console.log(response.status);
    //   }
    //   if (response.ok) {
    //     setSubscriptionData(data);
    //     setLoading(false);

    //     console.log(data);
    //   }
    // };

    getSubscription(
      token,
      setLoading,
      toast,
      setSubscriptionData,
      navigate,
      dispatch
    );
  }, [token, dispatch, navigate, setSubscriptionData, setLoading]);

  return (
    <>
      <div
        className="relative pt-16 pb-16 flex content-center items-center justify-center font-roboto"
        style={{ minHeight: "100vh" }}
      >
        <div className="absolute top-0 w-full h-full bg-top bg-cover bg-orange-500"></div>
        <ToastContainer />
        {loading === true ? (
          <div className="relative mx-auto">
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
          <div className="container h-full mx-auto" data-aos="fade-in">
            <div className="items-center flex flex-wrap">
              <div className="w-3/5 px-5  ml-auto mr-auto text-center">
                <SubscriptionMenu subscriptionData={subscriptionData} />
              </div>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="mx-auto">
          <Audio
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
          />
        </div>
      ) : (
        <div
          className="relative pt-16 pb-16 flex content-center items-center justify-center font-roboto benefits"
          style={{ minHeight: "100vh" }}
        >
          {" "}
          <div
            className="container relative mx-auto font-roboto"
            data-aos="fade-in"
          >
            <div className="items-center flex flex-wrap">
              <div className=" w-3/5 px-4 ml-auto mr-auto text-center">
                <SubscriptionMenuBenefits subscriptionData={subscriptionData} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
