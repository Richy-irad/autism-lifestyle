import { FC, useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { v4 as uuidV4 } from "uuid";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

import { CartContext } from "@/lib/contexts/CartContext";
import AddressInfo from "@/components/AddressInfo";
import { AuthTokenType, CheckoutProps } from "@/lib/types";
import { useAddressContext } from "@/lib/contexts/addressContext";
import pesapalAuth from "@/lib/pesapalAuth";
import { useAddress } from "@/lib/hooks";

export const getStaticProps = async () => {
  let token = await pesapalAuth();

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
  const [checkingOut, setCheckingOut] = useState(false);

  let address = useAddressContext();

  if (typeof address === "string") {
    address = JSON.parse(address);
  }

  // method to do the submitOrder
  const submitOrder = (authToken: AuthTokenType) => {
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
        cart: cart,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setCheckingOut(false);
        // router.push(result.redirect_url);
        window.open(result.redirect_url, "_blank");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // method to handle submitOrderRequest
  const handleSubmitOrderRequest = async () => {
    // make the fetch call
    if (address) {
      setCheckingOut(true);

      // check if the token being used is still valid
      let now = new Date();
      let tokenExpiry = new Date(authToken.expiryDate);

      if (now < tokenExpiry) {
        submitOrder(authToken);
      } else {
        // authenticate the checkout first,
        // then submit the order
        let newAuthToken = await pesapalAuth();
        submitOrder(newAuthToken);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Checkout | Autism Lifestyle</title>
      </Head>
      <Navbar />
      <main className="font-inter">
        <div className="px-5 lg:mx-40 py-10 lg:py-20">
          <h1 className="text-5xl font-medium font-josefin-sans">Checkout</h1>
          {cart && cart.items.length ? (
            <div className="flex justify-between mt-5 items-start flex-wrap gap-y-8">
              <div className="basis-full lg:basis-7/12 flex flex-col gap-y-8">
                <div className="flex flex-col gap-y-8">
                  <div className="flex gap-x-4 justify-between">
                    <h2 className="text-3xl">Billing Address</h2>
                    {Object.keys(address).length > 0 && (
                      <button
                        type="button"
                        className="text-blue text-lg font-bold underline underline-offset-4"
                        onClick={() =>
                          setEditAddress((prevState) => !prevState)
                        }
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  <AddressInfo editAddress={editAddress} />
                </div>
              </div>
              <div className="basis-full lg:basis-4/12 bg-concrete px-6 py-8 rounded-3xl flex flex-col gap-3">
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
                            $ {cartItem.subTotal.toLocaleString("en-US")}
                          </span>
                        </div>
                      ))}
                    </>
                  )}
                  <hr className="my-8" />
                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span>$ {cart.cartTotal.toLocaleString("en-US")}</span>
                  </div>
                  <hr className="my-8" />
                  {checkingOut ? (
                    <button
                      type="button"
                      className="bg-primary text-dark text-center font-bold px-4 py-5 rounded-md"
                      onClick={() => handleSubmitOrderRequest()}
                    >
                      Processing ...
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-primary text-dark text-center font-bold px-4 py-5 rounded-md"
                      onClick={() => handleSubmitOrderRequest()}
                    >
                      Pay $ {cart.cartTotal.toLocaleString("en-US")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 items-start mt-4">
              <p>
                You haven&lsquo;t added any packages to your cart to checkout!!!
              </p>
              <Link
                href="/services"
                className="bg-primary text-dark font-semibold px-4 py-5 rounded-md"
              >
                Browse our Services
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
