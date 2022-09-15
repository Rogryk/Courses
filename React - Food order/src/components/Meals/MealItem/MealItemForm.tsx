import React, { useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

interface IMealItemForm {
  id: string;
  onAddToCart: (value: number) => void;
}

const MealItemForm: React.FC<IMealItemForm> = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    const enteredAmount = event.target[0].value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    event.target[0].value = "1";
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        label={"Amount"}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "0",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
