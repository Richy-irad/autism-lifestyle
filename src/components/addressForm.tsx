import React, { useState, useRef } from "react";
import {
  useAddressContext,
  useSetAddressContext,
} from "@/lib/contexts/addressContext";

const AddressForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const addressLine1InputRef = useRef<HTMLInputElement>(null);
  const addressLine2InputRef = useRef<HTMLInputElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);

  let address = useAddressContext();

  if (typeof address === "string") {
    address = JSON.parse(address);
  }

  const saveButtonActive =
    firstName && email && phone && addressLine1 && country && city;

  const setAddress = useSetAddressContext();

  // display error on input field
  const displayInputError = (element: HTMLInputElement) => {
    // add CSS classes to the element
    element.classList.add("placeholder:text-red-700", "border-red-400");
    // remove CSS classes to the element
    element.classList.remove("border-slate-300");
  };

  // clear error on the input field
  const clearInputError = (element: HTMLInputElement) => {
    // add CSS classes to the element
    element.classList.add("border-slate-300");
    // remove CSS classes to the element
    element.classList.remove("border-red-400");
  };

  //
  const handleOnBlur = (element: HTMLInputElement) => {
    if ("" !== element.value) {
      clearInputError(element);
    } else {
      displayInputError(element);
    }
  };

  // save address to localstorage
  const handleSetAddress = () => {
    let addressData = {
      firstName,
      lastName,
      email,
      phone,
      addressLine1,
      addressLine2,
      country,
      city,
    };

    const emailRegex = /\S+@\S+\.\S+/;

    // check if the necessary fields were filled
    if (!firstName) {
      displayInputError(firstNameInputRef.current as HTMLInputElement);
    }

    if (!lastName) {
      displayInputError(lastNameInputRef.current as HTMLInputElement);
    }

    if (!email) {
      displayInputError(emailInputRef.current as HTMLInputElement);
    } else {
      if (!emailRegex.test(email)) {
        displayInputError(emailInputRef.current as HTMLInputElement);
      }
    }

    if (!phone) {
      displayInputError(phoneInputRef.current as HTMLInputElement);
    }

    if (!addressLine1) {
      displayInputError(addressLine1InputRef.current as HTMLInputElement);
    }

    if (!country) {
      displayInputError(countryInputRef.current as HTMLInputElement);
    }

    if (!city) {
      displayInputError(cityInputRef.current as HTMLInputElement);
    }

    // avoid saving an incomplete address
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !addressLine1 ||
      !country ||
      !city
    ) {
      return;
    }

    setAddress(addressData);
  };

  return (
    <form className="flex flex-col gap-y-8 items-center lg:items-start">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex gap-x-6">
          {/* first name */}
          <div className="basis-1/2 space-y-3">
            <label htmlFor="firstName" className="block">
              First name
            </label>
            <input
              type="text"
              ref={firstNameInputRef}
              className="border-0.5 border-light rounded-md block w-full px-2.5 py-3.5"
              name="firstName"
              value={address.firstName ? address.firstName : firstName}
              placeholder="Full name"
              onChange={(event) => setFirstName(event.target.value)}
              onBlur={() =>
                handleOnBlur(firstNameInputRef.current as HTMLInputElement)
              }
            />
          </div>
          
          {/* last name */}
          <div className="basis-1/2 space-y-3">
            <label htmlFor="lastName" className="block">
              Last name
            </label>
            <input
              type="text"
              ref={lastNameInputRef}
              className="border-0.5 border-light rounded-md block w-full px-2.5 py-3.5"
              name="lastName"
              value={address.lastName ? address.lastName : lastName}
              placeholder="Last name"
              onChange={(event) => setLastName(event.target.value)}
              onBlur={() =>
                handleOnBlur(lastNameInputRef.current as HTMLInputElement)
              }
            />
          </div>
        </div>

        <div className="flex gap-x-6">
          {/* email */}
          <div className="basis-1/2 space-y-3">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              ref={emailInputRef}
              className="border-0.5 border-light rounded-md block w-full px-2.5 py-3.5"
              name="email"
              value={address.email ? address.email : email}
              placeholder="Email"
              onChange={(event) => setEmail(event?.target.value)}
              onBlur={() =>
                handleOnBlur(emailInputRef.current as HTMLInputElement)
              }
            />
          </div>
          {/* phone */}
          <div className="basis-1/2 space-y-3">
            <label htmlFor="phone" className="block">
              Phone
            </label>
            <input
              type="text"
              ref={phoneInputRef}
              className="border-0.5 border-light rounded-md block w-full px-2.5 py-3.5"
              name="phone"
              value={address.phone ? address.phone : phone}
              placeholder="Phone"
              onChange={(event) => setPhone(event.target.value)}
              onBlur={() =>
                handleOnBlur(phoneInputRef.current as HTMLInputElement)
              }
            />
          </div>
        </div>

        <div>
          <label htmlFor="addressLine1" className="block">
            Address line 1
          </label>
          <input
            type="text"
            ref={addressLine1InputRef}
            className="border-0.5 border-light rounded-md block w-full px-2.5 py-3.5"
            name="addressLine1"
            value={address.addressLine1 ? address.addressLine1 : addressLine1}
            placeholder="Address Line 1"
            onChange={(event) => setAddressLine1(event.target.value)}
            onBlur={() =>
              handleOnBlur(addressLine1InputRef.current as HTMLInputElement)
            }
          />
        </div>

        <div>
          <label htmlFor="addressLine2" className="block">
            Address line 2
          </label>
          <input
            type="text"
            ref={addressLine2InputRef}
            className="border-0.5 border-light rounded-md block w-full px-2.5 py-3.5"
            name="addressLine2"
            value={address.addressLine2 ? address.addressLine2 : addressLine2}
            placeholder="Address Line 2"
            onChange={(event) => setAddressLine2(event.target.value)}
          />
        </div>

        <div className="flex gap-x-6">
          {/* city */}
          <div className="basis-1/2 space-y-3">
            <label htmlFor="city" className="block">
              City
            </label>
            <input
              type="text"
              ref={cityInputRef}
              className="border-0.5 border-light rounded-md block w-full px-2.5 py-3.5"
              name="city"
              value={address.city ? address.city : city}
              placeholder="City"
              onChange={(event) => setCity(event.target.value)}
              onBlur={() =>
                handleOnBlur(cityInputRef.current as HTMLInputElement)
              }
            />
          </div>
          {/* country */}
          <div className="basis-1/2 space-y-3">
            <label htmlFor="country" className="block">
              Country
            </label>
            <input
              type="text"
              ref={countryInputRef}
              className="border-0.5 border-light rounded-md block w-full px-2.5 py-3.5"
              name="country"
              value={address.country ? address.country : country}
              placeholder="Country"
              onChange={(event) => setCountry(event.target.value)}
              onBlur={() =>
                handleOnBlur(countryInputRef.current as HTMLInputElement)
              }
            />
          </div>
        </div>
      </div>

      {saveButtonActive ? (
        <button
          type="button"
          className="bg-primary text-dark font-semibold px-4 py-5 rounded-md"
          onClick={() => handleSetAddress()}
        >
          Save address
        </button>
      ) : (
        <button
          type="button"
          className="text-dark border-0.5 border-light font-semibold px-4 py-5 rounded-md"
          disabled
        >
          Save address
        </button>
      )}
    </form>
  );
};

export default AddressForm;
