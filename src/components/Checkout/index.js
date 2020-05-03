import React, { useState, useContext } from "react";
import styles from "./index.scss";
import { AppContext } from "Components/App";

const CheckoutItem = ({ item, index, reduceItemFromCart, addItemsToCart, currency }) => {
	let {
		image,
		name,
		price: { actual, display },
		discount,
		_count,
	} = item;

	return (
		<div className="checkout-item" key={index}>
			<div className="checkout-item__img-holder">
				<img className="checkout-item__img" src={image} alt={name} />
			</div>
			<div className="checkout-item__desc-holder">
				<div className="checkout-item__label-price-holder">
					<div className="checkout-item__label">{name}</div>
					<div className="checkout-item__price">
						<span>
							<span className="checkout-item__price--actual">{`${currency}${actual}`}</span>
							<span className="checkout-item__price--display">{`${display}`}</span>
						</span>
						<span className="checkout-item__price--discount">{`${discount}% off`}</span>
					</div>
				</div>
				<div className="checkout-item__count-change">
					<a
						className={`checkout-item__dec-count ${
							_count === 1 ? "checkout-item__dec-count--disabled" : ""
						}`}
						onClick={() => {
							if (_count > 1) {
								reduceItemFromCart(item);
							}
						}}
					/>
					<span className="checkout-item__count">{_count}</span>
					<a
						className="checkout-item__inc-count"
						onClick={() => {
							addItemsToCart(item);
						}}
					/>
				</div>
				<a className="checkout-item__remove-item" onClick={() => reduceItemFromCart(item, true)}>
					Remove
				</a>
			</div>
		</div>
	);
};

const Checkout = () => {
	const { selectedItems, reduceItemFromCart, addItemsToCart, currency } = useContext(AppContext);
	const totalPayableAmount = selectedItems.reduce(function (a, b) {
		return a + b.price["actual"] * b["_count"];
	}, 0);
	const totalDiscount = selectedItems.reduce(function (a, b) {
		return a + (b.price["display"] - b.price["actual"]) * b["_count"];
	}, 0);

	const checkoutItems = selectedItems.map((item, index) => {
		return (
			<CheckoutItem
				item={item}
				itemCount={item["_count"]}
				index={index}
				addItemsToCart={addItemsToCart}
				reduceItemFromCart={reduceItemFromCart}
				currency={currency}
			/>
		);
	});

	const itemsPriceList = selectedItems.map((item, index) => {
		let {
			_count,
			price: { actual },
		} = item;
		return (
			<div className="checkout__item-price-section" key={index}>
				<span className="checkout__item-label">{`Price (${_count} item${_count > 1 ? "s" : ""})`}</span>:
				<span className="checkout__price">{`${currency}${actual * _count}`}</span>
			</div>
		);
	});

	return (
		<section className="checkout-view">
			<div className="checkout__container container">
				<section className="checkout__items">{checkoutItems}</section>
				<section className="checkout__price-details">
					<div className="checkout__price-details-heading">Price Details</div>
					<div className="checkout__items-price-list">
						{itemsPriceList}
						<div className="checkout__discount-section">
							<span className="checkout__discount-label">Discount</span>:
							<span className="checkout__total-discount">{`${currency}${totalDiscount}`}</span>
						</div>

						<div className="checkout__item-price"></div>
					</div>
					<div className="checkout__total-price">
						<span>Total Payable</span>
						<span>{`${currency}${totalPayableAmount}`}</span>
					</div>
				</section>
			</div>
		</section>
	);
};

export default Checkout;
