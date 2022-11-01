import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Audio } from "react-loader-spinner";
import { AuthContext } from "../../context/AuthContext";
import { LoadingContext } from "../../context/LoadingContext";
const MembershipOverview = () => {
  const [Basic, setBasic] = useState(0);
  const [Premium, setPremium] = useState(0);
  const [Gym, setGym] = useState(0);
  const { values } = useContext(AuthContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const token = values?.user?.token;

  useEffect(() => {
    setLoading(true);
    const getAllMembersShips = async () => {
      const response = await fetch("/api/admin/all-subscriptions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        let counterBasic = 0;
        let counterPrem = 0;
        let counterGym = 0;
        for (let i = 0; i < data.length; i++) {
          let name = data[i]?.plan?.product?.name;

          if (name === "Basic Plan") {
            counterBasic++;
          } else if (name === "Premium plan") {
            counterPrem++;
          } else if (name === "Gym Plan") {
            counterGym++;
          }

          console.log(name);

          setBasic(counterBasic);
          setPremium(counterPrem);
          setGym(counterGym);
        }
        setLoading(false);

        // data.map((membership) => console.log(membership.plan.product.name));
      } else if (!response.ok) {
        console.log(data);
      }
    };

    if (token) {
      getAllMembersShips();
    }
  }, [token, setLoading]);
  return (
    <>
      {loading ? (
        <div className="relative mx-auto text-center w-fit h-full">
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
        <div className=" bg-white p-8 shadow-lg">
          {" "}
          <h1 className="text-2xl font-semibold w-full text-center">
            Number of memberships
          </h1>
          <div className="flex justify-between mt-8">
            <div>
              <h2 className="text-2xl font-medium">{Basic}</h2>
              <h1 className="text-2xl font-semibold">Basic</h1>
            </div>

            <div>
              <h2 className="text-2xl font-medium">{Premium}</h2>
              <h1 className="text-2xl font-semibold">Premium</h1>
            </div>

            <div>
              <h2 className="text-2xl font-medium">{Gym}</h2>
              <h1 className="text-2xl font-semibold">Gym</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MembershipOverview;
