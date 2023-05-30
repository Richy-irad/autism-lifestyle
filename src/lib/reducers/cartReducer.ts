import { ActionType, CartState } from "../types";

const CARTACTIONS = {
  ADDED: "added",
  CHANGED: "changed",
  DELETED: "deleted",
};

const cartReducer = (state: CartState, action: ActionType) => {
  const { type, payload } = action;
  const { cart } = state;
  switch (type) {
    case CARTACTIONS.ADDED: {
      if (
        cart.items.find((item) => item.item.title === payload.item?.item.title)
      ) {
        return state;
      }

      let newCartItems = [...cart.items, payload.item];
      let newCartTotal = cart.cartTotal + payload.item.subTotal;

      return {
        cart: {
          items: newCartItems,
          cartTotal: newCartTotal,
        },
      };
    }
    case CARTACTIONS.CHANGED: {
      const updatedCartItems = cart.items.map((item) => {
        if (item.id === payload.item.id) {
          return payload.item;
        } else {
          return item;
        }
      });

      let newCartTotal = 0;
      updatedCartItems.forEach((item) => {
        newCartTotal += item.subTotal;
      });

      return {
        cart: {
          items: [...updatedCartItems],
          cartTotal: newCartTotal,
        },
      };
    }
    case CARTACTIONS.DELETED: {
      const updatedCartItems = cart.items.filter(
        (item) => item.id !== payload.id
      );
      console.log(updatedCartItems);

      let newCartTotal = 0;
      updatedCartItems.forEach((item) => {
        newCartTotal += item.subTotal;
      });

      return {
        cart: {
          items: [...updatedCartItems],
          cartTotal: newCartTotal,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;
