import React, { useReducer } from "react";
import CartContext from "./cart-context";
import type { ICartItem } from "./cart-context";

interface ICartProvider {
  children: React.ReactNode;
}

interface IreducerState {
  items: ICartItem[];
  totalAmount: number;
}

interface IreducerAction {
  type: string;
  item?: ICartItem;
  idToRemove?: string;
}

const ACTIONS = {
  ADD_ITEM: "addItem",
  REMOVE_ITEM: "removeItem",
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state: IreducerState, action: IreducerAction) => {
  const oldItems = state.items;
  let updatedItems: ICartItem[] = [];

  if (action.type === ACTIONS.ADD_ITEM) {
    const newItem = action.item;

    if (!newItem) {
      return { ...state };
    }

    const indexOfNewItem = oldItems.findIndex(
      (oldItem) => oldItem.id === newItem.id
    );

    if (indexOfNewItem === -1) {
      updatedItems = oldItems.concat(newItem);
    } else {
      updatedItems = oldItems;
      updatedItems[indexOfNewItem].amount += newItem.amount;
    }

    const updatedTotalAmount =
      state.totalAmount + newItem.price * newItem.amount;

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === ACTIONS.REMOVE_ITEM) {
    const idOfItemToRemove = action.idToRemove;
    const indexOfItemToRemove = oldItems.findIndex(
      (oldItem) => oldItem.id === idOfItemToRemove
    );

    if (oldItems[indexOfItemToRemove].amount === 1) {
      updatedItems = oldItems.filter(
        (oldItem) => oldItem.id !== idOfItemToRemove
      );
    } else {
      updatedItems = oldItems.map((oldItem) => {
        if (oldItem.id === idOfItemToRemove) {
          oldItem.amount -= 1;
        }
        return oldItem;
      });
    }

    const updatedTotalAmount =
      Number(state.totalAmount.toFixed(3)) -
      oldItems[indexOfItemToRemove].price;

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  return { ...state };
};

const CartProvider: React.FC<ICartProvider> = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: ICartItem) => {
    dispatchCartAction({ type: ACTIONS.ADD_ITEM, item: item });
  };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCartAction({ type: ACTIONS.REMOVE_ITEM, idToRemove: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
