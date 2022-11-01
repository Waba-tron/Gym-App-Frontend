import { LoadingContext } from "../context/LoadingContext";
import { useState } from "react";

interface LoadingContextProviderProps {
  children: any;
}

export const LoadingContextProvider = ({
  children,
}: LoadingContextProviderProps) => {
  const [loading, setLoading] = useState(true);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
