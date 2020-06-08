import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItems } from "Stores/shoppingStore/actions";
import styles from "./index.scss";

const currency = "₹";
const ShoppingList = () => {
  let addItemsToCart = ()=>{};
  let itemList = useSelector(({ items }) => items.itemList);
  // console.log(addItems, removeItem, reduceItem);

  return (
		<div className="shopping-list">
			{itemList.map((item, index) => (
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
  const dispatch = useDispatch();
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
      <a className="shopping-list-item__add-to-cart-cta" 
      onClick={()=>dispatch(addItems(item))}
      >
				Add to Cart
			</a>
		</div>
  );
};

export default ShoppingList;
