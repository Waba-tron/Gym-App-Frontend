import { AuthContext, authReducer } from "../context/AuthContext";
import { useEffect, useReducer } from "react";

interface AuthContextProviderProps {
  children: any;
}

const initialState = {
  membershipType: "",
  user: {},
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [values, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(String(localStorage.getItem("user")));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext state:", values);
  return (
    <AuthContext.Provider value={{ values, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
