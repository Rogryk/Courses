import React from "react";
import styles from "./Card.module.css";

interface ICard {
  children: React.ReactNode;
  class?: string;
}

const Card: React.FC<ICard> = (props) => {
  return (
    <div className={styles.card + " " + props.class}>{props.children}</div>
  );
};

export default Card;
