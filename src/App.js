import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

function App() {
  const list = JSON.parse(localStorage.getItem("basket"));
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState(list ? list : []);

  // useEffect(() => {
  //   const list = JSON.parse(localStorage.getItem("basket"));
  //   if (list) {
  //     setCart(list);
  //   }
  // }, []);

  const addItem = (item) => {
    const newCart = [...cart, item];
    setCart(newCart);
    console.log("yeni", newCart);
  };

  const removeItem = (id) => {
    // const filteredCart = cart.filter((f) => f.id !== id);
    const tekSil = cart.find((item) => item.id === id);
    let index = cart.indexOf(tekSil);
    let newArr = [...cart];
    newArr.splice(index, 1);
    setCart(newArr);

    // setCart(tekSil);
    // console.log(index);
  };

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(cart));
  }, [cart]);

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <CartContext.Provider value={{ cart, removeItem }}>
        <div className="App">
          <Navigation />

          {/* Routelar */}
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </main>
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
