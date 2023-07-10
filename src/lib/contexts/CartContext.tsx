import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useReducer,
} from "react";
import cartReducer from "../reducers/cartReducer";
import { CartItemType } from "../types";

type CartContextType = {
  items: CartItemType[];
  cartTotal: number;
};

export const CartContext = createContext<CartContextType>({
  items: [],
  cartTotal: 0,
});
export const CartDispatchContext = createContext<Dispatch>(null);

export const CartProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const initialState = {
    cart: {
      items: [],
      cartTotal: 0,
    },
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { cart } = state;

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};
