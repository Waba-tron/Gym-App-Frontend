import { createContext } from "react";

export const AuthContext = createContext<any>(null);

export const authReducer = (
  initialState: any,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case "LOGIN":
      return { ...initialState, user: action.payload };
    case "LOGOUT":
      return { membershipType: "", user: null };
    case "SET_MEMBERSHIP_TYPE":
      return { ...initialState, membershipType: action.payload };
    case "SET_MEMBERSHIP_CODE":
      return { ...initialState, code: action.payload };
    default:
      return { ...initialState };
  }
};
