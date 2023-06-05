import { FC, useContext, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidV4 } from "uuid";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

import { CartContext } from "@/lib/contexts/CartContext";
import AddressInfo from "@/components/AddressInfo";
import { CheckoutProps } from "@/lib/types";
import { useAddressContext } from "@/lib/contexts/addressContext";

export const getStaticProps = async () => {
  let token = {};
  const authURL = process.env.PESAPAL_AUTHENTICATION_URL as string;

  // authenticate with pesapal
  const authResponse = await fetch(authURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
    }),
  });

  if (authResponse.ok) {
    token = await authResponse.json();
  }

  // return the authTokens in props

  return {
    props: {
      authToken: token,
    },
  };
};

const Checkout: FC<CheckoutProps> = ({ authToken }) => {
  const cart = useContext(CartContext);
  const [editAddress, setEditAddress] = useState(false);

  const router = useRouter();

  let address = useAddressContext();

  if (typeof address === "string") {
    address = JSON.parse(address);
  }

  // method to handle submitOrderRequest
  const handleSubmitOrderRequest = async () => {
    // make the fetch call
    if (address) {
      fetch("/api/submit-order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          transaction_id: uuidV4(),
          authToken,
          cartTotal: cart.cartTotal,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          router.push(result.redirect_url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Navbar />
      <main className="font-josefin-sans">
        <div className="px-5 lg:mx-40 py-20">
          <h1 className="text-5xl font-medium">Checkout</h1>
          <div className="flex justify-between mt-5 items-start">
            <div className="basis-7/12 flex flex-col gap-y-8">
              <div className="flex flex-col gap-y-8">
                <div className="flex gap-x-4">
                  <h2 className="text-3xl">Billing Details</h2>
                  <button
                    type="button"
                    className="text-blue text-lg font-bold underline underline-offset-4"
                    onClick={() => setEditAddress((prevState) => !prevState)}
                  >
                    Edit
                  </button>
                </div>

                <AddressInfo editAddress={editAddress} />
              </div>
            </div>
            <div className="basis-4/12 bg-concrete px-6 py-8 rounded-3xl flex flex-col gap-3">
              <h3 className="text-2xl font-bold">Summary</h3>
              <div className="flex flex-col gap-2 text-md">
                {cart && cart.items.length && (
                  <>
                    {cart.items.map((cartItem, index) => (
                      <div key={index} className="flex gap-1">
                        <span className="basis-7/12 flex-grow-1 flex-shrink-1">
                          {cartItem.item.title}
                        </span>
                        <span className="basis-1/12 text-center">
                          x{cartItem.quantity}
                        </span>
                        <span className="basis-4/12 text-end">
                          KES. {cartItem.subTotal.toLocaleString("en-US")}
                        </span>
                      </div>
                    ))}
                  </>
                )}
                <hr className="my-8" />
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>KES. {cart.cartTotal.toLocaleString("en-US")}</span>
                </div>
                <hr className="my-8" />
                <button
                  type="button"
                  className="bg-primary text-dark text-center font-bold px-4 py-5 rounded-md"
                  onClick={() => handleSubmitOrderRequest()}
                >
                  Pay KES. {cart.cartTotal.toLocaleString("en-US")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
