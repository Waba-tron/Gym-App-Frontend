import { DateContext } from "../context/DateContext";
import { useState } from "react";
import { startOfToday } from "date-fns";
interface DateContextProviderProps {
  children: any;
}

export const DateContextProvider = ({ children }: DateContextProviderProps) => {
  const [date, setDate] = useState(startOfToday());
  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
};
