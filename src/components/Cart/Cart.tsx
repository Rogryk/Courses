import React, { useContext } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import type { ICartItem } from "../../store/cart-context";
import CartItem from "./CartItem";

interface ICart {
  onClose: () => void;
}

const Cart: React.FC<ICart> = (props) => {
  const cartContext = useContext(CartContext);
  const items = cartContext.items;
  const totalAmount = cartContext.totalAmount.toFixed(2);
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = (id: string) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item: ICartItem) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          price={item.price}
          name={item.name}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button-alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
