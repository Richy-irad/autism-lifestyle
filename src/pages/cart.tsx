import { FC, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Topbar from "@/components/topbar";
import { CaretRight, Minus, Plus, Trash } from "@phosphor-icons/react";
import { CartContext, CartDispatchContext } from "@/lib/contexts/CartContext";
import { CartActions, CartItemExcerptProps } from "@/lib/types";

const CartItemExcerpt: FC<CartItemExcerptProps> = ({
  cartItem,
}): JSX.Element => {
  const dispatch = useContext(CartDispatchContext);

  const handleQuantityIncrease = () => {
    let newQuantity = cartItem.quantity + 1;
    let newSubTotal = cartItem.price * newQuantity;
    dispatch?.({
      type: CartActions.changed,
      payload: {
        item: {
          id: cartItem.id,
          item: cartItem.item,
          quantity: newQuantity,
          price: cartItem.price,
          subTotal: newSubTotal,
        },
      },
    });
  };

  const handleQuantityDecrease = () => {
    let newQuantity = cartItem.quantity - 1;
    let newSubTotal = cartItem.price * newQuantity;
    dispatch?.({
      type: CartActions.changed,
      payload: {
        item: {
          id: cartItem.id,
          item: cartItem.item,
          quantity: newQuantity,
          price: cartItem.price,
          subTotal: newSubTotal,
        },
      },
    });
  };

  return (
    <>
      {/* table row for large screens */}
      <tr className="hidden lg:table-row border-t-0.5 border-light">
        <td className="py-5 px-4">
          <Link
            href={`services/${cartItem.item.slug}`}
            className="text-blue text-start underline underline-offset-4"
          >
            {cartItem.item.title}
          </Link>
        </td>
        <td className="py-5 px-4 text-end">
          $ {cartItem.price.toLocaleString("en-US")}
        </td>
        <td className="py-5 px-4 justify-center flex gap-x-3 items-center">
          {cartItem.quantity > 1 ? (
            <button
              type="button"
              onClick={handleQuantityDecrease}
              className="text-dark hover:text-primary"
            >
              <Minus size={14} weight="bold" />
            </button>
          ) : (
            <button type="button" className="text-dark" disabled>
              <Minus size={14} weight="bold" />
            </button>
          )}
          {cartItem.quantity}
          <button
            type="button"
            onClick={handleQuantityIncrease}
            className="text-dark hover:text-primary"
          >
            <Plus size={14} weight="bold" />
          </button>
        </td>
        <td className="py-5 px-4 text-end">
          $ {cartItem.subTotal.toLocaleString("en-US")}
        </td>
        <td className="my-5 mx-4 flex justify-center text-light hover:text-red-500">
          <button
            type="button"
            onClick={() => {
              dispatch?.({
                type: CartActions.deleted,
                payload: {
                  id: cartItem.id,
                  item: cartItem,
                },
              });
            }}
          >
            <Trash size={24} />
          </button>
        </td>
      </tr>

      {/* mobile screen */}
      <div className="flex lg:hidden flex-col gap-8 bg-concrete/50 py-3 px-4 rounded-3xl">
        <Link
          href={`services/${cartItem.item.slug}`}
          className="text-blue text-start text-lg underline underline-offset-4"
        >
          {cartItem.item.title}
        </Link>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-3">
            <p className="text-dark/30 text-base font-medium">Price</p>
            <p>$ {cartItem.price.toLocaleString("en-US")}</p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-dark/30 text-base font-medium">Quantity</p>
            <div className="flex gap-x-3 items-center">
              {cartItem.quantity > 1 ? (
                <button
                  type="button"
                  onClick={handleQuantityDecrease}
                  className="text-dark hover:text-primary"
                >
                  <Minus size={14} weight="bold" />
                </button>
              ) : (
                <button type="button" className="text-dark" disabled>
                  <Minus size={14} weight="bold" />
                </button>
              )}
              {cartItem.quantity}
              <button
                type="button"
                onClick={handleQuantityIncrease}
                className="text-dark hover:text-primary"
              >
                <Plus size={14} weight="bold" />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-dark/30 text-base font-medium">Sub total</p>
            <p className="text-end">
              $ {cartItem.subTotal.toLocaleString("en-US")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const Cart = () => {
  const cart = useContext(CartContext);
  return (
    <>
      <Head>
        <title>Cart | Autism Lifestyle</title>
      </Head>
      <Topbar />
      <Navbar />
      <main className="font-inter">
        <div className="bg-white">
          <div className="px-5 lg:mx-40 py-10 lg:py-20 flex">
            <div className="basis-full lg:basis-8/12 mx-auto flex flex-col gap-y-9 items-start">
              <h1 className="font-josefin-sans text-5xl font-medium">Cart</h1>

              {cart && cart.items.length ? (
                <>
                  <table className="w-full hidden lg:table">
                    <thead className="uppercase">
                      <tr className="border-t-0.5 border-light text-black">
                        <th className="py-2 px-4 text-start">Package</th>
                        <th className="py-2 px-4 text-end">Price</th>
                        <th className="py-2 px-4">Quantity</th>
                        <th className="py-2 px-4 text-end">Sub total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <>
                        {cart.items.map((cartItem, index) => (
                          <CartItemExcerpt key={index} cartItem={cartItem} />
                        ))}
                        <tr className="border-y-0.5 border-light font-bold">
                          <td className="text-start py-6 px-4">Items total:</td>
                          <td></td>
                          <td></td>
                          <td className="text-end py-6 px-4">
                            $ {cart.cartTotal.toLocaleString("en-US")}
                          </td>
                        </tr>
                      </>
                    </tbody>
                  </table>

                  <div className="flex lg:hidden flex-col gap-8 w-full">
                    <>
                      {cart.items.map((cartItem, index) => (
                        <CartItemExcerpt key={index} cartItem={cartItem} />
                      ))}

                      <div className="flex justify-between items-center w-full border-y-0.5 border-light/50 py-2.5">
                        <p className="font-bold text-dark">Items total:</p>
                        <p className="font-bold text-dark">
                          $ {cart.cartTotal.toLocaleString("en-US")}
                        </p>
                      </div>
                    </>
                  </div>

                  <Link
                    href="/checkout"
                    className="bg-primary text-dark text-center font-bold px-4 py-2.5 lg:py-5 rounded-md flex gap-x-2 items-center"
                  >
                    Proceed to Checkout
                    <CaretRight size={18} />
                  </Link>
                </>
              ) : (
                <>
                  <p>You Have no items in your cart</p>
                  <Link
                    href="/services"
                    className="bg-primary text-dark font-semibold px-4 py-5 rounded-md"
                  >
                    Browse our Services
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
