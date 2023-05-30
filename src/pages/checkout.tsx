import { useContext, useState } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

import { CartContext } from "@/lib/contexts/CartContext";
import AddressInfo from "@/components/AddressInfo";

const Checkout = () => {
  const cart = useContext(CartContext);
  const [editAddress, setEditAddress] = useState(false);

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
              <div className="flex flex-col gap-8">
                <h2 className="text-3xl">Payment method</h2>
                <div></div>
              </div>
              <button
                type="button"
                className="bg-primary text-dark text-center font-bold px-4 py-5 rounded-md"
              >
                Pay KES. {cart.cartTotal.toLocaleString("en-US")}
              </button>
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
