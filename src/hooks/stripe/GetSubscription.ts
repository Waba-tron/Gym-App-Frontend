import { SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";

const getSubscription = async (
  token: string,
  setLoading: (open: boolean) => void,
  toast: any,
  setSubscriptionData: {
    (value: SetStateAction<never[]>): void;
    (arg0: any): void;
  },
  navigate: NavigateFunction,
  dispatch: (arg0: { type: string; payload: any }) => void
) => {
  if (token) {
    setLoading(true);
    const response = await fetch(`/api/stripe/subscription`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    // navigate("/pricing");
    if (response.status === 404 || data.error) {
      navigate("/pricing");
      console.log(data.error, response.status);
      console.log("hjkl;");
    } else if (!response.ok) {
      toast(data.error, {
        type: "error",
      });
      console.log(response.status);
    }
    if (response.ok) {
      setSubscriptionData(data?.subscription);
      console.log(data.error, response.status);
      dispatch({
        type: "SET_MEMBERSHIP_TYPE",
        payload: data?.subscription?.plan?.product?.name,
      });
      dispatch({
        type: "SET_MEMBERSHIP_CODE",
        payload: data?.code,
      });
      setLoading(false);
    }
  }
};

export default getSubscription;
