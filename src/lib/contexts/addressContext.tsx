import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  SetStateAction,
} from "react";
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

const AddressContext = createContext<AddressContextType | string>({});
const SetAddresscontext = createContext<Dispatch<SetStateAction<string>> | null>(null);

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
