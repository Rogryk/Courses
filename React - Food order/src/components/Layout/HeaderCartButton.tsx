import React, { useContext, useEffect, useState } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext, { ICartItem } from "../../store/cart-context";

interface IHeaderCardButton {
  onClick: () => void;
}

const HeaderCardButton: React.FC<IHeaderCardButton> = (props) => {
  const cartContext = useContext(CartContext);
  const [buttonBump, setButtonBump] = useState(false);

  const reduceHandler = (prev: number, cur: ICartItem) => {
    return prev + cur.amount;
  };
  const numberOfCartItems = cartContext.items.reduce(reduceHandler, 0);

  useEffect(() => {
    numberOfCartItems > 0 && setButtonBump(true);
    console.log("tru");

    const timeout = setTimeout(() => {
      setButtonBump(false);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [numberOfCartItems]);

  return (
    <>
      <button
        className={`${styles.button} ${buttonBump && styles.bump}`}
        onClick={props.onClick}
      >
        <span className={`${styles.icon} `}>
          <CartIcon />
        </span>
        <span> Your Cart</span>
        <span className={styles.badge}>{numberOfCartItems}</span>
      </button>
    </>
  );
};

export default HeaderCardButton;
