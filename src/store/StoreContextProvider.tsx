import { AuthContextProvider } from "./AuthContextProvider";
import { LoadingContextProvider } from "./LoadingContextProvider";
import { DateContextProvider } from "./DateProvider";

interface StoreContextProviderProps {
  children: any;
}

export const StoreContextProvider = ({
  children,
}: StoreContextProviderProps) => {
  return (
    <LoadingContextProvider>
      <DateContextProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </DateContextProvider>
    </LoadingContextProvider>
  );
};
