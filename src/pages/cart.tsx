import { FC, useContext } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { CaretRight, Minus, Plus, Trash } from "@phosphor-icons/react";
import { CartContext, CartDispatchContext } from "@/lib/contexts/CartContext";
import { CartItemExcerptProps } from "@/lib/types";

const CartItemExcerpt: FC<CartItemExcerptProps> = ({
  cartItem,
}): JSX.Element => {
  const dispatch = useContext(CartDispatchContext);

  const handleQuantityIncrease = () => {
    let newQuantity = cartItem.quantity + 1;
    let newSubTotal = cartItem.price * newQuantity;
    dispatch({
      type: "changed",
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
    dispatch({
      type: "changed",
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
    <tr className="border-t-0.5 border-light">
      <td className="py-5 px-4">
        <Link
          href={cartItem.item.slug}
          className="text-blue text-start underline underline-offset-4"
        >
          {cartItem.item.title}
        </Link>
      </td>
      <td className="py-5 px-4 text-end">
        KES. {cartItem.price.toLocaleString("en-US")}
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
          <button
            type="button"
            className="text-dark"
            disabled
          >
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
        KES. {cartItem.subTotal.toLocaleString("en-US")}
      </td>
      <td className="py-5 px-4 flex justify-center text-light">
        <button
          type="button"
          onClick={() => {
            dispatch({
              type: "deleted",
              payload: {
                id: cartItem.id,
              },
            });
          }}
        >
          <Trash size={24} />
        </button>
      </td>
    </tr>
  );
};

const Cart = () => {
  const cart = useContext(CartContext);
  return (
    <>
      <Navbar />
      <main className="font-josefin-sans">
        <div className="bg-white">
          <div className="px-5 lg:mx-40 py-20 flex">
            <div className="basis-8/12 mx-auto flex flex-col gap-y-9 items-start">
              <h1 className="text-5xl font-medium">Cart</h1>

              {cart && cart.items.length ? (
                <>
                  <table className="w-full">
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
                          <CartItemExcerpt
                            key={index}
                            cartItem={cartItem}
                          />
                        ))}
                        <tr className="border-y-0.5 border-light font-bold">
                          <td className="text-start py-6 px-4">Items total:</td>
                          <td></td>
                          <td></td>
                          <td className="text-end py-6 px-4">
                            KES {cart.cartTotal.toLocaleString("en-US")}
                          </td>
                        </tr>
                      </>
                    </tbody>
                  </table>

                  <Link
                    href="/checkout"
                    className="bg-primary text-dark text-center font-bold px-4 py-5 rounded-md flex gap-x-2 items-center"
                  >
                    Proceed to Checkout
                    <CaretRight size={18} />
                  </Link>
                </>
              ) : (
                <p>You Have no items in your cart</p>
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
