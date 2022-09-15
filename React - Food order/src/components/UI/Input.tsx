import React from "react";
import styles from "./Input.module.css";

interface Iprops {
  label: string;
  input: {
    id: string;
    type?: string;
    min?: string;
    max?: string;
    step?: string;
    defaultValue?: string;
  };
}

const Input = (props: Iprops) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input className={styles.input} {...props.input} />
    </div>
  );
};

// const Input = React.forwardRef(<T extends { id: string }>(props: IInput<T>) => {
//   return (
//     <div className={styles.input}>
//       <label htmlFor={props.input.id}>{props.label}</label>
//       <input className={styles.input} {...props.input} />
//     </div>
//   );
// });

export default Input;
