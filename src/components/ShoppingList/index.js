import React, { useContext, useEffect } from "react";
import styles from "./index.scss";
import { AppContext } from "Components/App";

const currency = "₹";
const ShoppingList = () => {
  let { items, addItemsToCart } = useContext(AppContext);

  return (
    <div className="shopping-list">
      {items.map((item, index) => (
        <ShoppingItem item={item} key={index} addItemsToCart={addItemsToCart} />
      ))}
    </div>
  );
};

const ShoppingItem = ({ item, addItemsToCart }) => {
  const {
    image,
    name,
    price: { actual, display },
    discount,
  } = item;
  return (
    <div className="shopping-list-item">
      <div className="shopping-list-item__img-holder">
        <img className="shopping-list-item__img" src={image} alt={name} />
      </div>
      <div className="shopping-list-item__label">{name}</div>
      <div className="shopping-list-item__price">
        <span>
          <span className="shopping-list-item__price--actual">{`${currency}${actual}`}</span>
          <span className="shopping-list-item__price--display">{`${display}`}</span>
        </span>
        <span className="shopping-list-item__price--discount">{`${discount}% off`}</span>
      </div>
      <a
        className="shopping-list-item__add-to-cart-cta"
        onClick={() => addItemsToCart(item)}
      >
        Add to Cart
      </a>
    </div>
  );
};

export default ShoppingList;
