import { FC } from "react";
import { useAddressContext } from "@/lib/contexts/addressContext";
import AddressForm from "./addressForm";

import { House, Phone, User } from "@phosphor-icons/react";

interface AddressInfoProps {
  editAddress: boolean;
}

const AddressInfo: FC<AddressInfoProps> = ({ editAddress }): JSX.Element => {
  let address = useAddressContext();

  if (typeof address === "string") {
    address = JSON.parse(address);
  }

  return (
    <>
      {!editAddress ? (
        <>
          {address && Object.entries(address).length && (
            <div className="flex flex-col gap-y-6">
              <div className="flex gap-x-6">
                <div className="flex gap-6 justify-between">
                  <div className="flex gap-2 items-center">
                    <User size={20} weight="bold" />
                    <p>Name</p>
                  </div>
                  <span>:</span>
                </div>
                <p>{address.fullName}</p>
              </div>

              <div className="flex gap-x-6 items-start">
                <div className="flex gap-6 justify-between">
                  <div className="flex gap-2 items-center">
                    <House size={20} weight="bold" />
                    <p>Address</p>
                  </div>
                  <span>:</span>
                </div>
                <p>
                  {address.addressLine1} <br />
                  {address.city}, {address.country}
                </p>
              </div>

              <div className="flex gap-x-6">
                <div className="flex gap-6 justify-between">
                  <div className="flex gap-2 items-center">
                    <Phone size={20} weight="bold" />
                    <p>Phone</p>
                  </div>
                  <span>:</span>
                </div>
                <p>{address.phone}</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <AddressForm />
      )}
    </>
  );
};

export default AddressInfo;
