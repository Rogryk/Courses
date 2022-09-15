import React, { useState, createContext } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartVisibilityHandler = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <CartProvider>
      {isCartOpen && <Cart onClose={cartVisibilityHandler} />}
      <Header onCartClick={cartVisibilityHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
