import { createContext, PropsWithChildren, useContext } from "react";
import { useAddress } from "../hooks";

type AddressContextType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  country?: string;
  city?: string;
};

const AddressContext = createContext<AddressContextType>({});
const SetAddresscontext = createContext<Dispatch>(null);

export const useAddressContext = () => {
  return useContext(AddressContext);
};

export const useSetAddressContext = () => {
  return useContext(SetAddresscontext);
};

export const AddressContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const [address, setAddress] = useAddress();

  return (
    <AddressContext.Provider value={address}>
      <SetAddresscontext.Provider value={setAddress}>
        {children}
      </SetAddresscontext.Provider>
    </AddressContext.Provider>
  );
};
